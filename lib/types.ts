export interface User {
  username: string;
  isLoggedIn: boolean;
}

export interface Player {
  id: number;
  division?:string;
  conference?:string;
  full_name?:string;
  city?:string;
  first_name?: string;
  last_name?: string;
  position?: string;
  abbreviation: string;
  team?: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
  height_feet?: number | null;
  height_inches?: number | null;
  weight_pounds?: number | null;
}

export interface Team {
  id: string;
  name: string;
  playerCount: number;
  region: string;
  country: string;
  players: Player[];
}

export interface PlayersResponse {
  data: Player[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: number;
    per_page: number;
    total_count: number;
  };
}