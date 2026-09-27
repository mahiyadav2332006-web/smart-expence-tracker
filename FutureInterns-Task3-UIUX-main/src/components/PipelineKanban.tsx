import React, { useState } from 'react';
import { Search, Plus, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Lead, LeadStage, TeamMember } from '../types';
import { getAvatarForName } from '../utils/avatar';

interface PipelineKanbanProps {
  leads: Lead[];
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'lastContacted' | 'activities'>) => void;
  onUpdateLeadStage: (id: string, stage: LeadStage) => void;
  onConvertLeadToClient: (id: string) => void;
  onSelectLead: (lead: Lead) => void;
  teamMembers: TeamMember[];
}

export default function PipelineKanban({
  leads,
  onAddLead,
  onUpdateLeadStage,
  onConvertLeadToClient,
  onSelectLead,
  teamMembers,
}: PipelineKanbanProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hotOnly, setHotOnly] = useState(false);
  const [last7DaysOnly, setLast7DaysOnly] = useState(false);

  // New Lead state
  const [newName, setNewName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newConfidence, setNewConfidence] = useState('75');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCompany || !newContactName) return;

    onAddLead({
      name: newName,
      company: newCompany,
      contactName: newContactName,
      contactEmail: newContactEmail,
      contactPhone: newContactPhone,
      stage: 'new',
      value: Number(newValue) || 12000,
      source: 'Inbound',
      confidence: Number(newConfidence) || 75,
      owner: teamMembers[0]?.name || 'Sarah Jenkins',
      notes: 'Lead submitted via rapid wizard dashboard.',
    });

    setNewName('');
    setNewCompany('');
    setNewContactName('');
    setNewContactEmail('');
    setNewContactPhone('');
    setNewValue('');
    setNewConfidence('75');
    setShowAddForm(false);
  };

  // 5 Pipeline Stages as seen in Image 3
  const stages: { id: string; label: string }[] = [
    { id: 'new', label: 'New Leads' },
    { id: 'contacted', label: 'Contacted' },
    { id: 'qualified', label: 'Qualified' },
    { id: 'proposal', label: 'Proposal Sent' },
    { id: 'converted', label: 'Won/Converted' },
  ];

  // Helper to determine status category & badges exactly matching Image 3 (Hot, Warm, Hold, Cold)
  const getStatusCategory = (confidence: number) => {
    if (confidence >= 75) return { text: 'Hot', bg: 'bg-[#EF4444]', textCol: 'text-white' };
    if (confidence >= 55) return { text: 'Warm', bg: 'bg-[#F97316]', textCol: 'text-white' };
    if (confidence >= 35) return { text: 'Hold', bg: 'bg-[#D97706]', textCol: 'text-white' };
    return { text: 'Cold', bg: 'bg-[#3B82F6]', textCol: 'text-white' };
  };

  // Helper for age days matching Image 3 layout
  const getAgeDaysText = (createdAt: string) => {
    const days: Record<string, string> = {
      'l1': '3 days',
      'l2': '7 days',
      'l3': '3 days',
      'l4': '4 days',
      'l5': '5 days',
      'l6': '2 days',
    };
    return days[createdAt] || '3 days';
  };

  // Process and filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchTerm.toLowerCase());

    const statusObj = getStatusCategory(lead.confidence);
    const matchesHot = !hotOnly || statusObj.text === 'Hot';

    // Simulated 7 days check for demo
    const matches7Days = !last7DaysOnly || lead.id !== 'l7';

    return matchesSearch && matchesHot && matches7Days;
  });

  return (
    <div id="pipeline-deals-root" className="p-8 space-y-6 flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-slate-50/30">
      
      {/* Top Banner Controls: Dark Deep Slate Container matching Image 3 */}
      <div className="bg-[#1E293B] p-4 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-4 shadow-lg shrink-0">
        
        {/* Left Search Bar with deep inner color */}
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search deals, people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111827] border border-slate-700/80 pl-10 pr-4 py-2 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Right Filter Pills & Create button */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
          <button
            onClick={() => { setHotOnly(false); setLast7DaysOnly(false); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              (!hotOnly && !last7DaysOnly) 
                ? 'bg-[#374151] text-white border border-slate-600' 
                : 'text-slate-300 hover:bg-[#374151]/50 border border-transparent'
            }`}
          >
            All Stages
          </button>

          <button
            onClick={() => setHotOnly(!hotOnly)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              hotOnly 
                ? 'bg-red-600 text-white border border-red-500' 
                : 'text-slate-300 hover:bg-[#374151]/50 border border-transparent'
            }`}
          >
            Hot Only
          </button>

          <button
            onClick={() => setLast7DaysOnly(!last7DaysOnly)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              last7DaysOnly 
                ? 'bg-blue-600 text-white border border-blue-500' 
                : 'text-slate-300 hover:bg-[#374151]/50 border border-transparent'
            }`}
          >
            Last 7 Days
          </button>

          {/* Solid Shiny Blue Add Lead Button */}
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Kanban Stages Columns Grid */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex h-full gap-5 min-w-[1200px]">
          {stages.map((col) => {
            // Map our database stage ('new', 'contacted', 'proposal', 'converted') to columns
            // Qualified maps to confidence >= 55 && stage !== converted/proposal
            const columnLeads = filteredLeads.filter(lead => {
              if (col.id === 'qualified') {
                return lead.stage === 'contacted' && lead.confidence >= 55;
              }
              if (col.id === 'contacted') {
                return lead.stage === 'contacted' && lead.confidence < 55;
              }
              return lead.stage === col.id;
            });

            return (
              <div
                key={col.id}
                className="w-1/5 flex flex-col h-full min-w-[240px]"
              >
                {/* Column header title matching Image 3 layout */}
                <div className="pb-3 shrink-0 flex items-center space-x-2">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-sans">{col.label}</h3>
                  <span className="text-[10px] text-slate-400 font-bold">({columnLeads.length})</span>
                </div>

                {/* Column Cards Container */}
                <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 pb-2 custom-scrollbar">
                  {columnLeads.map((lead) => {
                    const status = getStatusCategory(lead.confidence);
                    const photo = getAvatarForName(lead.contactName);
                    const ageDays = getAgeDaysText(lead.id);

                    // Formatted Rupee values to match exact Image 3 specs
                    const lowVal = Math.round(lead.value / 1000);
                    const highVal = Math.round(lead.value * 2.5 / 1000);
                    const rupeeRange = `₹${lowVal}K - ₹${highVal}K`;

                    return (
                      <div
                        key={lead.id}
                        onClick={() => onSelectLead(lead)}
                        className="bg-white rounded-xl border border-slate-200/50 p-3.5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer relative flex flex-col space-y-2 group"
                      >
                        {/* Upper card Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            {/* Face photograph circular avatar */}
                            <img
                              src={photo}
                              alt={lead.contactName}
                              referrerPolicy="no-referrer"
                              className="w-9 h-9 rounded-full object-cover border border-slate-100 shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="font-bold text-slate-800 text-xs truncate leading-snug">
                                {lead.contactName}
                              </h4>
                              <p className="text-[10px] text-slate-400 truncate mt-0.5">{lead.company}</p>
                            </div>
                          </div>

                          {/* Dynamic colored status badge (Hot, Warm, Hold, Cold) */}
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider ${status.bg} ${status.textCol} shrink-0`}>
                            {status.text}
                          </span>
                        </div>

                        {/* Lower card Row */}
                        <div className="flex items-end justify-between pt-1 border-t border-slate-50">
                          <div>
                            <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-semibold">Deal Volume</span>
                            <span className="text-xs font-bold text-slate-700 font-mono">{rupeeRange}</span>
                          </div>
                          
                          {/* Duration Stamp */}
                          <span className="text-[10px] text-slate-400 font-medium">
                            {ageDays}
                          </span>
                        </div>

                        {/* Quick Action Selector on card hover */}
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 bg-slate-50/95 p-1 rounded-lg border border-slate-100 shadow-sm">
                          {lead.stage !== 'converted' ? (
                            <button
                              title="Move Next Stage"
                              onClick={(e) => {
                                e.stopPropagation();
                                const stagesList: LeadStage[] = ['new', 'contacted', 'proposal', 'converted'];
                                const currIdx = stagesList.indexOf(lead.stage);
                                if (currIdx < 3) {
                                  onUpdateLeadStage(lead.id, stagesList[currIdx + 1]);
                                }
                              }}
                              className="p-1 rounded hover:bg-slate-200 text-blue-600"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <button
                              title="Convert to Client retainer"
                              onClick={(e) => {
                                e.stopPropagation();
                                onConvertLeadToClient(lead.id);
                              }}
                              className="p-1 rounded bg-emerald-500 text-white hover:bg-emerald-600"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {columnLeads.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-[10px] border border-dashed border-slate-200 rounded-xl bg-white/40">
                      Empty stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Lead Opportunity Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Add Deal Opportunity</h3>
                <p className="text-[11px] text-slate-500">Insert new high intent leads directly.</p>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shreya"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Company *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TechStart"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Deal Value (INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 150000"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Confidence / Priority *</label>
                  <select
                    value={newConfidence}
                    onChange={(e) => setNewConfidence(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none text-slate-700"
                  >
                    <option value="85">Hot (85%)</option>
                    <option value="60">Warm (60%)</option>
                    <option value="40">Hold (40%)</option>
                    <option value="20">Cold (20%)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Establish Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
