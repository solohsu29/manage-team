"use client";

import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import PlayersList from "@/components/players/PlayersList";

export default function PlayersPage() {
  const { user } = useAuth();

  // Redirect to home if not logged in
  if (!user.isLoggedIn) {
    redirect("/");
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Players</h1>
        <p className="text-muted-foreground">
          Browse through NBA players and add them to your teams
        </p>
      </div>
      
      <PlayersList />
    </div>
  );
}