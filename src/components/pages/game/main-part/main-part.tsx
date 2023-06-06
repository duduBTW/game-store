import { useState } from "react";
import Typography from "@/components/design-system/typography";
import Carousel from "@/components/design-system/carousel/carousel";
import {
  Container,
  BuyContainer,
  BottomPartContainer,
  GameDescription,
  Image,
  UpperPartContainer,
  Price,
  BuyButton,
  CarouselUpperPartContainer,
  StyledCarouselScroller,
} from "./main-part.styles";

/* -------------------------------------------------------------------------------------------------
 * GameMainPart
 * -----------------------------------------------------------------------------------------------*/
export default function GameMainPart() {
  const [data, setData] = useState([
    "https://pbs.twimg.com/media/FvM3ZIQaIAABixA?format=jpg&name=large",
    "https://pbs.twimg.com/media/Fw5y919WIAAmCev?format=jpg&name=4096x4096",
    "https://pbs.twimg.com/media/Fw3cwtKaIAE6rUr?format=jpg&name=large",
    "https://pbs.twimg.com/media/FwKkNK7aMAAmvYb?format=jpg&name=large",
  ]);

  return (
    <Container>
      <UpperPart />

      <Carousel.Provider numberOfItems={data.length}>
        <CarouselUpperPartContainer size="small" centered>
          <Carousel.Pagination />
          <Carousel.Navegation />
        </CarouselUpperPartContainer>

        <StyledCarouselScroller tabIndex={0}>
          {data.map((src, index) => (
            <Carousel.SnapItem index={index}>
              {({ isActive }) => <Image isActive={isActive} src={src} />}
            </Carousel.SnapItem>
          ))}
        </StyledCarouselScroller>
      </Carousel.Provider>

      <BottomPart />
    </Container>
  );
}

/* -------------------------------------------------------------------------------------------------
 * UpperPart
 * -----------------------------------------------------------------------------------------------*/
function UpperPart() {
  return (
    <UpperPartContainer size="small" centered>
      <Typography
        as="h1"
        fontFamily="Rubik"
        weight="black"
        size="3xl"
        lineHeight="title"
      >
        MONSTER HUNTER RISE
      </Typography>
    </UpperPartContainer>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Carousel
 * -----------------------------------------------------------------------------------------------*/
// function Carousel() {
//   return (
//     <CarouselContainer tabIndex={0}>
//       <Image src="https://pbs.twimg.com/media/FvM3ZIQaIAABixA?format=jpg&name=large" />
//       <Image src="https://pbs.twimg.com/media/Fw5y919WIAAmCev?format=jpg&name=4096x4096" />
//       <Image src="https://pbs.twimg.com/media/Fw3cwtKaIAE6rUr?format=jpg&name=large" />
//       <Image src="https://pbs.twimg.com/media/FwAK-BvacAAMdwO?format=jpg&name=large" />
//     </CarouselContainer>
//   );
// }

/* -------------------------------------------------------------------------------------------------
 * BottomPart
 * -----------------------------------------------------------------------------------------------*/
function BottomPart() {
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
          R$ 200,00
        </Price>

        <BuyButton>Buy</BuyButton>
      </BuyContainer>
    </BottomPartContainer>
  );
}
