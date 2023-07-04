import { GameWithAssets } from "@/service/game";
import { LinkProps } from "react-router-dom";

export interface Props extends React.ComponentProps<"div"> {
  cardLinkPrefix: string;
  title?: string;
  action?: React.ReactNode;
}

export interface GameCardProps extends Omit<LinkProps, "to"> {
  linkPrefix: string;
  game: GameWithAssets;
}
