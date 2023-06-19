import { GameReviewAllStatistics } from "@/service/game-review";

export interface Props {
  reviews: GameReviewAllStatistics;
}

export interface BarAllStatistics {
  type: "like" | "deslike";
  count: number;
}
