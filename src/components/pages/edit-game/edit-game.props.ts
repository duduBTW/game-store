import { Asset, Game, UpdateGameData } from "@/service/game";
import { Control } from "react-hook-form";

export type Params = {
  id: string;
};

export interface AssetListProps {
  assets: Asset[];
}

export interface AssetItemProps {
  asset: Asset;
}

export interface GameSingleInputFormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "children"> {
  children: (data: Game, control: Control<UpdateGameData>) => React.ReactNode;
}
