import SizeContainer from "@/components/design-system/size-container/size-container";
import Typography from "@/components/design-system/typography";
import {
  Container,
  BuyContainer,
  BottomPartContainer,
  GameDescription,
  Image,
  UpperPartContainer,
  Price,
  BuyButton,
} from "./main-part.styles";

/* -------------------------------------------------------------------------------------------------
 * GameMainPart
 * -----------------------------------------------------------------------------------------------*/
export default function GameMainPart() {
  return (
    <Container>
      <UpperPart />
      <Carousel />
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
function Carousel() {
  return (
    <SizeContainer size="small" centered>
      <Image src="https://pbs.twimg.com/media/FvM3ZIQaIAABixA?format=jpg&name=large" />
    </SizeContainer>
  );
}

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
