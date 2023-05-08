import { createContext } from "use-context-selector";
import useCarousel, { UseCarouselReturn } from "./carousel.hooks";
import { Props } from "./carousel.props";
import CarouselUpperPart from "./carousel-upper-part/carousel-upper-part";
import CarouselBottomPart from "./carousel-bottom-part/carousel-bottom-part";

export const CarouselContext = createContext<UseCarouselReturn | null>(null);

function Carousel(props: Props) {
  const value = useCarousel(props);

  return (
    <CarouselContext.Provider value={value}>
      <CarouselUpperPart />
      <CarouselBottomPart />
    </CarouselContext.Provider>
  );
}

export default Carousel;
