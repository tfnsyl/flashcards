export interface UserCards {
  learning: string[];
  review: string[];
  master: string[];
}

export interface Stats {
  learning: number;
  review: number;
  master: number;
}

export interface User {
  cards: UserCards;
  stats: Stats;
}
