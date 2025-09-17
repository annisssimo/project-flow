export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  lastActiveAt: Date;
}

export type UserRole = "admin" | "manager" | "member" | "viewer";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  teamId: string;
  progress: number;
  tags: string[];
}

export type ProjectStatus = "planning" | "active" | "on-hold" | "completed" | "cancelled";
export type Priority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId?: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  subtasks: Subtask[];
}

export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  userId: string;
  role: UserRole;
  joinedAt: Date;
  permissions: Permission[];
}

export type Permission = 
  | "project:create"
  | "project:edit"
  | "project:delete"
  | "task:create"
  | "task:edit"
  | "task:delete"
  | "team:manage"
  | "analytics:view";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  userId: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export type NotificationType = "task_assigned" | "task_completed" | "project_updated" | "team_invite" | "deadline_approaching";

export interface Analytics {
  projectStats: {
    total: number;
    active: number;
    completed: number;
    overdue: number;
  };
  taskStats: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
  teamStats: {
    totalMembers: number;
    activeMembers: number;
    productivity: number;
  };
  timeTracking: {
    totalHours: number;
    thisWeek: number;
    lastWeek: number;
    trend: "up" | "down" | "stable";
  };
}

export interface DashboardData {
  recentProjects: Project[];
  recentTasks: Task[];
  upcomingDeadlines: Task[];
  teamActivity: Activity[];
  analytics: Analytics;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  userId: string;
  userName: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
