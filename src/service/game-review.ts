import { ofetch } from "ofetch";

export interface GameReview {
  id: string;
  liked: boolean;
  opinion: string;
  createdAt: string;
}

export async function getGameReviews(gameId: string) {
  return await ofetch<GameReview[]>(
    `http://localhost:3001/game/${gameId}/review`
  );
}

getGameReviews.getKey = (gameId: string) =>
  ["game-review-list", gameId] as const;

export type NewGameReview = Omit<GameReview, "id">;

export async function insertGameReview(props: {
  gameId: string;
  data: NewGameReview;
}) {
  return await ofetch<GameReview>(
    `http://localhost:3001/game/${props.gameId}/review`,
    {
      method: "POST",
      body: props.data,
    }
  );
}

export interface GameReviewRecentStatistics {
  reviewsGruppedByMonth: Record<
    string,
    {
      likes: number;
      deslikes: number;
    }
  >;
  quantity: {
    totalLikes: number;
    totalDeslikes: number;
    total: number;
  };
  ratio: number;
}

export async function getGameReviewsRecentStatistics(gameId: string) {
  return await ofetch<GameReviewRecentStatistics>(
    `http://localhost:3001/game/${gameId}/review/statistics/recent`
  );
}

getGameReviewsRecentStatistics.getKey = (gameId: string) =>
  ["game-review-recent-statistics", gameId] as const;

export interface GameReviewAllStatistics {
  likes: number;
  deslikes: number;
  total: number;
  ratio: number;
}

export async function getGameReviewsAllStatistics(gameId: string) {
  return await ofetch<GameReviewAllStatistics>(
    `http://localhost:3001/game/${gameId}/review/statistics/all`
  );
}

getGameReviewsAllStatistics.getKey = (gameId: string) =>
  ["game-review-all-statistics", gameId] as const;
