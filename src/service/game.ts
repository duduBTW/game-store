import { ofetch } from "ofetch";

export interface Game {
  id: string;
  title: string;
}

export type NewGame = Omit<Game, "id">;

export async function insetGame(data: NewGame) {
  return await ofetch<Game>("http://localhost:3001/game", {
    method: "POST",
    body: data,
  });
}
