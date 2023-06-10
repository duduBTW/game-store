import { RemixiconReactIconComponentType } from "remixicon-react";

export interface UserReview {
  status: "liked" | "desliked";
  user: {
    profilePicture: string;
    name: string;
  };
  review: string;
}

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export interface UserReviewCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  review: UserReview;
}

export interface StatusProps {
  styledStatus: UserReview["status"];
}

export interface UserReviewFeedbackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  startIcon?: RemixiconReactIconComponentType;
}
