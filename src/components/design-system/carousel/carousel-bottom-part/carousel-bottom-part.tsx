import { Image } from "./carousel-bottom-part.styles";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { useCarouselSelector } from "../carousel.hooks";

import "swiper/css";

const data = [
  "https://pbs.twimg.com/media/FvM3ZIQaIAABixA?format=jpg&name=large",
  "https://pbs.twimg.com/media/FvaMSpiagAA_Vzw?format=jpg&name=large",
  "https://pbs.twimg.com/media/Fva7tA7WYAE5H6Q?format=png&name=large",
  "https://pbs.twimg.com/media/FvkAFxPaAAUX1oh?format=jpg&name=large",
];

function CarouselBottomPart() {
  const [, setSwiperRef] = useCarouselSelector("swiper");

  return (
    <Swiper
      onSwiper={setSwiperRef}
      spaceBetween={28}
      slidesPerView="auto"
      centeredSlides
    >
      {data.map((item) => (
        <SwiperSlide
          key={item}
          style={{
            width: "64rem",
            maxWidth: "90%",
          }}
        >
          <SlideItem src={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function SlideItem({ src }: { src: string }) {
  const swiperSlide = useSwiperSlide();

  return <Image active={swiperSlide.isActive} src={src} />;
}

export default CarouselBottomPart;
