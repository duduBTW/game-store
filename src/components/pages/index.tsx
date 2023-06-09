import { Routes, Route } from "react-router";
import DefautLayout from "@/components/layout/default/default-layout";

// pages
import HomePage from "./home/home-page";
import GamePage from "./game/game-page";
import CreateGamePage from "./create-game/create-game";
import EditGamePage from "./edit-game";
import AdminDashboardPage from "./admin-dashboard";

export default function Pages() {
  return (
    <Routes>
      <Route element={<DefautLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin">
          <Route path="create-game" element={<CreateGamePage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
        </Route>
      </Route>

      <Route element={<DefautLayout hideNav={true} />}>
        <Route path="/game/:id" element={<GamePage />} />

        <Route path="/admin">
          <Route path="edit-game/:id" element={<EditGamePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
