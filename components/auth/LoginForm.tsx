"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Username is required",
        variant: "destructive"
      });
      return;
    }
    
    login(username);
    toast({
      title: "Success",
      description: "You have successfully logged in",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-in fade-in-50 slide-in-from-bottom-10 duration-500">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full font-semibold transition-all hover:scale-[1.02]"
            >
              Sign In
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        No account needed. Just enter a username to get started.
      </CardFooter>
    </Card>
  );
}