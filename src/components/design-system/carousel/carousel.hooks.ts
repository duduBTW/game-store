import { useState } from "react";
import { Swiper } from "swiper/types";
import { useContextSelector } from "use-context-selector";
import { CarouselContext } from "./carousel";
import { Props } from "./carousel.props";

export function useCarousel(props: Props) {
  const swiper = useState<Swiper>();

  return {
    swiper,
    props,
  } as const;
}

export type UseCarouselReturn = ReturnType<typeof useCarousel>;

export function useCarouselSelector<Key extends keyof UseCarouselReturn>(
  selector: Key
): UseCarouselReturn[Key] {
  const data = useContextSelector(
    CarouselContext,
    (state) => state?.[selector]
  );

  if (!data) {
    throw new Error("");
  }

  return data;
}

export default useCarousel;
