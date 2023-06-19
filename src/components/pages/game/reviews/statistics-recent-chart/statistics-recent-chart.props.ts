import { GameReviewRecentStatistics } from "@/service/game-review";

export interface Props {
  width: number;
  height: number;
  reviews: GameReviewRecentStatistics;
}

export type BarGroupKeyName = "likes" | "deslikes";

export interface BarGroupRecentStatistics {
  date: string;
  likes: number;
  deslikes: number;
}
