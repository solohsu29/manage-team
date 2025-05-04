"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Player } from "@/lib/types"; // Should be Team if you're rendering teams
import PlayerCard from "@/components/players/PlayerCard";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({ apiKey: "105b1e70-c54c-49f1-ac89-4d9da6b3ff81" });

const ITEMS_PER_PAGE = 5; // Smaller chunks for scroll feel

export default function PlayersList() {
  const [teams, setTeams] = useState<Player[]>([]);
  const [displayedTeams, setDisplayedTeams] = useState<Player[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.nba.getTeams();
        setTeams(response.data);
        setDisplayedTeams(response.data.slice(0, ITEMS_PER_PAGE));
      } catch (err) {
        setError("Error loading teams. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load teams. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Load more teams on scroll into view
  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      const nextPage = currentPage + 1;
      const nextItems = teams.slice(0, nextPage * ITEMS_PER_PAGE);
      setDisplayedTeams(nextItems);
      setCurrentPage(nextPage);
    }
  }, [inView]);

  const hasMore = displayedTeams.length < teams.length;

  if (error && teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
        <p className="text-destructive mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedTeams.map((team) => (
          <PlayerCard key={team.id} player={team} />
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && !isLoading &&  <div ref={ref} className="flex justify-center p-4">
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
  </div>}

      {/* End Message */}
      {!hasMore && displayedTeams.length > 0 && (
        <p className="text-center text-muted-foreground py-4">
          You&apos;ve reached the end of the list.
        </p>
      )}

      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
