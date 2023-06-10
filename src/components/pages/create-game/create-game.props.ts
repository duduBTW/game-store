import { Game } from "@/service/game";

export interface CreateGameFormProps {
  onSuccess: (data: Game) => void;
}

export interface CreateGameSuccessProps {
  game: Game;
}
