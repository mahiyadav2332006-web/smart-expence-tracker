import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, SlidersHorizontal } from 'lucide-react';
import { Client, ClientStatus, TeamMember } from '../types';
import { getAvatarForName } from '../utils/avatar';

interface ClientListTableProps {
  clients: Client[];
  teamMembers: TeamMember[];
  onSelectClient: (client: Client) => void;
  onAddClient: (client: Omit<Client, 'id' | 'activities'>) => void;
}

export default function ClientListTable({
  clients,
  teamMembers,
  onSelectClient,
  onAddClient,
}: ClientListTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [valueFilter, setValueFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form fields
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [mrr, setMrr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !contactName) return;

    onAddClient({
      name: company + " Retainer",
      company,
      contactName,
      contactEmail,
      contactPhone,
      status: 'active',
      mrr: Number(mrr) || 5000,
      projectType: 'SaaS Platform Development',
      healthScore: 'high',
      owner: teamMembers[0]?.name || 'Sarah Jenkins',
      startDate: new Date().toISOString().split('T')[0],
      notes: 'Onboarded via quick dashboard wizard.',
    });

    setCompany('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setMrr('');
    setShowAddForm(false);
  };

  // Engagement score helper to represent Image 4 visual bar
  const getEngagementScore = (companyName: string) => {
    const scores: Record<string, number> = {
      'Veridian Dynamics': 92,
      'Nexus Labs': 78,
      'Nova Labs': 84,
      'SkyForge Technologies': 63,
      'Quantum Technologies': 45,
      'Bloom Cosmetics': 89,
    };
    return scores[companyName] || 75;
  };

  // Simulated total historical revenue matches Image 4
  const getHistoricalRevenue = (companyName: string, mrr: number) => {
    const revenues: Record<string, string> = {
      'Veridian Dynamics': '$128,450',
      'Nexus Labs': '$74,200',
      'Nova Labs': '$95,100',
      'SkyForge Technologies': '$42,000',
      'Quantum Technologies': '$18,500',
      'Bloom Cosmetics': '$81,600',
    };
    return revenues[companyName] || `$${(mrr * 12).toLocaleString()}`;
  };

  // Filter clients
  const filteredClients = clients.filter(c => {
    const matchesSearch =
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? c.status === 'active' : c.status !== 'active');
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div id="clients-grid-root" className="p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-50/40">
      
      {/* Header section controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-sans tracking-tight">PixelPulse Clients Base</h2>
          <p className="text-xs text-slate-500 mt-1">Review active retainers, historical volume, and health metrics</p>
        </div>
        
        {/* Blue Onboard button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4.5 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Filter Row: Search + Sliders */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 pl-9 pr-4 py-1.5 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase font-sans">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs px-2 py-1.5 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Industry Dropdown */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase font-sans">Industry</span>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs px-2 py-1.5 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Industries</option>
            <option value="SaaS">SaaS</option>
            <option value="Fintech">FinTech</option>
            <option value="E-Commerce">E-Commerce</option>
          </select>
        </div>

        {/* Value Range Dropdown */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase font-sans">Value Range</span>
          <select
            value={valueFilter}
            onChange={(e) => setValueFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs px-2 py-1.5 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Value</option>
            <option value="high">&gt; $10,000</option>
            <option value="med">$5,000 - $10,000</option>
            <option value="low">&lt; $5,000</option>
          </select>
        </div>
      </div>

      {/* Main Double Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Client Table (Col Span 9) */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden lg:col-span-9">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/60 text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-5 py-3.5">Client Name</th>
                  <th className="px-5 py-3.5">Company</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Total Revenue</th>
                  <th className="px-5 py-3.5">Engagement Score</th>
                  <th className="px-5 py-3.5 text-right">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredClients.map((client) => {
                  const face = getAvatarForName(client.contactName);
                  const engagement = getEngagementScore(client.company);
                  const historicalRev = getHistoricalRevenue(client.company, client.mrr);
                  const isActive = client.status === 'active';

                  return (
                    <tr
                      key={client.id}
                      onClick={() => onSelectClient(client)}
                      className="hover:bg-slate-50/40 transition-colors cursor-pointer group"
                    >
                      {/* Client Name with photo avatar */}
                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={face}
                            alt={client.contactName}
                            referrerPolicy="no-referrer"
                            className="w-8.5 h-8.5 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-800 block group-hover:text-blue-600 transition-colors">
                              {client.contactName}
                            </span>
                            <span className="text-[10px] text-slate-400 block">{client.contactEmail}</span>
                          </div>
                        </div>
                      </td>

                      {/* Company Name */}
                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-700 block">{client.company}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{client.projectType}</span>
                      </td>

                      {/* Status Badges */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isActive 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : 'bg-rose-50 text-rose-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-rose-400'}`} />
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      {/* Historical Revenue */}
                      <td className="px-5 py-4 font-semibold text-slate-700 font-mono">
                        {historicalRev}
                      </td>

                      {/* Engagement Score visual bar */}
                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-24 bg-slate-100 h-2.5 rounded-full overflow-hidden shrink-0">
                            <div
                              className="bg-blue-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${engagement}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-700 font-mono text-[10px]">{engagement}%</span>
                        </div>
                      </td>

                      {/* Edit icons */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5 opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={(e) => { e.stopPropagation(); onSelectClient(client); }}
                            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredClients.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-slate-400 text-[11px]">
                      No active records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side Floating Summary Panel (Col Span 3) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5 lg:col-span-3">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider font-sans pb-2 border-b border-slate-100">
            Portfolio Metrics
          </h3>

          {/* Metric 1 */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Total Clients</span>
            <span className="text-2xl font-bold text-slate-800 block">247</span>
            <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div className="bg-blue-600 h-full w-[80%]" />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Active This Month</span>
            <span className="text-2xl font-bold text-emerald-600 block">89</span>
            <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full w-[45%]" />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Avg Deal Size</span>
            <span className="text-2xl font-bold text-slate-800 block">₹42,860</span>
            <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div className="bg-blue-500 h-full w-[65%]" />
            </div>
          </div>
        </div>

      </div>

      {/* Onboard Client Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Onboard New Active Client</h3>
                <p className="text-[11px] text-slate-500">Add an immediate operational client profile.</p>
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
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Key Stakeholder Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Miller"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Key Email</label>
                  <input
                    type="email"
                    placeholder="e.g. jane@acme.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">MRR Retainer ($)</label>
                  <input
                    type="number"
                    placeholder="e.g. 5000"
                    value={mrr}
                    onChange={(e) => setMrr(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
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
                  Onboard Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
