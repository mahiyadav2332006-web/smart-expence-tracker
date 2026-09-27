import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { teamMembers, initialLeads, initialClients, initialTasks } from './mockData';
import { Lead, Client, Task, LeadStage, ClientStatus, Activity, ActivityType, TeamMember } from './types';

// Component Imports
import Sidebar from './components/Sidebar';
import AnalyticsOverview from './components/AnalyticsOverview';
import PipelineKanban from './components/PipelineKanban';
import ClientListTable from './components/ClientListTable';
import TaskTracker from './components/TaskTracker';
import ClientProfileView from './components/ClientProfileView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';

export default function App() {
  // --- Persistent Local State Hook Setup ---
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('apex_crm_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('apex_crm_clients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('apex_crm_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [teamList, setTeamList] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('pixelpulse_crm_team');
    return saved ? JSON.parse(saved) : teamMembers;
  });

  const [selectedMember, setSelectedMember] = useState(() => {
    const saved = localStorage.getItem('pixelpulse_crm_team');
    const parsed = saved ? JSON.parse(saved) : teamMembers;
    return parsed[0];
  });

  const [agencyName, setAgencyName] = useState(() => {
    return localStorage.getItem('pixelpulse_crm_agency_name') || 'PixelPulse Agency CRM';
  });

  const [currentTab, setCurrentTab] = useState<'overview' | 'pipeline' | 'clients' | 'tasks' | 'analytics' | 'settings'>('overview');
  
  // High fidelity Profile Inspector focus state
  const [inspectorFocus, setInspectorFocus] = useState<{
    id: string;
    type: 'lead' | 'client';
  } | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('apex_crm_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('apex_crm_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('apex_crm_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('pixelpulse_crm_team', JSON.stringify(teamList));
  }, [teamList]);

  useEffect(() => {
    localStorage.setItem('pixelpulse_crm_agency_name', agencyName);
  }, [agencyName]);

  // --- Core CRUD Workflow Handlers ---

  // 1. Create a brand new Lead
  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'lastContacted' | 'activities'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newLead: Lead = {
      ...newLeadData,
      id: `lead_${Date.now()}`,
      createdAt: today,
      lastContacted: today,
      activities: [
        {
          id: `act_${Date.now()}_init`,
          type: 'system',
          title: 'Opportunity Established',
          description: `Created new lead deal under owner ${newLeadData.owner} via creation wizard.`,
          date: today,
          createdBy: selectedMember.name,
        }
      ]
    };
    setLeads([newLead, ...leads]);
  };

  // 2. Modify Lead Pipeline Stage
  const handleUpdateLeadStage = (id: string, newStage: LeadStage) => {
    const today = new Date().toISOString().split('T')[0];
    setLeads(prevLeads =>
      prevLeads.map((lead) => {
        if (lead.id === id) {
          const prevStage = lead.stage;
          const stageLog: Activity = {
            id: `act_${Date.now()}_stage`,
            type: 'system',
            title: `Pipeline Transition`,
            description: `Moved stage from '${prevStage}' to '${newStage}'.`,
            date: today,
            createdBy: selectedMember.name,
          };
          return {
            ...lead,
            stage: newStage,
            lastContacted: today,
            activities: [stageLog, ...lead.activities],
          };
        }
        return lead;
      })
    );
  };

  // 3. Automated Automation Workflow: Convert Lead to Client
  const handleConvertLeadToClient = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const today = new Date().toISOString().split('T')[0];

    // Build the brand new Client portfolio record
    const newClient: Client = {
      id: `client_${Date.now()}`,
      name: lead.name,
      company: lead.company,
      contactName: lead.contactName,
      contactEmail: lead.contactEmail,
      contactPhone: lead.contactPhone,
      status: 'onboarding',
      mrr: lead.value, // Convert lead size straight to retainer MRR
      projectType: 'Core Retainer Project',
      healthScore: 'high', // Set peak health as onboarding starts
      owner: lead.owner,
      startDate: today,
      notes: `Converted from Lead Stage Opportunity.\nInitial Strategy Notes: ${lead.notes}`,
      activities: [
        {
          id: `act_${Date.now()}_conv`,
          type: 'system',
          title: 'Retainer Signed & Converted',
          description: `Formally signed deal opportunity and converted lead pipeline value into a recurring client onboarding profile!`,
          date: today,
          createdBy: selectedMember.name,
        },
        ...lead.activities, // Transfer full lead activity history so we maintain timeline context!
      ],
    };

    // Add client, delete lead from active pipeline, update tasks
    setClients([newClient, ...clients]);
    setLeads(prevLeads => prevLeads.filter(l => l.id !== leadId));
    
    // Automatically redirect to newly spawned client's profile inspector
    setInspectorFocus({ id: newClient.id, type: 'client' });
  };

  // 4. Create Active Client from scratch
  const handleAddClient = (newClientData: Omit<Client, 'id' | 'activities'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newClient: Client = {
      ...newClientData,
      id: `client_${Date.now()}`,
      activities: [
        {
          id: `act_${Date.now()}_init`,
          type: 'system',
          title: 'Client Workspace Initialized',
          description: `Formally initialized core active client profile and mapped executive SLA tracks.`,
          date: today,
          createdBy: selectedMember.name,
        }
      ]
    };
    setClients([newClient, ...clients]);
  };

  // 5. Update Playbook Strategy notes
  const handleUpdateNotes = (id: string, entityType: 'lead' | 'client', updatedNotes: string) => {
    const today = new Date().toISOString().split('T')[0];
    const notesLog: Activity = {
      id: `act_${Date.now()}_notes`,
      type: 'note',
      title: 'Strategic Playbook Updated',
      description: 'Account manager modified target playbook guidelines and strategy targets.',
      date: today,
      createdBy: selectedMember.name,
    };

    if (entityType === 'lead') {
      setLeads(prevLeads =>
        prevLeads.map(l => l.id === id ? { ...l, notes: updatedNotes, activities: [notesLog, ...l.activities] } : l)
      );
    } else {
      setClients(prevClients =>
        prevClients.map(c => c.id === id ? { ...c, notes: updatedNotes, activities: [notesLog, ...c.activities] } : c)
      );
    }
  };

  // 6. Append dynamic custom activities to timelines
  const handleAddActivity = (
    id: string,
    entityType: 'lead' | 'client',
    activityData: Omit<Activity, 'id' | 'date'>
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const newAct: Activity = {
      ...activityData,
      id: `act_${Date.now()}`,
      date: today,
    };

    if (entityType === 'lead') {
      setLeads(prevLeads =>
        prevLeads.map(l =>
          l.id === id
            ? { ...l, lastContacted: today, activities: [newAct, ...l.activities] }
            : l
        )
      );
    } else {
      setClients(prevClients =>
        prevClients.map(c =>
          c.id === id
            ? { ...c, activities: [newAct, ...c.activities] }
            : c
        )
      );
    }
  };

  // 7. Add tasks associated with deals or clients
  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task_${Date.now()}`,
      status: 'pending',
    };
    setTasks([newTask, ...tasks]);
  };

  // 8. Toggle Task checklist status
  const handleToggleTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(t => t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t)
    );
  };

  // Reset to original mock data if the user wants to play again (good UX)
  const handleResetWorkspace = () => {
    if (confirm('Are you sure you want to restore original workspace values? Any customizations will be reset.')) {
      localStorage.removeItem('apex_crm_leads');
      localStorage.removeItem('apex_crm_clients');
      localStorage.removeItem('apex_crm_tasks');
      localStorage.removeItem('pixelpulse_crm_team');
      localStorage.removeItem('pixelpulse_crm_agency_name');
      setLeads(initialLeads);
      setClients(initialClients);
      setTasks(initialTasks);
      setTeamList(teamMembers);
      setSelectedMember(teamMembers[0]);
      setAgencyName('PixelPulse Agency CRM');
      setCurrentTab('overview');
      setInspectorFocus(null);
    }
  };

  const handleAddTeamMember = (newMember: TeamMember) => {
    setTeamList(prev => [...prev, newMember]);
  };

  // Find inspected entity data safely
  const currentInspectedEntity = inspectorFocus
    ? inspectorFocus.type === 'lead'
      ? leads.find(l => l.id === inspectorFocus.id)
      : clients.find(c => c.id === inspectorFocus.id)
    : null;

  return (
    <div id="apex-app-layout" className="flex h-screen bg-slate-100 text-slate-800 font-sans overflow-hidden">
      
      {/* Dynamic Left Navigation Rail Sidebar */}
      <Sidebar
        currentTab={inspectorFocus ? '' : currentTab}
        setCurrentTab={(tab) => {
          setInspectorFocus(null);
          setCurrentTab(tab as any);
        }}
        teamMembers={teamList}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        leadsCount={leads.length}
        clientsCount={clients.length}
        pendingTasksCount={tasks.filter(t => t.status === 'pending').length}
      />

      {/* Primary Dashboard Content Canvas Area */}
      <main id="primary-content-viewport" className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">
        
        {/* Top bar header */}
        <header id="apex-topbar" className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3.5">
            <span className="text-sm font-bold text-slate-900 font-sans tracking-tight">{agencyName}</span>
            <span className="text-xs bg-blue-50 text-blue-600 font-bold px-2.5 py-1 rounded-md">
              {selectedMember.name} ({selectedMember.role})
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Quick Demo Reset Trigger */}
            <button
              onClick={handleResetWorkspace}
              className="text-xs font-semibold text-slate-400 hover:text-rose-600 border border-transparent hover:border-rose-100 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              Reset Sandbox Data
            </button>

            <span className="text-xs text-slate-400 font-mono">
              Workspace Sync: Active (UTC)
            </span>
          </div>
        </header>

        {/* Workspace views router panel */}
        <div id="active-content-container" className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentInspectedEntity && inspectorFocus ? (
              // 1. Detailed Profile Inspector View
              <motion.div
                key={`inspector_${inspectorFocus.id}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18 }}
                className="h-full"
              >
                <ClientProfileView
                  entity={currentInspectedEntity}
                  type={inspectorFocus.type}
                  currentUser={selectedMember.name}
                  onBack={() => setInspectorFocus(null)}
                  onUpdateNotes={handleUpdateNotes}
                  onAddActivity={handleAddActivity}
                />
              </motion.div>
            ) : (
              // 2. Main Tab View Router
              <motion.div
                key={currentTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="h-full"
              >
                {currentTab === 'overview' && (
                  <AnalyticsOverview
                    leads={leads}
                    clients={clients}
                    tasks={tasks}
                    onNavigateToTab={(tab) => setCurrentTab(tab as any)}
                  />
                )}

                 {currentTab === 'pipeline' && (
                  <PipelineKanban
                    leads={leads}
                    teamMembers={teamList}
                    onAddLead={handleAddLead}
                    onUpdateLeadStage={handleUpdateLeadStage}
                    onConvertLeadToClient={handleConvertLeadToClient}
                    onSelectLead={(lead) => setInspectorFocus({ id: lead.id, type: 'lead' })}
                  />
                )}

                {currentTab === 'clients' && (
                  <ClientListTable
                    clients={clients}
                    teamMembers={teamList}
                    onAddClient={handleAddClient}
                    onSelectClient={(client) => setInspectorFocus({ id: client.id, type: 'client' })}
                  />
                )}

                {currentTab === 'tasks' && (
                  <TaskTracker
                    tasks={tasks}
                    teamMembers={teamList}
                    leads={leads}
                    clients={clients}
                    onAddTask={handleAddTask}
                    onToggleTask={handleToggleTask}
                    currentOperator={selectedMember}
                  />
                )}

                {currentTab === 'analytics' && (
                  <AnalyticsView
                    leads={leads}
                    clients={clients}
                    tasks={tasks}
                    onSelectClient={(client) => setInspectorFocus({ id: client.id, type: 'client' })}
                  />
                )}

                {currentTab === 'settings' && (
                  <SettingsView
                    teamMembers={teamList}
                    onAddTeamMember={handleAddTeamMember}
                    agencyName={agencyName}
                    onChangeAgencyName={setAgencyName}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
