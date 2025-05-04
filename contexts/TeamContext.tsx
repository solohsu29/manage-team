"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Team, Player } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

interface TeamContextType {
  teams: Team[];
  addTeam: (team: Omit<Team, "id" | "players">) => void;
  updateTeam: (team: Team) => void;
  deleteTeam: (id: string) => void;
  addPlayerToTeam: (teamId: string, player: Player) => boolean;
  removePlayerFromTeam: (teamId: string, playerId: number) => void;
  getPlayerTeam: (playerId: number) => Team | undefined;
  isPlayerInTeam: (playerId: number) => boolean;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    // Load teams from localStorage on mount
    try {
      const storedTeams = localStorage.getItem("teams");
      console.log('storedTeams', storedTeams);
      
      if (storedTeams && storedTeams !== "undefined") {
        const parsedTeams = JSON.parse(storedTeams);
        if (Array.isArray(parsedTeams)) {
          setTeams(parsedTeams);
        }
      }
    } catch (error) {
      console.error("Failed to load teams from localStorage:", error);
      // Optionally reset to empty array if parsing fails
      setTeams([]);
    }
  }, []);


  const addTeam = (team: Omit<Team, "id" | "players">) => {
    const newTeam: Team = {
      ...team,
      id: uuidv4(),
      players: [],
    };
    localStorage.setItem("teams", JSON.stringify([...teams, newTeam]));
    setTeams([...teams, newTeam]);
  };

  const updateTeam = (updatedTeam: Team) => {
    setTeams(
      teams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
    );
    localStorage.setItem("teams", JSON.stringify( teams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))));
  };

  const deleteTeam = (id: string) => {
    setTeams(teams.filter((team) => team.id !== id));
    localStorage.setItem("teams", JSON.stringify(teams.filter((team) => team.id !== id)));
  };

  const addPlayerToTeam = (teamId: string, player: Player): boolean => {
    // Check if player is already in a team
    const isInTeam = teams.some((team) =>
      team.players.some((p) => p.id === player.id)
    );

    if (isInTeam) {
      return false;
    }
const updatedTeams =  teams.map((team) => {
  if (team.id === teamId) {
    return {
      ...team,
      players: [...team.players, player],
      playerCount: team.players.length + 1,
    };
  }
  return team;
})
    setTeams(
    updatedTeams
    );
localStorage.setItem("teams",JSON.stringify(updateTeam))
    return true;
  };

  const removePlayerFromTeam = (teamId: string, playerId: number) => {
    const updatedTeam =  teams.map((team) => {
      if (team.id === teamId) {
        const updatedPlayers = team.players.filter((p) => p.id !== playerId);
        return {
          ...team,
          players: updatedPlayers,
          playerCount: updatedPlayers.length,
        };
      }
      return team;
    })
    setTeams(
     updatedTeam
    );
    localStorage.setItem("teams",JSON.stringify(updateTeam))
  };

  const getPlayerTeam = (playerId: number): Team | undefined => {
    return teams.find((team) =>
      team.players.some((player) => player.id === playerId)
    );
  };

  const isPlayerInTeam = (playerId: number): boolean => {
    return teams.some((team) =>
      team.players.some((player) => player.id === playerId)
    );
  };

  return (
    <TeamContext.Provider
      value={{
        teams,
        addTeam,
        updateTeam,
        deleteTeam,
        addPlayerToTeam,
        removePlayerFromTeam,
        getPlayerTeam,
        isPlayerInTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
}

