"use client";

import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import TeamsList from "@/components/teams/TeamsList";

export default function TeamsPage() {
  const {user} = useAuth()
  if (!user.isLoggedIn) {
    redirect("/");
    return null;
  }
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Teams</h1>
        <p className="text-muted-foreground">
          Create and manage your basketball teams
        </p>
      </div>
      
      <TeamsList />
    </div>
  );
}