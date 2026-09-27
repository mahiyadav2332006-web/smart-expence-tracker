import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Calendar, User, DollarSign, Activity, FileText, Plus, MessageSquare, PhoneCall, CalendarDays, Award, ChevronLeft, Save, Sparkles, TrendingUp, CheckSquare } from 'lucide-react';
import { Lead, Client, ActivityType, Activity as ActivityInterface } from '../types';

interface ClientProfileViewProps {
  entity: Lead | Client;
  type: 'lead' | 'client';
  onBack: () => void;
  onUpdateNotes: (id: string, type: 'lead' | 'client', notes: string) => void;
  onAddActivity: (id: string, type: 'lead' | 'client', activity: Omit<ActivityInterface, 'id' | 'date'>) => void;
  currentUser: string;
}

export default function ClientProfileView({
  entity,
  type,
  onBack,
  onUpdateNotes,
  onAddActivity,
  currentUser,
}: ClientProfileViewProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState(entity.notes);

  // Activity logger state
  const [logType, setLogType] = useState<ActivityType>('note');
  const [logTitle, setLogTitle] = useState('');
  const [logDesc, setLogDesc] = useState('');

  // Handle Note Save
  const handleSaveNotes = () => {
    onUpdateNotes(entity.id, type, editedNotes);
    setIsEditingNotes(false);
  };

  // Handle Activity Log Submit
  const handleLogActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logTitle || !logDesc) {
      alert('Please fill out the Activity Title and Details.');
      return;
    }

    onAddActivity(entity.id, type, {
      type: logType,
      title: logTitle,
      description: logDesc,
      createdBy: currentUser,
    });

    // Reset fields
    setLogTitle('');
    setLogDesc('');
    setLogType('note');
  };

  // Icon mapping for Activity types
  const getActivityIcon = (actType: ActivityType) => {
    switch (actType) {
      case 'email':
        return <Mail className="w-4 h-4 text-blue-600" />;
      case 'call':
        return <PhoneCall className="w-4 h-4 text-amber-600" />;
      case 'meeting':
        return <CalendarDays className="w-4 h-4 text-indigo-600" />;
      case 'proposal':
        return <FileText className="w-4 h-4 text-pink-600" />;
      case 'note':
        return <MessageSquare className="w-4 h-4 text-slate-600" />;
      case 'system':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
    }
  };

  const isLead = type === 'lead';
  const leadEntity = entity as Lead;
  const clientEntity = entity as Client;

  return (
    <div id="client-profile-root" className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50/50">
      {/* Detail Inspector Sub-Header */}
      <div id="profile-sub-header" className="bg-white border-b border-slate-100 p-6 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <button
            id="profile-back-btn"
            onClick={onBack}
            className="p-2 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-lg border border-slate-200/60 transition-all cursor-pointer flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wide">
                {type.toUpperCase()} ACCOUNT
              </span>
              <span className={`w-2 h-2 rounded-full ${isLead ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
              <span className="text-xs font-semibold text-slate-400 font-sans">{entity.company}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-1 font-sans">{entity.name}</h3>
          </div>
        </div>

        {/* Profile Metrics Highlights */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Financial Contract Value</span>
            <span className="text-base font-extrabold text-slate-900 font-mono">
              ${isLead ? leadEntity.value.toLocaleString() : clientEntity.mrr.toLocaleString()}/mo
            </span>
          </div>

          <div className="text-right border-l border-slate-100 pl-6">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Assigned Advisor</span>
            <div className="flex items-center space-x-1.5 justify-end mt-0.5">
              <span className="w-4.5 h-4.5 rounded-full bg-indigo-50 border border-indigo-200 text-[10px] font-bold text-indigo-600 flex items-center justify-center shrink-0">
                {entity.owner.split(' ').map(n=>n[0]).join('')}
              </span>
              <span className="text-xs font-semibold text-slate-700">{entity.owner}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Columns Workspace */}
      <div id="profile-workspace-layout" className="flex-1 overflow-y-auto p-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left column: Overview parameters & strategy board */}
        <div className="xl:col-span-1 space-y-6">
          {/* Card: Account Core Details */}
          <div id="profile-details-card" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
              Key Credentials
            </h4>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">Key Contact</span>
                  <p className="font-bold text-slate-800">{entity.contactName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">Email</span>
                  <a href={`mailto:${entity.contactEmail}`} className="text-indigo-600 hover:underline font-medium">
                    {entity.contactEmail || 'N/A'}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">Phone</span>
                  <p className="font-medium text-slate-700">{entity.contactPhone || 'N/A'}</p>
                </div>
              </div>

              {isLead ? (
                <>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block uppercase">Confidence Level</span>
                      <p className="font-extrabold text-indigo-600 font-mono">{leadEntity.confidence}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block uppercase">Deal Origin</span>
                      <p className="font-semibold text-slate-700">{leadEntity.source}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <Award className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block uppercase">Health Index</span>
                      <p className={`font-extrabold font-mono uppercase ${
                        clientEntity.healthScore === 'high' ? 'text-emerald-600' :
                        clientEntity.healthScore === 'medium' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {clientEntity.healthScore} Health
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block uppercase">Retainer Start Date</span>
                      <p className="font-semibold text-slate-700 font-mono">{clientEntity.startDate}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Card: Strategic Account Playbook / Notes */}
          <div id="profile-notes-card" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Strategic Playbook Notes
              </h4>
              {!isEditingNotes ? (
                <button
                  id="btn-edit-notes"
                  onClick={() => setIsEditingNotes(true)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                >
                  Edit Notes
                </button>
              ) : (
                <button
                  id="btn-save-notes"
                  onClick={handleSaveNotes}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save
                </button>
              )}
            </div>

            {!isEditingNotes ? (
              <p className="text-xs text-slate-600 leading-relaxed font-sans bg-slate-50/50 p-3 rounded-lg border border-slate-100 whitespace-pre-line italic">
                {entity.notes || 'No notes currently stored for this account. Click edit to begin logging strategy guidelines.'}
              </p>
            ) : (
              <textarea
                id="notes-textarea"
                rows={6}
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 leading-relaxed focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
              />
            )}
          </div>
        </div>

        {/* Center / Right column: Activity logger & Chronological timeline */}
        <div className="xl:col-span-2 space-y-6 flex flex-col h-full">
          {/* Section: Log an Activity Form */}
          <div id="log-activity-form-card" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs space-y-4 shrink-0">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-sans tracking-tight">Log Interaction</h4>
              <p className="text-xs text-slate-400">Add an email thread details, brief a phone call, or record milestones instantly.</p>
            </div>

            <form onSubmit={handleLogActivitySubmit} className="space-y-4">
              {/* Type selector row */}
              <div className="flex items-center space-x-2">
                {(['note', 'email', 'call', 'meeting', 'proposal'] as ActivityType[]).map((typeItem) => (
                  <button
                    id={`btn-log-type-${typeItem}`}
                    key={typeItem}
                    type="button"
                    onClick={() => setLogType(typeItem)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer border ${
                      logType === typeItem
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-500 border-slate-200/80 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    {getActivityIcon(typeItem)}
                    {typeItem}
                  </button>
                ))}
              </div>

              {/* Text fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <input
                    type="text"
                    required
                    placeholder="Brief Summary (e.g., Discovery call)"
                    value={logTitle}
                    onChange={(e) => setLogTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Details (e.g., Discussed budget limits, agreed on $10k recurring cap)"
                    value={logDesc}
                    onChange={(e) => setLogDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Log
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Section: Chronological Interaction Timeline */}
          <div id="interaction-timeline" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs flex-1 overflow-y-auto flex flex-col min-h-[300px]">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 shrink-0 border-b border-slate-50 pb-2">
              Interaction & Account Timeline
            </h4>

            <div className="relative pl-6 border-l border-slate-100 space-y-6 flex-1 pr-1">
              {entity.activities && entity.activities.length > 0 ? (
                entity.activities.map((act) => (
                  <div id={`activity-item-${act.id}`} key={act.id} className="relative group/timeline">
                    {/* Floating Left Circle Icon */}
                    <div className="absolute -left-10.5 top-0.5 w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-4xs group-hover/timeline:border-indigo-300 transition-colors z-10">
                      {getActivityIcon(act.type)}
                    </div>

                    {/* Timeline card body */}
                    <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl p-4 transition-all">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-slate-900 text-xs">{act.title}</h5>
                        <div className="text-right text-[10px] text-slate-400 font-mono">
                          <span>{act.date}</span>
                          <span className="mx-1.5">•</span>
                          <span>Logged by {act.createdBy}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans">{act.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-slate-400 text-xs">
                  No activity logs recorded. Choose an interaction type above to start logging communications.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
