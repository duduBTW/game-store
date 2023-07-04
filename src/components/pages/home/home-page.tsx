import FocusTrap from "focus-trap-react";
import Carousel from "@/components/design-system/carousel";
import GameGrid from "@/components/design-system/game/grid";
import HighlightedGameCard from "@/components/design-system/game/highlighted-card";
import AssetsModal, {
  useAssetsModal,
} from "@/components/design-system/assets/modal";
import { getGameList } from "@/service/game";
import { useQuery } from "@tanstack/react-query";
import {
  CarouselUpperPartContainer,
  Container,
  StyledCarouselScroller,
} from "./home-page.styles";
import SizeContainer from "@/components/design-system/size-container/size-container";

export default function HomePage() {
  return (
    <AssetsModal.Root>
      <Container>
        <div>
          <HighlightedGameCardList />
        </div>
        <SizeContainer size="large" centered>
          <GameGrid title="Recently added" cardLinkPrefix="game" />
        </SizeContainer>
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

function HighlightedGameCardList() {
  const { handleOpen } = useAssetsModal();
  const { data: gameList } = useQuery(getGameList.getKey(), () =>
    getGameList()
  );

  if (!gameList) {
    return null;
  }

  return (
    <Carousel.Provider>
      <CarouselUpperPartContainer size="large" centered>
        <Carousel.Pagination />
        <Carousel.Navegation />
      </CarouselUpperPartContainer>

      <StyledCarouselScroller>
        {gameList.map((game, index) => (
          <Carousel.SnapItem key={game.id} index={index}>
            {({ isActive }) => (
              <HighlightedGameCard
                onAssetClick={handleOpen}
                isActive={isActive}
                game={game}
              />
            )}
          </Carousel.SnapItem>
        ))}
      </StyledCarouselScroller>
    </Carousel.Provider>
  );
}
