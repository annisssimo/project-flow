"use client";

import { motion } from "@/components/ui/simple-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function TasksPage() {
  const { tasks, updateTask } = useProjectStore();

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

  const handleStatusToggle = (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === "done" ? "todo" : "done";
    updateTask(taskId, { status: newStatus });
    toast.success(`Task marked as ${newStatus}`);
  };

  const handleTaskClick = (taskTitle: string) => {
    toast.success(`Opening task: ${taskTitle}`);
  };

  const handleMoreClick = (taskTitle: string) => {
    toast.success(`More options for ${taskTitle}`);
  };

  const handleCreateTask = () => {
    toast.success("Task creation form coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Tasks
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage and track your tasks
              </p>
            </div>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handleCreateTask}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {task.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(task.priority)}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        {task.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMoreClick(task.title)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center space-x-2 cursor-pointer hover:scale-110 transition-transform"
                          onClick={() =>
                            handleStatusToggle(task.id, task.status)
                          }
                        >
                          {getStatusIcon(task.status)}
                          <span className="text-sm font-medium">
                            {task.status === "done"
                              ? "Completed"
                              : "In Progress"}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={getStatusColor(task.status)}
                        >
                          {task.status}
                        </Badge>
                      </div>

                      {task.dueDate && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Due {formatRelativeTime(task.dueDate)}
                        </div>
                      )}

                      {task.estimatedHours && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Estimated: {task.estimatedHours}h
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {tasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <CheckCircle className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No tasks found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Create your first task to get started
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
