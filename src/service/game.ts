import { ofetch } from "ofetch";

export interface Game {
  id: string;
  title: string;
  price: number;
  description: string;
}

export async function getGame(id: string) {
  return await ofetch<Game>(`http://localhost:3001/game/${id}`);
}

getGame.getKey = (id: string) => ["get-game", id];

export async function getGameList() {
  return await ofetch<GameWithAssets[]>(`http://localhost:3001/game`);
}

getGameList.getKey = () => ["get-game-list"] as const;

export interface GameWithAssets extends Game {
  Assets: Asset[];
}

export async function getGameMainPart(id: string) {
  return await ofetch<GameWithAssets>(
    `http://localhost:3001/game/${id}/main-part`
  );
}

getGameMainPart.getKey = (id: string) => ["get-game-main-part", id];

export type NewGame = Omit<Game, "id">;

export async function insetGame(data: NewGame) {
  return await ofetch<Game>("http://localhost:3001/game", {
    method: "POST",
    body: data,
  });
}

export type UpdateGameData = Partial<Omit<Game, "id">>;

export function updateGameFactory(id: string) {
  return async (data: UpdateGameData) => {
    return await ofetch<Game>(`http://localhost:3001/game/${id}`, {
      method: "PUT",
      body: data,
    });
  };
}

type AssetType = "image" | "youtube";

export interface Asset {
  id: string;
  type: AssetType;
  contentUrl: string;
}

export type NewAsset = Omit<Asset, "id">;

export async function getIsValidImage(imageUrl: string): Promise<boolean> {
  const response = await ofetch(imageUrl, {
    method: "HEAD",
  });

  return response.type && response.type.startsWith("image");
}

getIsValidImage.getKey = (imageUrl: string) => ["is-valid-image", imageUrl];

export async function getGameAsset(gameId: string) {
  return await ofetch<Asset[]>(`http://localhost:3001/game/${gameId}/asset`);
}

getGameAsset.getKey = (gameId: string) => ["get-game-asset", gameId];

export async function insetGameAsset(props: {
  gameId: string;
  data: NewAsset;
}) {
  return await ofetch<Asset>(
    `http://localhost:3001/game/${props.gameId}/asset`,
    {
      method: "POST",
      body: props.data,
    }
  );
}

export type UpdateGameAssetData = Partial<Omit<Asset, "id">>;

export async function updateGameAsset(props: {
  assetId: string;
  data: UpdateGameAssetData;
}) {
  return await ofetch<Asset>(
    `http://localhost:3001/game/asset/${props.assetId}`,
    {
      method: "PUT",
      body: props.data,
    }
  );
}

export async function deleteGameAsset(assetId: string) {
  return await ofetch<Asset>(`http://localhost:3001/game/asset/${assetId}`, {
    method: "DELETE",
  });
}
