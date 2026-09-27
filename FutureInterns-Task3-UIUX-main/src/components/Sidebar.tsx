import { motion } from 'motion/react';
import { LayoutDashboard, Users, UserCheck, CheckSquare, BarChart3, Settings as SettingsIcon, Activity, Flame } from 'lucide-react';
import { TeamMember } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  teamMembers: TeamMember[];
  selectedMember: TeamMember;
  setSelectedMember: (member: TeamMember) => void;
  leadsCount: number;
  clientsCount: number;
  pendingTasksCount: number;
}

export default function Sidebar({
  currentTab,
  setCurrentTab,
  teamMembers,
  selectedMember,
  setSelectedMember,
  leadsCount,
  clientsCount,
  pendingTasksCount,
}: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'pipeline', label: 'Leads', icon: Users, badge: leadsCount },
    { id: 'clients', label: 'Clients', icon: UserCheck, badge: clientsCount },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: pendingTasksCount > 0 ? pendingTasksCount : null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, badge: null },
  ];

  return (
    <div id="sidebar-container" className="w-68 bg-[#0B132B] border-r border-[#1C2541] text-slate-100 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand Header */}
      <div id="sidebar-brand-wrapper" className="p-6 border-b border-[#1C2541] flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Activity className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="font-sans font-bold text-base tracking-tight text-white leading-tight">PixelPulse Agency</h1>
          <span className="text-[10px] text-blue-400 font-mono tracking-wider uppercase font-semibold">CRM Dashboard</span>
        </div>
      </div>

      {/* Operator Switcher (Role Play) */}
      <div id="sidebar-role-selector" className="p-4 mx-3 my-4 bg-[#1C2541]/40 rounded-xl border border-[#1C2541]/80">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Workspace Account:
        </label>
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-semibold text-xs text-blue-400 font-mono">
            {selectedMember.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <select
              id="team-member-dropdown"
              value={selectedMember.name}
              onChange={(e) => {
                const found = teamMembers.find(m => m.name === e.target.value);
                if (found) setSelectedMember(found);
              }}
              className="w-full bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer p-0"
            >
              {teamMembers.map((member) => (
                <option key={member.name} value={member.name} className="bg-[#0B132B] text-slate-200 font-sans">
                  {member.name} ({member.avatar})
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">{selectedMember.role}</p>
          </div>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav id="sidebar-nav" className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group relative ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span>{item.label}</span>
              </div>
              
              {item.badge !== null && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                }`}>
                  {item.badge}
                </span>
              )}

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-white rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Agency Health Indicator Footer */}
      <div id="sidebar-footer" className="p-4 border-t border-[#1C2541] bg-[#0B132B]/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium">System Core Status</span>
          <span className="text-[10px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Active</span>
        </div>
        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full w-[94%]" />
        </div>
        <p className="text-[10px] text-slate-500 mt-2 font-mono leading-relaxed text-center">
          PixelPulse Agency Engine v4.0.2
        </p>
      </div>
    </div>
  );
}
