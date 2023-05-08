import ArrowDropLeftLineIcon from "remixicon-react/ArrowDropLeftLineIcon";
import ArrowDropRightLineIcon from "remixicon-react/ArrowDropRightLineIcon";
import IconButton from "@/components/design-system/icon-button";
import { useCarouselSelector } from "../carousel.hooks";
import { Container, Controller } from "./carousel-upper-part.styles";

function CarouselUpperPart() {
  const [swiper] = useCarouselSelector("swiper");

  return (
    <Container>
      <div>a</div>
      <Controller>
        <IconButton onClick={() => swiper?.slidePrev()}>
          <ArrowDropLeftLineIcon />
        </IconButton>
        <IconButton disabled={!swiper?.allowSlideNext}>
          <ArrowDropRightLineIcon />
        </IconButton>
      </Controller>
    </Container>
  );
}

export default CarouselUpperPart;
