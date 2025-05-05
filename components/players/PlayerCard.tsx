"use client";

import { Player } from "@/lib/types";
import { useTeam } from "@/contexts/TeamContext";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PlayerCard({ player }: { player: Player }) {
  const { toast } = useToast();
  const { teams, addPlayerToTeam, isPlayerInTeam, getPlayerTeam } = useTeam();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  
  const playerTeam = getPlayerTeam(player.id);
  const isInTeam = isPlayerInTeam(player.id);

  const handleAddToTeam = () => {
    if (teams.length === 0) {
      toast({
        title: "No teams available",
        description: "Create a team first before adding players",
        variant: "destructive",
      });
      return;
    }
    
    setIsDialogOpen(true);
  };

  const confirmAddToTeam = () => {
    if (!selectedTeamId) {
      toast({
        title: "Team required",
        description: "Please select a team",
        variant: "destructive",
      });
      return;
    }

    const success = addPlayerToTeam(selectedTeamId, player);
    
    if (success) {
      toast({
        title: "Player added",
        description: `${player.first_name} ${player.last_name} has been added to the team`,
      });
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Failed to add player",
        description: "This player is already in a team",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="h-full transition-all hover:shadow-md overflow-hidden group">
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg tracking-tight">
              {player.first_name} {player.last_name}
            </h3>
            <p><span className="font-medium">Team:</span> {player.team?.full_name || "N/A"}</p>
<p><span className="font-medium">Division:</span> {player.team?.division || "N/A"}</p>
<p><span className="font-medium">City:</span> {player.team?.city || "N/A"}</p>
<p><span className="font-medium">Conference:</span> {player.team?.conference || "N/A"}</p>
<p><span className="font-medium">Position:</span> {player?.position || "N/A"}</p>

          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {isInTeam ? (
            <div className="w-full bg-muted p-2 rounded-md text-sm text-center">
              In team: <span className="font-semibold">{playerTeam?.name}</span>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
              onClick={handleAddToTeam}
            >
              <UserRoundPlus className="h-4 w-4 mr-2" />
              Add to Team
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Team</DialogTitle>
            <DialogDescription>
              Select a team to add {player.first_name} {player.last_name} to
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAddToTeam}>
              Add Player
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}