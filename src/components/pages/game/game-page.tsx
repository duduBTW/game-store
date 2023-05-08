import Carousel from "@/components/design-system/carousel/carousel";
import Typography from "@/components/design-system/typography/typography";

export default function GamePage() {
  return (
    <div>
      <Typography
        as="h1"
        fontFamily="Rubik"
        weight="black"
        size="2xl"
        lineHeight="title"
      >
        MONSTER HUNTER RISE
      </Typography>

      <Carousel dataLenght={1}>
        <a href=""></a>
      </Carousel>
    </div>
  );
}
