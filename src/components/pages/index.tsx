import { Routes, Route } from "react-router";
import DefautLayout from "@/components/layout/default/default-layout";

// pages
import HomePage from "./home/home-page";
import GamePage from "./game/game-page";
import CreateGame from "./create-game/create-game";

export default function Pages() {
  return (
    <Routes>
      <Route element={<DefautLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/admin">
          <Route path="create-game" element={<CreateGame />} />
        </Route>
      </Route>
    </Routes>
  );
}
