"use client";

import { Team } from "@/lib/types";
import { useTeam } from "@/contexts/TeamContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TeamPlayersList({ team }: { team: Team }) {
  const { removePlayerFromTeam } = useTeam();
  const { toast } = useToast();

  const handleRemovePlayer = (playerId: number, playerName: string) => {
    removePlayerFromTeam(team.id, playerId);
    toast({
      title: "Player removed",
      description: `${playerName} has been removed from ${team.name}`,
    });
  };

  if (team?.players?.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          This team has no players. Add players from the Players page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-2">
      {team?.players.map((player) => (
        <div
          key={player.id}
          className="flex items-center justify-between p-3 border rounded-md group hover:bg-muted/50 transition-colors"
        >
          <div className="flex flex-col">
            <span className="font-medium">
              {player?.first_name} {player?.last_name}
            </span>
            <span className="text-sm text-muted-foreground">
              {player?.position || "No position"} • {player?.abbreviation}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            onClick={() => handleRemovePlayer(player?.id, `${player?.first_name} ${player?.last_name}`)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}