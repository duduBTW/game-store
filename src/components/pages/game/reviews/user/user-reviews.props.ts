import { GameReview } from "@/service/game-review";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  gameId: string;
}

export interface UserReviewCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  review: GameReview;
}

export interface StatusProps {
  styledLiked: GameReview["liked"];
}
