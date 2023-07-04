import { useMemo } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import * as dompurify from "isomorphic-dompurify";

import { getGameMainPart } from "@/service/game";
import Typography from "@/components/design-system/typography";
import Carousel from "@/components/design-system/carousel";

import {
  Container,
  Content,
  BuyContainer,
  BottomPartContainer,
  GameDescription,
  StyledAssetDisplay,
  UpperPartContainer,
  Price,
  BuyButton,
  CarouselUpperPartContainer,
  StyledCarouselScroller,
  StyledNav,
  StyledAssetDisplayContainer,
} from "./main-part.styles";
import { useGameSidePart } from "../side-part/side-part";
import { useAssetsModal } from "@/components/design-system/assets/modal";

function useId() {
  const { id } = useParams();

  if (!id) {
    throw new Error("No id found!");
  }

  return id;
}

function useGame() {
  const id = useId();

  const { data } = useQuery(
    getGameMainPart.getKey(id),
    () => getGameMainPart(id),
    {
      enabled: true,
    }
  );

  if (!data) {
    throw new Error("Why D:");
  }

  return data;
}

/* -------------------------------------------------------------------------------------------------
 * GameMainPart
 * -----------------------------------------------------------------------------------------------*/
export default function GameMainPart() {
  const id = useId();
  const {
    sidebarActive: [active],
  } = useGameSidePart();

  const { isLoading, data } = useQuery(getGameMainPart.getKey(id), () =>
    getGameMainPart(id)
  );

  if (isLoading || !data) {
    return null;
  }

  return (
    <Container>
      <StyledNav data-expanded={active} />

      <Content>
        <UpperPart />
        <CarouselPart />
        <BottomPart />
      </Content>
    </Container>
  );
}

/* -------------------------------------------------------------------------------------------------
 * UpperPart
 * -----------------------------------------------------------------------------------------------*/
function UpperPart() {
  const { title } = useGame();

  return (
    <UpperPartContainer size="small" centered>
      <Typography
        as="h1"
        fontFamily="Rubik"
        weight="black"
        size="3xl"
        lineHeight="title"
      >
        {title}
      </Typography>
    </UpperPartContainer>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Carousel
 * -----------------------------------------------------------------------------------------------*/
function CarouselPart() {
  const { handleOpen } = useAssetsModal();
  const { Assets: assets } = useGame();

  return (
    <Carousel.Provider key={assets.length} numberOfItems={assets.length}>
      <CarouselUpperPartContainer size="small" centered>
        <Carousel.Pagination />
        <Carousel.Navegation />
      </CarouselUpperPartContainer>

      <StyledCarouselScroller tabIndex={0}>
        {assets.map((asset, index) => (
          <Carousel.SnapItem index={index} key={asset.id}>
            {({ isActive }) => (
              <StyledAssetDisplayContainer
                disabled={!isActive}
                onClick={() => handleOpen(assets, index)}
              >
                <StyledAssetDisplay isActive={isActive} asset={asset} />
              </StyledAssetDisplayContainer>
            )}
          </Carousel.SnapItem>
        ))}
      </StyledCarouselScroller>
    </Carousel.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * BottomPart
 * -----------------------------------------------------------------------------------------------*/
function BottomPart() {
  const { price, description } = useGame();
  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price),
    [price]
  );

  const purifiedDescription = useMemo(() => {
    if (!dompurify.isSupported) {
      return description;
    }

    return dompurify.sanitize(description);
  }, [description]);

  return (
    <BottomPartContainer size="small" centered>
      <GameDescription
        dangerouslySetInnerHTML={{
          __html: purifiedDescription,
        }}
      />

      <BuyContainer>
        <Price size="lg" lineHeight="title">
          {formattedPrice}
        </Price>

        <BuyButton>Buy</BuyButton>
      </BuyContainer>
    </BottomPartContainer>
  );
}
