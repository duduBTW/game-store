import { useMemo } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import * as dompurify from "isomorphic-dompurify";

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
          <Carousel.SnapItem index={index} key={asset.id}>
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
