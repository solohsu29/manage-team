"use client";

import { useState } from "react";
import { Team } from "@/lib/types";
import { useTeam } from "@/contexts/TeamContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import TeamForm from "@/components/teams/TeamForm";
import TeamPlayersList from "@/components/teams/TeamPlayersList";

export default function TeamCard({ team }: { team: Team }) {
  const { deleteTeam } = useTeam();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPlayersDialogOpen, setIsPlayersDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteTeam(team.id);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Team deleted",
      description: `${team.name} has been deleted`,
    });
  };

  return (
    <>
      <Card className="h-full hover:shadow-md transition-all relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{team.name}</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{team.players.length}</span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p><span className="font-medium">Region:</span> {team.region}</p>
          <p><span className="font-medium">Country:</span> {team.country}</p>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlayersDialogOpen(true)}
            className="flex-1"
          >
            <Users className="h-4 w-4 mr-2" />
            Players
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditDialogOpen(true)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Edit team dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription>
              Update the team information below
            </DialogDescription>
          </DialogHeader>
          <TeamForm
            team={team}
            onSuccess={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete team confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {team.name}? This action cannot be undone.
              All players will be removed from this team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View team players dialog */}
      <Dialog open={isPlayersDialogOpen} onOpenChange={setIsPlayersDialogOpen}>
        <DialogContent className="max-w-screen-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{team.name} - Players</DialogTitle>
            <DialogDescription>
              {team.players.length > 0
                ? `Manage the players in ${team.name}`
                : `${team.name} has no players yet. Add players from the Players page.`}
            </DialogDescription>
          </DialogHeader>
          <TeamPlayersList team={team} />
          <DialogFooter>
            <Button onClick={() => setIsPlayersDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}