"use client";

import { motion } from "@/components/ui/simple-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/store/useProjectStore";
import {
  formatRelativeTime,
  getPriorityColor,
  getStatusColor,
} from "@/lib/utils";
import {
  CheckCircle,
  Circle,
  Clock,
  MoreHorizontal,
  ArrowRight,
  User,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export function RecentTasks() {
  const { tasks, updateTask } = useProjectStore();

  const recentTasks = tasks.slice(0, 4);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleTaskClick = (taskId: string, taskTitle: string) => {
    toast.success(`Opening task: ${taskTitle}`);
  };

  const handleStatusToggle = (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === "done" ? "todo" : "done";
    updateTask(taskId, { status: newStatus });
    toast.success(`Task marked as ${newStatus}`);
  };

  const handleMoreClick = (taskTitle: string) => {
    toast.info(`More options for ${taskTitle}`);
  };

  const handleViewAllClick = () => {
    toast.info("Navigating to tasks page...");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Tasks</CardTitle>
          <Link href="/tasks">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewAllClick}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div
                className="flex-shrink-0 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => handleStatusToggle(task.id, task.status)}
              >
                {getStatusIcon(task.status)}
              </div>

              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => handleTaskClick(task.id, task.title)}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {task.title}
                  </h4>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>Assigned</span>
                  </div>
                  <span>•</span>
                  <span>{formatRelativeTime(task.updatedAt)}</span>
                  {task.dueDate && (
                    <>
                      <span>•</span>
                      <span>Due {formatRelativeTime(task.dueDate)}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${getStatusColor(task.status)}`}
                >
                  {task.status}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoreClick(task.title);
                  }}
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
