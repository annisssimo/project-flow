"use client";

import { motion } from "@/components/ui/simple-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProjectStore } from "@/store/useProjectStore";
import { 
  Users, 
  CheckCircle, 
  Clock,
  BarChart3
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function StatsOverview() {
  const { analytics } = useProjectStore();

  if (!analytics) return null;

  const stats = [
    {
      title: "Active Projects",
      value: analytics.projectStats.active,
      total: analytics.projectStats.total,
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Team Members",
      value: analytics.teamStats.activeMembers,
      total: analytics.teamStats.totalMembers,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Completed Tasks",
      value: analytics.taskStats.completed,
      total: analytics.taskStats.total,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Hours This Week",
      value: analytics.timeTracking.thisWeek,
      total: 40,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        const percentage = Math.round((stat.value / stat.total) * 100);

        return (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      of {stat.total}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {percentage}%
                    </span>
                  </div>
                  <Progress value={percentage} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
