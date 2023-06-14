import { useMemo } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { getGameMainPart } from "@/service/game";
import Typography from "@/components/design-system/typography";
import Carousel from "@/components/design-system/carousel";

import {
  Container,
  BuyContainer,
  BottomPartContainer,
  GameDescription,
  Styled,
  UpperPartContainer,
  Price,
  BuyButton,
  CarouselUpperPartContainer,
  StyledCarouselScroller,
} from "./main-part.styles";

function useId() {
  const { id } = useParams();

  if (!id) {
    throw new Error("No id found!");
  }

  return id;
}

function useGame() {
  const id = useId();

  const { data } = useQuery(getGameMainPart.getKey(id), () =>
    getGameMainPart(id)
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

  const { isLoading, data } = useQuery(getGameMainPart.getKey(id), () =>
    getGameMainPart(id)
  );

  if (isLoading || !data) {
    return null;
  }

  return (
    <Container>
      <UpperPart />
      <CarouselPart />
      <BottomPart />
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
  const { Assets: assets } = useGame();

  return (
    <Carousel.Provider key={assets.length} numberOfItems={assets.length}>
      <CarouselUpperPartContainer size="small" centered>
        <Carousel.Pagination />
        <Carousel.Navegation />
      </CarouselUpperPartContainer>

      <StyledCarouselScroller tabIndex={0}>
        {assets.map((asset, index) => (
          <Carousel.SnapItem index={index}>
            {({ isActive }) => <Styled isActive={isActive} asset={asset} />}
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
  const { price } = useGame();
  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price),
    [price]
  );

  return (
    <BottomPartContainer size="small" centered>
      <GameDescription size="base" color="gray.300">
        Rise to the challenge and join the hunt! In Monster Hunter Rise, the
        latest installment in the award-winning and top-selling Monster Hunter
        series, you’ll become a hunter, explore brand new maps and use a variety
        of weapons to take down fearsome monsters as part of an all-new
        storyline.
      </GameDescription>

      <BuyContainer>
        <Price size="lg" lineHeight="title">
          {formattedPrice}
        </Price>

        <BuyButton>Buy</BuyButton>
      </BuyContainer>
    </BottomPartContainer>
  );
}
