"use client";

import { useState } from "react";
import { motion } from "@/components/ui/simple-motion";
import { Header } from "./Header";
import { StatsOverview } from "./StatsOverview";
import { RecentProjects } from "./RecentProjects";
import { RecentTasks } from "./RecentTasks";
import { TeamActivity } from "./TeamActivity";
import { QuickActions } from "./QuickActions";
import { CreateProjectModal } from "@/components/modals/CreateProjectModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
// import { toast } from "react-hot-toast";

export function Dashboard() {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);

  const handleCreateProject = () => {
    setIsCreateProjectModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, John! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Here&apos;s what&apos;s happening with your projects today.
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handleCreateProject}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          <StatsOverview />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <RecentProjects />
              <RecentTasks />
            </div>
            
            <div className="space-y-8">
              <QuickActions />
              <TeamActivity />
            </div>
          </div>
        </motion.div>
      </main>

      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
      />
    </div>
  );
}
