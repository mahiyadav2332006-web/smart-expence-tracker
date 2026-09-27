export type LeadStage = 'new' | 'contacted' | 'proposal' | 'converted' | 'lost';
export type ClientStatus = 'active' | 'onboarding' | 'paused' | 'completed';
export type ActivityType = 'email' | 'call' | 'meeting' | 'proposal' | 'note' | 'system';
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'completed';
export type HealthScore = 'high' | 'medium' | 'low';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
  createdBy: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  stage: LeadStage;
  value: number;
  source: string;
  confidence: number; // 0-100
  owner: string;
  notes: string;
  createdAt: string;
  lastContacted: string;
  activities: Activity[];
}

export interface Client {
  id: string;
  name: string;
  company: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: ClientStatus;
  mrr: number; // Monthly Recurring Revenue or Project Value
  projectType: string;
  healthScore: HealthScore;
  owner: string;
  startDate: string;
  notes: string;
  activities: Activity[];
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
  relatedTo?: {
    type: 'lead' | 'client';
    id: string;
    name: string;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  email: string;
}
