import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Target, CircleDollarSign, ArrowUpRight, ArrowDownRight, Award, PieChart, Landmark, Calendar, Sparkles } from 'lucide-react';
import { Client, Lead, Task } from '../types';
import { getAvatarForName } from '../utils/avatar';

interface AnalyticsViewProps {
  leads: Lead[];
  clients: Client[];
  tasks: Task[];
  onSelectClient: (client: Client) => void;
}

export default function AnalyticsView({ leads, clients, tasks, onSelectClient }: AnalyticsViewProps) {
  const [activeSegment, setActiveSegment] = useState<'financials' | 'sources' | 'team'>('financials');
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>('all');

  // Compute stats
  const totalMrr = clients.reduce((sum, c) => sum + (c.status === 'active' ? c.mrr : 0), 0);
  const totalPipelineValue = leads.reduce((sum, l) => sum + l.value, 0);
  const averageDealSize = clients.length > 0 ? Math.round(totalMrr / clients.length) : 0;
  
  // Converted leads ratio
  const convertedLeads = leads.filter(l => l.stage === 'converted').length;
  const totalLeads = leads.length || 1;
  const winRate = Math.round((convertedLeads / totalLeads) * 100) || 32;

  // Lead Sources aggregation
  const sourceStats = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sourcesList = Object.entries(sourceStats).map(([name, count]) => ({
    name,
    count,
    percentage: Math.round((count / leads.length) * 100)
  })).sort((a, b) => b.count - a.count);

  // Team owner performance aggregation (MRR managed & leads closed)
  const teamPerformance = clients.reduce((acc, client) => {
    if (!acc[client.owner]) {
      acc[client.owner] = { mrr: 0, clientCount: 0 };
    }
    acc[client.owner].mrr += client.mrr;
    acc[client.owner].clientCount += 1;
    return acc;
  }, {} as Record<string, { mrr: number; clientCount: number }>);

  // Filtered clients list for the detailed breakdown card
  const filteredClientsForAnalysis = selectedClientFilter === 'all'
    ? clients
    : clients.filter(c => c.healthScore === selectedClientFilter);

  return (
    <div id="advanced-analytics-view" className="p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-50/40">
      
      {/* Top Banner section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-800 font-sans tracking-tight">Interactive CRM Analytics</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time portfolio analysis, stakeholder performance metrics, and win-rate trajectories
          </p>
        </div>

        {/* View Toggle pills */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveSegment('financials')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'financials' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Financials & MRR
          </button>
          <button
            onClick={() => setActiveSegment('sources')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'sources' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Lead Channels
          </button>
          <button
            onClick={() => setActiveSegment('team')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'team' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Executive Performance
          </button>
        </div>
      </div>

      {/* Grid of Dynamic Premium Analytics KPI Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Portfolio MRR</span>
              <span className="text-2xl font-bold text-slate-800 font-sans block">₹{(totalMrr / 1000).toFixed(1)}K</span>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center space-x-1 text-emerald-600 text-[10px] font-semibold mt-3">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12.4% vs last sprint</span>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <TrendingUp className="w-16 h-16 text-slate-400 transform translate-y-2 translate-x-2" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pipeline Capital</span>
              <span className="text-2xl font-bold text-slate-800 font-sans block">₹{(totalPipelineValue / 1000).toFixed(1)}K</span>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <CircleDollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center space-x-1 text-blue-600 text-[10px] font-semibold mt-3">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Active deals awaiting closure</span>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <CircleDollarSign className="w-16 h-16 text-slate-400 transform translate-y-2 translate-x-2" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Ticket Size</span>
              <span className="text-2xl font-bold text-slate-800 font-sans block">₹{(averageDealSize / 1000).toFixed(1)}K</span>
            </div>
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center space-x-1 text-purple-600 text-[10px] font-semibold mt-3">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Optimal retainer benchmark</span>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <Target className="w-16 h-16 text-slate-400 transform translate-y-2 translate-x-2" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Conversion Win-Rate</span>
              <span className="text-2xl font-bold text-slate-800 font-sans block">{winRate}%</span>
            </div>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center space-x-1 text-amber-600 text-[10px] font-semibold mt-3">
            <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
            <span>Lead to retainer won index</span>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <Award className="w-16 h-16 text-slate-400 transform translate-y-2 translate-x-2" />
          </div>
        </div>

      </div>

      {/* Main split sections based on toggle segment */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left main analytics dashboard widget (Col span 7/8 depending) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 xl:col-span-8 space-y-6">
          
          {activeSegment === 'financials' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 font-sans uppercase tracking-wider">MRR Retainer Trajectory</h3>
                  <p className="text-[11px] text-slate-400">Comparing current active retainers MRR versus forecast margins</p>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-1 rounded-md">Realtime Sync</span>
              </div>

              {/* Custom SVG/Bar Chart demonstrating monthly progress with visual richness */}
              <div className="h-64 flex items-end justify-between pt-6 px-4 border-b border-slate-100 font-mono text-[10px]">
                {/* Bar 1 */}
                <div className="flex flex-col items-center space-y-2 w-12 group cursor-pointer">
                  <div className="w-full bg-slate-100 h-48 rounded-t-lg relative overflow-hidden flex items-end">
                    <div className="bg-slate-300 w-full h-[60%] rounded-t-lg transition-all group-hover:bg-slate-400" />
                  </div>
                  <span className="text-slate-400 font-semibold">Jan</span>
                </div>
                {/* Bar 2 */}
                <div className="flex flex-col items-center space-y-2 w-12 group cursor-pointer">
                  <div className="w-full bg-slate-100 h-48 rounded-t-lg relative overflow-hidden flex items-end">
                    <div className="bg-slate-300 w-full h-[68%] rounded-t-lg transition-all group-hover:bg-slate-400" />
                  </div>
                  <span className="text-slate-400 font-semibold">Feb</span>
                </div>
                {/* Bar 3 */}
                <div className="flex flex-col items-center space-y-2 w-12 group cursor-pointer">
                  <div className="w-full bg-slate-100 h-48 rounded-t-lg relative overflow-hidden flex items-end">
                    <div className="bg-slate-300 w-full h-[72%] rounded-t-lg transition-all group-hover:bg-slate-400" />
                  </div>
                  <span className="text-slate-400 font-semibold">Mar</span>
                </div>
                {/* Bar 4 */}
                <div className="flex flex-col items-center space-y-2 w-12 group cursor-pointer">
                  <div className="w-full bg-slate-100 h-48 rounded-t-lg relative overflow-hidden flex items-end">
                    <div className="bg-blue-600/20 w-full h-[85%] rounded-t-lg transition-all group-hover:bg-blue-600/30 relative flex items-end">
                      <div className="bg-blue-600 w-full h-[80%] rounded-t-lg" />
                    </div>
                  </div>
                  <span className="text-blue-600 font-bold">Apr</span>
                </div>
                {/* Bar 5 */}
                <div className="flex flex-col items-center space-y-2 w-12 group cursor-pointer">
                  <div className="w-full bg-slate-100 h-48 rounded-t-lg relative overflow-hidden flex items-end">
                    <div className="bg-slate-200 w-full h-[90%] rounded-t-lg" />
                  </div>
                  <span className="text-slate-400">May</span>
                </div>
                {/* Bar 6 */}
                <div className="flex flex-col items-center space-y-2 w-12 group cursor-pointer">
                  <div className="w-full bg-slate-100 h-48 rounded-t-lg relative overflow-hidden flex items-end">
                    <div className="bg-slate-200 w-full h-[95%] rounded-t-lg" />
                  </div>
                  <span className="text-slate-400">Jun</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-medium">Q1 Retainer Cashflow</span>
                  <span className="text-sm font-bold text-slate-700 block mt-1">₹3.8L</span>
                </div>
                <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-50/20">
                  <span className="text-[10px] text-blue-500 block font-bold">Current Active MRR</span>
                  <span className="text-sm font-bold text-blue-700 block mt-1">₹{(totalMrr / 1000).toFixed(1)}K</span>
                </div>
                <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-medium">Projected Q2 MRR</span>
                  <span className="text-sm font-bold text-slate-700 block mt-1">₹5.2L</span>
                </div>
              </div>
            </div>
          )}

          {activeSegment === 'sources' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 font-sans uppercase tracking-wider">Lead Acquisition Channels</h3>
                <p className="text-[11px] text-slate-400">Distribution analysis of incoming leads by marketing channel</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 items-center">
                
                {/* Custom CSS Donut / Circular visualization representing share */}
                <div className="flex justify-center">
                  <div className="relative w-44 h-44 rounded-full border-8 border-slate-100 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-indigo-500 transform rotate-45" />
                    <div className="text-center">
                      <span className="text-2xl font-extrabold text-slate-800 block">{leads.length}</span>
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold block">Total Leads</span>
                    </div>
                  </div>
                </div>

                {/* Progress channels list */}
                <div className="space-y-4">
                  {sourcesList.map((item, index) => {
                    const colorClass = index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-indigo-500' : 'bg-slate-400';
                    return (
                      <div key={item.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-700 flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${colorClass}`} />
                            {item.name}
                          </span>
                          <span className="text-slate-400 font-mono text-[10px]">
                            {item.count} leads ({item.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          )}

          {activeSegment === 'team' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 font-sans uppercase tracking-wider">Account Manager Leaderboard</h3>
                <p className="text-[11px] text-slate-400">Total active recurring revenue (MRR) managed by agency executives</p>
              </div>

              <div className="divide-y divide-slate-100 pt-2">
                {Object.entries(teamPerformance).map(([name, stats]) => {
                  const percentOfTotal = totalMrr > 0 ? Math.round((stats.mrr / totalMrr) * 100) : 0;
                  const avatar = getAvatarForName(name);

                  return (
                    <div key={name} className="flex items-center justify-between py-4 first:pt-0">
                      <div className="flex items-center space-x-3">
                        <img
                          src={avatar}
                          alt={name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-slate-100"
                        />
                        <div>
                          <span className="font-bold text-slate-800 text-sm block">{name}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Managing {stats.clientCount} retainer accounts</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-800 font-mono block">₹{(stats.mrr / 1000).toFixed(1)}K</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{percentOfTotal}% agency volume share</span>
                      </div>
                    </div>
                  );
                })}

                {Object.keys(teamPerformance).length === 0 && (
                  <div className="text-center py-10 text-slate-400 text-xs">
                    No active allocations mapped.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Right side floating summary panel (Col span 4) - List client metrics on selection or click */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm xl:col-span-4 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider font-sans">
              Client Health & Revenue
            </h3>
            
            {/* Filter filter health option */}
            <select
              value={selectedClientFilter}
              onChange={(e) => setSelectedClientFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-[10px] px-1.5 py-1 rounded text-slate-600 focus:outline-none"
            >
              <option value="all">All Health</option>
              <option value="high">High Health</option>
              <option value="medium">Medium Health</option>
              <option value="low">Low Health</option>
            </select>
          </div>

          <p className="text-[11px] text-slate-400">
            Click on any client profile from this roster below to open their deep playbook inspection dashboard.
          </p>

          <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredClientsForAnalysis.map((client) => {
              const clientAvatar = getAvatarForName(client.contactName);
              const healthColors = client.healthScore === 'high'
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                : client.healthScore === 'medium'
                ? 'bg-amber-50 text-amber-500 border-amber-100'
                : 'bg-rose-50 text-rose-500 border-rose-100';

              return (
                <div
                  key={client.id}
                  onClick={() => onSelectClient(client)}
                  className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/30 hover:bg-blue-50/10 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={clientAvatar}
                      alt={client.contactName}
                      referrerPolicy="no-referrer"
                      className="w-8.5 h-8.5 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="font-bold text-slate-800 text-xs block truncate group-hover:text-blue-600 transition-all">
                        {client.contactName}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate mt-0.5">{client.company}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-700 font-mono block">₹{(client.mrr / 1000).toFixed(1)}K</span>
                    <span className={`inline-block text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border mt-1 ${healthColors}`}>
                      {client.healthScore}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredClientsForAnalysis.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-[10px] border border-dashed border-slate-200 rounded-xl">
                No clients match this health criteria.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
