import AssetsModal from "@/components/design-system/assets/modal";
import { Container } from "./game-page.styles";
import GameMainPart from "./main-part";
import GameSidePart from "./side-part";

export default function GamePage() {
  return (
    <AssetsModal.Root>
      <Container>
        <GameMainPart />

        <GameSidePart.Provider>
          <GameSidePart.Content />
          <GameSidePart.Icon />
        </GameSidePart.Provider>
      </Container>

      <AssetsModal.Portal>
        <AssetsModal.Overlay />
        <AssetsModal.Content />
      </AssetsModal.Portal>
    </AssetsModal.Root>
  );
}
