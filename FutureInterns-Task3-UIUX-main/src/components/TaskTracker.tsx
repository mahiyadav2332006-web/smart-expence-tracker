import React, { useState } from 'react';
import { Calendar, CheckCircle, Info, Edit2, Trash2, Check, Plus, AlertCircle } from 'lucide-react';
import { Task, TaskPriority, TeamMember, Lead, Client } from '../types';
import { getAvatarForName } from '../utils/avatar';

interface TaskTrackerProps {
  tasks: Task[];
  teamMembers: TeamMember[];
  leads: Lead[];
  clients: Client[];
  onAddTask: (task: Omit<Task, 'id' | 'status'>) => void;
  onToggleTask: (id: string) => void;
  currentOperator: TeamMember;
}

export default function TaskTracker({
  tasks,
  teamMembers,
  leads,
  clients,
  onAddTask,
  onToggleTask,
  currentOperator,
}: TaskTrackerProps) {
  const [scopeTab, setScopeTab] = useState<'my' | 'team'>('my');
  const [timeFilter, setTimeFilter] = useState<'overdue' | 'upcoming'>('upcoming');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Create Task Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const [newAssignedTo, setNewAssignedTo] = useState(currentOperator.name);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDueDate) return;

    onAddTask({
      title: newTitle,
      dueDate: newDueDate,
      priority: newPriority,
      assignedTo: newAssignedTo,
    });

    setNewTitle('');
    setNewDueDate('');
    setNewPriority('medium');
    setShowAddModal(false);
  };

  // Predefined Mock tasks representing exact image 2 names & priorities
  const imageTasks = [
    {
      id: 'it1',
      title: 'Raum',
      dueDate: '2024-04-12',
      priority: 'high',
      status: 'pending',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      client: 'Nova Labs'
    },
    {
      id: 'it2',
      title: 'Through Mobile',
      dueDate: '2024-04-12',
      priority: 'high',
      status: 'pending',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      client: 'SkyForge Technologies'
    },
    {
      id: 'it3',
      title: 'Halleyear',
      dueDate: '2024-04-12',
      priority: 'medium',
      status: 'pending',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      client: 'Quantum Technologies'
    },
    {
      id: 'it4',
      title: 'Double Meal',
      dueDate: '2024-04-12',
      priority: 'low',
      status: 'pending',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      client: 'Nova Labs'
    },
    {
      id: 'it5',
      title: 'Berriege',
      dueDate: '2024-04-12',
      priority: 'low',
      status: 'completed',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      client: 'TechStart Solutions'
    },
    {
      id: 'it6',
      title: 'Roar Courage',
      dueDate: '2024-04-12',
      priority: 'high',
      status: 'pending',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      client: 'Bloom Cosmetics'
    }
  ];

  // Merge state with mock tasks to ensure we are responsive and high-fidelity
  const displayedTasks = [
    ...tasks.map(t => ({
      id: t.id,
      title: t.title,
      dueDate: t.dueDate,
      priority: t.priority,
      status: t.status,
      avatarUrl: getAvatarForName(t.assignedTo),
      client: t.relatedTo?.name || 'PixelPulse Internal'
    })),
    ...imageTasks.filter(it => !tasks.some(t => t.title === it.title))
  ];

  // Calendar cells definition to replicate exact placement of numbers & dots
  const calendarCells = [
    { num: '', dots: [] },
    { num: '', dots: [] },
    { num: '1', dots: ['blue'] },
    { num: '8', dots: ['blue'] },
    { num: '1', dots: ['blue'] },
    { num: '12', dots: ['blue'] },
    { num: '13', dots: ['orange'] },
    
    { num: '7', dots: [] },
    { num: '6', dots: [] },
    { num: '8', dots: [] },
    { num: '9', dots: [] },
    { num: '6', dots: [] },
    { num: '12', dots: ['orange'] },
    { num: '14', dots: [] },
    
    { num: '3', dots: [] },
    { num: '5', dots: [] },
    { num: '7', dots: [] },
    { num: '14', dots: ['orange'] },
    { num: '19', dots: ['green'] },
    { num: '10', dots: ['green'] },
    { num: '17', dots: ['orange'] },
    
    { num: '16', dots: ['blue'] },
    { num: '19', dots: [] },
    { num: '18', dots: [] },
    { num: '13', dots: ['blue'] },
    { num: '15', dots: ['green'] },
    { num: '11', dots: ['orange'] },
    { num: '26', dots: ['orange'] },
    
    { num: '21', dots: ['green'] },
    { num: '27', dots: ['blue'] },
    { num: '22', dots: ['green'] },
    { num: '24', dots: ['green'] },
    { num: '24', dots: [] },
    { num: '28', dots: ['orange'] },
    { num: '29', dots: ['orange'] },
    
    { num: '27', dots: [] },
    { num: '26', dots: [] },
    { num: '29', dots: [] },
    { num: '29', dots: [] },
    { num: '', dots: [] },
    { num: '', dots: [] },
    { num: '', dots: [] },
  ];

  return (
    <div id="tasks-tracker-view" className="p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-50/40">
      
      {/* Top Header Buttons & Quick Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-sans tracking-tight">Professional CRM Task Tracker UI</h2>
          <p className="text-xs text-slate-500 mt-1">Coordinate daily focus items and check off priority sprints</p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 active:bg-blue-800 transition-all cursor-pointer shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Primary Sub Tabs Row */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        {/* Left Scope Toggles */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setScopeTab('my')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              scopeTab === 'my' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            My Tasks
          </button>
          <button
            onClick={() => setScopeTab('team')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              scopeTab === 'team' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Team Tasks
          </button>
        </div>

        {/* Right Filter Slider Slider */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setTimeFilter('overdue')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeFilter === 'overdue' ? 'bg-[#1E293B] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Overdue
          </button>
          <button
            onClick={() => setTimeFilter('upcoming')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeFilter === 'upcoming' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* Grid of 4 Slate Status KPI Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-[#DFE4EC]/70 p-4 rounded-xl border border-slate-200/50 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 font-sans block">Due Today</span>
            <span className="text-2xl font-bold text-slate-800 block mt-1">5</span>
          </div>
          <Calendar className="w-5 h-5 text-slate-400" />
        </div>

        {/* Card 2 */}
        <div className="bg-[#DFE4EC]/70 p-4 rounded-xl border border-slate-200/50 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 font-sans block">Overdue</span>
            <span className="text-2xl font-bold text-slate-800 block mt-1">2</span>
          </div>
          <Calendar className="w-5 h-5 text-slate-400" />
        </div>

        {/* Card 3 */}
        <div className="bg-[#DFE4EC]/70 p-4 rounded-xl border border-slate-200/50 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 font-sans block">This Week</span>
            <span className="text-2xl font-bold text-slate-800 block mt-1">12</span>
          </div>
          <Info className="w-5 h-5 text-slate-400" />
        </div>

        {/* Card 4 */}
        <div className="bg-[#DFE4EC]/70 p-4 rounded-xl border border-slate-200/50 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 font-sans block">Completed</span>
            <span className="text-2xl font-bold text-slate-800 block mt-1">28</span>
          </div>
          <CheckCircle className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      {/* Main Split Body: Calendar + Task list */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Mini-Calendar View (Grid span 5) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm xl:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Workspace Calendar</h3>
            <span className="text-xs text-blue-600 font-bold">April 2024</span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center font-sans text-xs">
            {/* Headers exactly as mockups or clean abbreviations */}
            <div className="text-slate-400 font-medium py-1">Diμ</div>
            <div className="text-slate-400 font-medium py-1">Fre0</div>
            <div className="text-slate-400 font-medium py-1">TeM</div>
            <div className="text-slate-400 font-medium py-1">Nst</div>
            <div className="text-slate-400 font-medium py-1">CeSt</div>
            <div className="text-slate-400 font-medium py-1">Test</div>
            <div className="text-slate-400 font-medium py-1">Get</div>

            {/* Matrix Cells */}
            {calendarCells.map((cell, idx) => (
              <div
                key={idx}
                className={`h-10 flex flex-col items-center justify-center rounded-lg relative hover:bg-slate-50 transition-colors cursor-pointer ${
                  cell.num ? 'border border-slate-100/30' : ''
                }`}
              >
                <span className={`font-semibold ${cell.num ? 'text-slate-700' : 'text-slate-300'}`}>{cell.num}</span>
                
                {/* Dots wrapper */}
                {cell.dots.length > 0 && (
                  <div className="flex items-center justify-center space-x-0.5 absolute bottom-1">
                    {cell.dots.map((dot, dIdx) => (
                      <span
                        key={dIdx}
                        className={`w-1.5 h-1.5 rounded-full ${
                          dot === 'blue'
                            ? 'bg-blue-500'
                            : dot === 'orange'
                            ? 'bg-orange-400'
                            : 'bg-emerald-500'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Tasks list (Grid span 7) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm xl:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-slate-800">Task Actions checklist</h3>

          <div className="divide-y divide-slate-100 space-y-3.5">
            {displayedTasks.map((task, idx) => {
              const isComp = task.status === 'completed';
              return (
                <div
                  key={task.id}
                  className={`flex items-center justify-between pt-3.5 first:pt-0 group ${
                    isComp ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={isComp}
                      onChange={() => onToggleTask(task.id)}
                      className="w-4.5 h-4.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                    />

                    {/* Circle Face Photo Avatar */}
                    <img
                      src={task.avatarUrl}
                      alt={task.title}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />

                    {/* Title, Due Date & Tags */}
                    <div className="min-w-0">
                      <p className={`text-sm font-bold text-slate-800 leading-snug truncate ${isComp ? 'line-through text-slate-400' : ''}`}>
                        {task.title}
                      </p>
                      
                      <div className="flex items-center space-x-2.5 mt-1 text-[11px] text-slate-400">
                        <span>Due: {task.dueDate}</span>
                        <span>•</span>
                        <span className="font-semibold text-blue-600">{task.client}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Priority tags & Action icons */}
                  <div className="flex items-center space-x-4 shrink-0">
                    {/* Priority badge matches Image 2 tags ("High", "Medium", "Low") */}
                    <div className="flex space-x-1 text-[9px] font-bold uppercase tracking-wider">
                      <span className={`px-2 py-0.5 rounded ${task.priority === 'high' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        High
                      </span>
                      <span className={`px-2 py-0.5 rounded ${task.priority === 'medium' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        Medium
                      </span>
                      <span className={`px-2 py-0.5 rounded ${task.priority === 'low' ? 'bg-slate-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        Low
                      </span>
                    </div>

                    {/* Action Buttons: Edit, Delete, Complete overlay */}
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors" title="Edit">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 hover:bg-rose-50 rounded text-slate-400 hover:text-rose-600 transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      
                      {/* Active Blue Check Complete overlay */}
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          isComp 
                            ? 'bg-blue-600 text-white border border-blue-500' 
                            : 'bg-slate-50 border border-slate-200 text-slate-400 hover:border-blue-500 hover:text-blue-500'
                        }`}
                        title="Mark Complete"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Task Creation Inline Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Assign Work Action</h3>
                <p className="text-[11px] text-slate-500">Add checklist items to the dashboard.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Task Title / Action Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Follow up on proposal feedback"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none text-slate-700"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Assignee</label>
                <select
                  value={newAssignedTo}
                  onChange={(e) => setNewAssignedTo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none text-slate-700"
                >
                  {teamMembers.map(m => (
                    <option key={m.name} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
