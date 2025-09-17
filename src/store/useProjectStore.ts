import { create } from "zustand";
import { Project, Task, Team, Analytics } from "@/types";

interface ProjectState {
  projects: Project[];
  tasks: Task[];
  teams: Team[];
  currentProject: Project | null;
  analytics: Analytics | null;
  isLoading: boolean;
  setProjects: (projects: Project[]) => void;
  setTasks: (tasks: Task[]) => void;
  setTeams: (teams: Team[]) => void;
  setCurrentProject: (project: Project | null) => void;
  setAnalytics: (analytics: Analytics) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  tasks: [],
  teams: [],
  currentProject: null,
  analytics: null,
  isLoading: false,
  setProjects: (projects) => set({ projects }),
  setTasks: (tasks) => set({ tasks }),
  setTeams: (teams) => set({ teams }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setAnalytics: (analytics) => set({ analytics }),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      ),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),
  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}));
