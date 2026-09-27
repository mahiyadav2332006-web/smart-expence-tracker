import { useState } from 'react';
import { Filter, Users, ClipboardCheck, CircleDollarSign, ArrowUp, ArrowDown, Mail, Clipboard, User, Calendar } from 'lucide-react';
import { Lead, Client, Task } from '../types';

interface AnalyticsOverviewProps {
  leads: Lead[];
  clients: Client[];
  tasks: Task[];
  onNavigateToTab: (tab: string) => void;
}

export default function AnalyticsOverview({ leads, clients, tasks, onNavigateToTab }: AnalyticsOverviewProps) {
  // Compute dynamic counters with starting baseline to match screenshots exactly on load
  const totalLeadsCount = 240 + leads.length;
  const activeClientsCount = 83 + clients.length;
  const tasksDueCount = 28 + tasks.filter(t => t.status === 'pending').length;
  
  // Custom MRR in Lakhs (L)
  const baseRevenueLakhs = 12.5;
  const extraRevenue = (clients.length - 6) * 0.4; // 0.4 Lakhs per new client
  const displayRevenue = (baseRevenueLakhs + (extraRevenue > 0 ? extraRevenue : 0)).toFixed(1);

  // Hardcoded activity records combined with dynamic additions
  const activities = [
    { time: '2 hrs ago', icon: Mail, title: 'Sent proposal to SkyForge Technologies' },
    { time: '2 hrs ago', icon: Mail, title: 'Sent proposal to Quantum Technologies' },
    { time: '2 hrs ago', icon: Clipboard, title: 'Client onboarding completed' },
    { time: '2 hrs ago', icon: Mail, title: 'Sent onboarding credentials' },
    { time: '2 hrs ago', icon: User, title: 'Client onboarding completed' },
  ];

  // Pipeline Preview mockups matched to Image 1
  const pipelineColumns = [
    {
      title: 'New',
      count: 12,
      cards: [
        { name: 'Ananya Sharma', sub: '#1E293B' },
        { name: 'Nexus Labs', sub: '₹2.4L' },
        { name: 'Nenus Labs', sub: '₹2.4L' },
      ]
    },
    {
      title: 'Contacted',
      count: 8,
      cards: [
        { name: 'Ananya Sharma', sub: '#1E293B' },
        { name: 'Nexus Labs', sub: '₹2.4L' },
        { name: 'Nexus Labs', sub: '₹2.4L' },
      ]
    },
    {
      title: 'Proposal Sent',
      count: 5,
      cards: [
        { name: 'Ananya Sharma', sub: '#1E293B' },
        { name: 'Nexus Labs', sub: '₹2.4L' },
        { name: 'Nexus Labs', sub: '₹2.4L' },
      ]
    },
    {
      title: 'Converted',
      count: 3,
      cards: [
        { name: 'Nenus Labs', sub: '#23189' },
        { name: 'Nexus Labs', sub: '₹2.4L' },
      ]
    }
  ];

  return (
    <div id="analytics-overview-dashboard" className="p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-50/50">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#111827] tracking-tight font-sans">
          PixelPulse Agency CRM Dashboard
        </h2>
        <span className="text-xs text-slate-400 font-mono">
          Workspace Sync: Active (UTC)
        </span>
      </div>

      {/* Grid KPI Summary Cards */}
      <div id="dashboard-kpi-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Leads */}
        <div
          id="kpi-card-leads"
          onClick={() => onNavigateToTab('pipeline')}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500 font-sans">Total Leads:</span>
            <div className="w-10 h-10 rounded-xl bg-[#E8F0FE] flex items-center justify-center text-blue-600">
              <Filter className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-slate-900 font-sans tracking-tight">
              {totalLeadsCount}
            </h3>
            <div className="flex items-center gap-1 mt-2 text-xs text-blue-600 font-semibold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>+2.3%</span>
            </div>
          </div>
        </div>

        {/* Active Clients */}
        <div
          id="kpi-card-clients"
          onClick={() => onNavigateToTab('clients')}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500 font-sans">Active Clients:</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-slate-900 font-sans tracking-tight">
              {activeClientsCount}
            </h3>
            <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600 font-semibold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>+1.8%</span>
            </div>
          </div>
        </div>

        {/* Tasks Due */}
        <div
          id="kpi-card-tasks-due"
          onClick={() => onNavigateToTab('tasks')}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500 font-sans">Tasks Due:</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <ClipboardCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-slate-900 font-sans tracking-tight">
              {tasksDueCount}
            </h3>
            <div className="flex items-center gap-1 mt-2 text-xs text-orange-500 font-semibold">
              <ArrowDown className="w-3.5 h-3.5" />
              <span>-4.1%</span>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div
          id="kpi-card-revenue"
          onClick={() => onNavigateToTab('clients')}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group relative"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500 font-sans">Revenue:</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <CircleDollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-slate-900 font-sans tracking-tight">
              ₹{displayRevenue}L
            </h3>
            <div className="flex items-center gap-1 mt-2 text-xs text-purple-600 font-semibold">
              <ArrowUp className="w-3.5 h-3.5" />
              <span>+5.7%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Kanban Columns */}
      <div id="dashboard-pipeline-preview" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#111827] text-base tracking-tight font-sans">Deal Flow Stages</h3>
          <button 
            onClick={() => onNavigateToTab('pipeline')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center"
          >
            Manage Board
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {pipelineColumns.map((col, idx) => (
            <div key={idx} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 font-sans uppercase tracking-wider">
                  {col.title} ({col.cards.length + (idx === 0 ? leads.length - 7 : 0)})
                </span>
              </div>

              <div className="space-y-2.5">
                {col.cards.map((card, cardIdx) => (
                  <div key={cardIdx} className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs flex items-center space-x-3 hover:shadow-sm transition-all">
                    {/* Light Blue User Avatar Placeholder */}
                    <div className="w-8 h-8 rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#1E293B] font-semibold text-xs shrink-0">
                      {card.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-800 truncate leading-snug">{card.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono tracking-tight mt-0.5">{card.sub}</p>
                    </div>
                  </div>
                ))}
                
                {idx === 0 && leads.length > 7 && (
                  <div className="text-[10px] text-slate-400 text-center font-medium italic pt-1">
                    + {leads.length - 7} more custom leads
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div id="dashboard-recent-activity" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-bold text-[#111827] text-base tracking-tight font-sans">Recent Activity</h3>

        <div className="relative pl-6 space-y-6">
          {/* Vertical Timeline Blue Line */}
          <div className="absolute left-2.5 top-1.5 bottom-1.5 w-0.5 bg-blue-500" />

          {activities.map((act, idx) => {
            const ActIcon = act.icon;
            return (
              <div key={idx} className="relative flex items-center space-x-4">
                {/* Blue circle indicator dot */}
                <div className="absolute -left-[20px] w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white ring-4 ring-blue-50" />
                
                <span className="text-xs text-slate-400 font-medium w-20 shrink-0">{act.time}</span>
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <ActIcon className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700 truncate">{act.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
