"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Player } from "@/lib/types";
import PlayerCard from "@/components/players/PlayerCard";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({ apiKey: "105b1e70-c54c-49f1-ac89-4d9da6b3ff81" });
const ITEMS_PER_PAGE = 10;

export default function PlayersList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0); // start from 0
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { ref, inView } = useInView();

  const fetchPlayers = async (cursor: number | null) => {
    if (players?.length >= 100){
      setNextCursor(null)
      setIsLoading(false)
      return
    }
    try {
      setIsLoading(true);
      const response = await api.nba.getPlayers({
        per_page: ITEMS_PER_PAGE,
        cursor: cursor ?? 0,
      });

      if (response?.data) {
        setPlayers((prev) => [...prev, ...response?.data].slice(0, 100)); 
        setNextCursor(response.meta?.next_cursor ?? null);
      }
    } catch (err) {


      if ((err as any).response?.status === 429) {
        setTimeout(() => fetchPlayers(cursor), 5000); // retry after 5s
      }
      setError("Failed to load players.");
      toast({
        title: "Error",
        description: "Failed to load players. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (nextCursor === 0) fetchPlayers(0); // first load
  }, []);

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (inView && !isLoading && nextCursor !== null && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchPlayers(nextCursor).finally(() => {
        hasFetchedRef.current = false;
      });
    }
  }, [inView]);
  
  

  return (
    <div className="space-y-6">
      {/* Scrollable player card area */}
      <div className="max-h-[600px] overflow-y-auto px-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {players.map((player) => (
            <PlayerCard key={player?.full_name} player={player} />
          ))}
        </div>

        {/* Infinite scroll trigger */}
        {nextCursor !== null && !isLoading && (
          <div ref={ref} className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {/* End message */}
        {nextCursor === null && players.length > 0 && (
          <p className="text-center text-muted-foreground py-4">
            You&apos;ve reached the end of the list.
          </p>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
