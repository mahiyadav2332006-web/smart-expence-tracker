import React, { useState } from 'react';
import { Settings, Users, Percent, ShieldCheck, Save, Plus, Mail, ShieldAlert, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { TeamMember } from '../types';

interface SettingsViewProps {
  teamMembers: TeamMember[];
  onAddTeamMember: (member: TeamMember) => void;
  agencyName: string;
  onChangeAgencyName: (name: string) => void;
}

export default function SettingsView({
  teamMembers,
  onAddTeamMember,
  agencyName,
  onChangeAgencyName,
}: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'team' | 'rules'>('profile');
  const [successToast, setSuccessToast] = useState(false);

  // Profile configuration states
  const [localAgencyName, setLocalAgencyName] = useState(agencyName);
  const [currency, setCurrency] = useState('INR (₹)');
  const [timezone, setTimezone] = useState('Asia/Kolkata (GMT+5:30)');
  const [contactEmail, setContactEmail] = useState('contact@pixelpulse.agency');

  // New Member states
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Account Executive');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  // Priority threshold sliders
  const [hotThreshold, setHotThreshold] = useState('75');
  const [warmThreshold, setWarmThreshold] = useState('55');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeAgencyName(localAgencyName);
    triggerSuccessToast();
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberEmail) return;

    // Create 2-letter uppercase initials for avatar
    const words = newMemberName.trim().split(' ');
    const initials = words.length > 1
      ? (words[0][0] + words[1][0]).toUpperCase()
      : words[0].substring(0, 2).toUpperCase();

    onAddTeamMember({
      name: newMemberName,
      role: newMemberRole,
      avatar: initials,
      email: newMemberEmail,
    });

    setNewMemberName('');
    setNewMemberEmail('');
    triggerSuccessToast();
  };

  const triggerSuccessToast = () => {
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
    }, 3000);
  };

  return (
    <div id="crm-settings-view" className="p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-50/40">
      
      {/* Toast Feedback Banner */}
      {successToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700/50 z-50 flex items-center space-x-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-semibold">Configuration saved successfully! Workspace sync active.</span>
        </div>
      )}

      {/* Header text */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Settings className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-800 font-sans tracking-tight">System Settings & Playbooks</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure system rules, lead quality parameters, default metrics, and team ownership assignments
          </p>
        </div>
      </div>

      {/* Inner Sub layout: Navigation Side Toggles + Segment card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Navigation Rails (Col span 3) */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-1.5 lg:col-span-3">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Agency Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'team'
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team Roster ({teamMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Percent className="w-4 h-4" />
            <span>Deal Stage & Priority Rules</span>
          </button>
        </div>

        {/* Right Side Settings Panel (Col span 9) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:col-span-9">
          
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 font-sans uppercase tracking-wider">Agency Details</h3>
                <p className="text-[11px] text-slate-400">Configure global branding names used across reports, client invoices and summaries.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1.5">Agency Name *</label>
                  <input
                    type="text"
                    required
                    value={localAgencyName}
                    onChange={(e) => setLocalAgencyName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1.5">Support & Escalations Mail</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1.5">Default Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none text-slate-700 font-medium"
                  >
                    <option value="INR (₹)">Indian Rupee - INR (₹)</option>
                    <option value="USD ($)">United States Dollar - USD ($)</option>
                    <option value="EUR (€)">Eurozone Euro - EUR (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1.5">Local Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none text-slate-700 font-medium"
                  >
                    <option value="Asia/Kolkata (GMT+5:30)">Asia/Kolkata (GMT+5:30)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                    <option value="EST (GMT-5:00)">Eastern Standard Time (GMT-5:00)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 font-sans uppercase tracking-wider">Workspace Executive Roster</h3>
                <p className="text-[11px] text-slate-400">Add or manage executive members assigned to client accounts and pipeline deals.</p>
              </div>

              {/* Add Member form */}
              <form onSubmit={handleAddMember} className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/50 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Professional Role</label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none text-slate-700"
                  >
                    <option value="Account Manager">Account Manager</option>
                    <option value="Lead UI/UX Designer">Lead UI/UX Designer</option>
                    <option value="Growth specialist">Growth Specialist</option>
                    <option value="Associate Consultant">Associate Consultant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Email *</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@pixelpulse.agency"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500 flex-1"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg flex items-center justify-center shrink-0 cursor-pointer"
                      title="Add Executive"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Roster display */}
              <div className="divide-y divide-slate-100">
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex items-center justify-between py-3.5 first:pt-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-[#E2E8F0] border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 font-mono">
                        {member.avatar}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-xs block">{member.name}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{member.role}</span>
                      </div>
                    </div>

                    <span className="text-xs text-slate-500 font-mono">{member.email}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 font-sans uppercase tracking-wider">Priority Classification Rules</h3>
                <p className="text-[11px] text-slate-400">Define pipeline deal metrics and thresholds for automated priority markings.</p>
              </div>

              <div className="space-y-5 pt-2">
                
                {/* Rule slider 1 */}
                <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-200/40 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-700 block">Hot Deal Confidence Threshold</span>
                      <span className="text-[10px] text-slate-400">Leads above this win confidence are categorized as hot action items</span>
                    </div>
                    <span className="font-bold text-blue-600 font-mono text-sm">{hotThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="65"
                    max="95"
                    value={hotThreshold}
                    onChange={(e) => setHotThreshold(e.target.value)}
                    className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Rule slider 2 */}
                <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-200/40 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-700 block">Warm Deal Confidence Threshold</span>
                      <span className="text-[10px] text-slate-400">Leads above this win confidence are categorized as warm prospects</span>
                    </div>
                    <span className="font-bold text-amber-500 font-mono text-sm">{warmThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="64"
                    value={warmThreshold}
                    onChange={(e) => setWarmThreshold(e.target.value)}
                    className="w-full accent-amber-500 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-50/50 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-blue-800 block">Automated Rule Engine</span>
                    <p className="text-[10px] text-blue-700/80 leading-relaxed">
                      Adjusting confidence parameters triggers live updates across the pipeline Kanban and analytics trackers instantly.
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={triggerSuccessToast}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Rules
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
