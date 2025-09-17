"use client";

import { motion } from "@/components/ui/simple-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProjectStore } from "@/store/useProjectStore";
import { getInitials } from "@/lib/utils";
import { 
  Mail, 
  MoreHorizontal,
  UserPlus,
  Crown,
  Shield,
  User
} from "lucide-react";
import { toast } from "react-hot-toast";

const mockTeamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    role: "admin",
    status: "online",
    lastActive: "2 minutes ago",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    role: "manager",
    status: "online",
    lastActive: "5 minutes ago",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    role: "member",
    status: "away",
    lastActive: "1 hour ago",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    role: "member",
    status: "offline",
    lastActive: "3 hours ago",
  },
];

export default function TeamPage() {
  // const { teams } = useProjectStore();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case "manager":
        return <Shield className="h-4 w-4 text-blue-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const handleInviteMember = () => {
    toast.success("Invitation sent successfully!");
  };

  const handleMemberClick = (memberName: string) => {
    toast.success(`Opening ${memberName}'s profile...`);
  };

  const handleMoreClick = (memberName: string) => {
    toast.info(`More options for ${memberName}`);
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
                Team
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your team members and permissions
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handleInviteMember}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTeamMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer"
                      onClick={() => handleMemberClick(member.name)}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 ${getStatusColor(member.status)}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {member.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {getRoleIcon(member.role)}
                            <Badge 
                              variant="outline" 
                              className="text-xs capitalize"
                            >
                              {member.role}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{member.email}</span>
                          </div>
                          <span>•</span>
                          <span>Last active {member.lastActive}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoreClick(member.name);
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Team Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Members</span>
                    <span className="font-semibold text-gray-900 dark:text-white">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Online Now</span>
                    <span className="font-semibold text-green-600">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Projects</span>
                    <span className="font-semibold text-blue-600">3</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleInviteMember}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite New Member
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => toast.info("Team settings coming soon!")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Manage Permissions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
