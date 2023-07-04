import FocusTrap from "focus-trap-react";
import AssetsModal from "@/components/design-system/assets/modal";
import { Container } from "./game-page.styles";
import GameMainPart from "./main-part";
import GameSidePart from "./side-part";

export default function GamePage() {
  return (
    <AssetsModal.Root>
      <Container>
        <GameSidePart.Provider>
          <GameMainPart />

          <GameSidePart.Content />
          <GameSidePart.Icon />
        </GameSidePart.Provider>
      </Container>

      <AssetsModal.Portal>
        <FocusTrap>
          <div>
            <AssetsModal.Overlay />
            <AssetsModal.Content />
          </div>
        </FocusTrap>
      </AssetsModal.Portal>
    </AssetsModal.Root>
  );
}
