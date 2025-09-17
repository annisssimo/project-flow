"use client";

import { motion } from "framer-motion";
import { Header } from "./Header";
import { StatsOverview } from "./StatsOverview";
import { RecentProjects } from "./RecentProjects";
import { RecentTasks } from "./RecentTasks";
import { TeamActivity } from "./TeamActivity";
import { QuickActions } from "./QuickActions";

export function Dashboard() {
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
    </div>
  );
}
