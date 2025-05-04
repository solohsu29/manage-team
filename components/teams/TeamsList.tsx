"use client";

import { useState } from "react";
import { useTeam } from "@/contexts/TeamContext";
import TeamCard from "@/components/teams/TeamCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TeamForm from "@/components/teams/TeamForm";
import { Label } from "../ui/label";

export default function TeamsList() {
  const { teams } = useTeam();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Your Teams</h2>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          New Team
        </Button>
      </div>

      {teams.length === 0 ? (
        <div className="border rounded-lg p-8 text-center shadow-sm animate-in fade-in-50">
          <h3 className="text-lg font-medium mb-2">No teams yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first team to start adding players
          </p>
          <Button
            variant="outline"
            onClick={() => setIsCreateDialogOpen(true)}
            className="gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Create Team
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}

      {/* Create team dialog */}
   
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="p-4">
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new team
            </DialogDescription>
          </DialogHeader>
          <TeamForm onSuccess={() => setIsCreateDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    

    
    </div>
  );
}