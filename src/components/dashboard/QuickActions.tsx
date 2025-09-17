"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Users, 
  FileText, 
  BarChart3,
  Calendar,
  Settings
} from "lucide-react";

const quickActions = [
  {
    title: "New Project",
    description: "Create a new project",
    icon: Plus,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
  },
  {
    title: "Add Team Member",
    description: "Invite someone to your team",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    hoverColor: "hover:bg-green-100 dark:hover:bg-green-900/30",
  },
  {
    title: "Create Task",
    description: "Add a new task",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    hoverColor: "hover:bg-purple-100 dark:hover:bg-purple-900/30",
  },
  {
    title: "View Analytics",
    description: "Check project metrics",
    icon: BarChart3,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    hoverColor: "hover:bg-orange-100 dark:hover:bg-orange-900/30",
  },
  {
    title: "Schedule Meeting",
    description: "Plan a team meeting",
    icon: Calendar,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    hoverColor: "hover:bg-indigo-100 dark:hover:bg-indigo-900/30",
  },
  {
    title: "Settings",
    description: "Configure preferences",
    icon: Settings,
    color: "text-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    hoverColor: "hover:bg-gray-100 dark:hover:bg-gray-900/30",
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start h-auto p-3 ${action.hoverColor}`}
                >
                  <div className={`p-2 rounded-lg ${action.bgColor} mr-3`}>
                    <Icon className={`h-4 w-4 ${action.color}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
