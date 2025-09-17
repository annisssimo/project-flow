"use client";

import { motion } from "@/components/ui/simple-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { formatRelativeTime, getInitials } from "@/lib/utils";
import { 
  CheckCircle, 
  Plus, 
  MessageSquare, 
  FileText,
  UserPlus
} from "lucide-react";

const mockActivities = [
  {
    id: "1",
    type: "task_completed",
    description: "completed task 'Implement user authentication'",
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: "2",
    type: "project_created",
    description: "created new project 'Mobile App Redesign'",
    userName: "Mike Chen",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    icon: Plus,
    color: "text-blue-600",
  },
  {
    id: "3",
    type: "comment_added",
    description: "added comment on 'Design product catalog UI'",
    userName: "Emily Davis",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    icon: MessageSquare,
    color: "text-purple-600",
  },
  {
    id: "4",
    type: "document_uploaded",
    description: "uploaded wireframes for mobile app",
    userName: "Alex Rodriguez",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    icon: FileText,
    color: "text-orange-600",
  },
  {
    id: "5",
    type: "member_added",
    description: "joined the Frontend Team",
    userName: "Lisa Wang",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    icon: UserPlus,
    color: "text-indigo-600",
  },
];

export function TeamActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Team Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockActivities.map((activity, index) => {
            const Icon = activity.icon;
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="flex-shrink-0">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.userAvatar} alt={activity.userName} />
                      <AvatarFallback>{getInitials(activity.userName)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 p-1 bg-white dark:bg-gray-900 rounded-full`}>
                      <Icon className={`h-3 w-3 ${activity.color}`} />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.userName}</span>{" "}
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </motion.div>
            );
          })}
          
          <div className="pt-2">
            <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              View all activity →
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
