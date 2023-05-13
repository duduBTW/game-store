import { Container } from "./game-page.styles";
import GameMainPart from "./main-part";
import GameSidePart from "./side-part";

export default function GamePage() {
  return (
    <Container>
      <GameMainPart />

      <GameSidePart.Provider>
        <GameSidePart.Content />
        <GameSidePart.Icon />
      </GameSidePart.Provider>
    </Container>
  );
}
