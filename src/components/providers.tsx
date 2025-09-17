"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import { mockData } from "@/lib/mockData";

interface AppContextType {
  isInitialized: boolean;
}

const AppContext = createContext<AppContextType>({
  isInitialized: false,
});

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { setProjects, setTasks, setTeams, setAnalytics } = useProjectStore();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        setProjects(mockData.projects);
        setTasks(mockData.tasks);
        setTeams(mockData.teams);
        setAnalytics(mockData.analytics);
        
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize app:", error);
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [setProjects, setTasks, setTeams, setAnalytics]);

  return (
    <AppContext.Provider value={{ isInitialized }}>
      {children}
    </AppContext.Provider>
  );
}