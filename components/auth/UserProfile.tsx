"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 bg-primary/10">
          <AvatarFallback className="text-primary">
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium hidden md:inline">{user.username}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="gap-1 text-destructive hover:text-destructive-foreground hover:bg-destructive/90 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </div>
  );
}