import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import inRange from "lodash.inrange";
import ArrowDropRightLineIcon from "remixicon-react/ArrowDropRightLineIcon";
import ArrowDropLeftLineIcon from "remixicon-react/ArrowDropLeftLineIcon";
import {
  CarouselProviderProps,
  CarouselScrollerProps,
  SnapItemScrollerProps,
} from "./carouse.props";
import {
  NavegationContainer,
  NavegationIconButton,
  PaginationContainer,
  PaginationPage,
  ScrollerContainer,
  SnapItemContainer,
} from "./carousel.styles";

function useCarouselValue({ numberOfItems }: { numberOfItems: number }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollItemRefs = useRef<Element[]>([]);

  const canSlideNext = useMemo(
    () => activeIndex + 1 < numberOfItems,
    [activeIndex, numberOfItems]
  );

  const canSlidePrevius = useMemo(() => activeIndex > 0, [activeIndex]);

  const canSlideTo = useMemo(
    () =>
      (
        generateIndexDestination: ((activeIndex: number) => number) | number
      ) => {
        const destinationIndex =
          typeof generateIndexDestination === "function"
            ? generateIndexDestination(activeIndex)
            : generateIndexDestination;

        return inRange(destinationIndex, 0, numberOfItems);
      },
    [activeIndex, numberOfItems]
  );

  const slideTo = useCallback(
    (indexDestination: ((activeIndex: number) => number) | number) => {
      if (!scrollerRef.current) {
        return;
      }

      const destinationItemIndex =
        typeof indexDestination === "function"
          ? indexDestination(activeIndex)
          : indexDestination;

      const scrollToElement = scrollItemRefs.current[destinationItemIndex] as
        | HTMLDivElement
        | undefined;

      const firstElement = scrollItemRefs.current[0] as
        | HTMLDivElement
        | undefined;

      if (!scrollToElement || !firstElement) {
        return;
      }

      scrollerRef.current.scrollTo({
        left: scrollToElement.offsetLeft - firstElement.offsetLeft,
        behavior: "smooth",
      });
    },
    [activeIndex]
  );

  useEffect(() => {
    const scrollItemElements = scrollItemRefs.current;

    const updateActiveIndex = (newActiveElement: Element) => {
      const newActiveIndex = scrollItemRefs.current.findIndex((element) =>
        element.isEqualNode(newActiveElement)
      );

      setActiveIndex(newActiveIndex);
    };

    const intersectionObserver = new IntersectionObserver(
      (elements) => {
        elements.forEach((element) => {
          if (!element.isIntersecting) {
            return;
          }

          updateActiveIndex(element.target);
        });
      },
      {
        root: scrollerRef.current,
        rootMargin: "0px 50%",
      }
    );

    scrollItemElements.forEach((scrollItem) => {
      intersectionObserver.observe(scrollItem);
    });

    return () => {
      scrollItemElements.forEach((scrollItem) => {
        intersectionObserver.unobserve(scrollItem);
      });
      intersectionObserver.disconnect();
    };
  }, []);

  return {
    scrollerRef,
    scrollItemRefs,
    numberOfItems,
    activeIndex,
    slideTo,
    canSlideNext,
    canSlidePrevius,
    canSlideTo,
  } as const;
}

export function useCarousel() {
  const value = useContext(CarouselContext);

  if (value === null) {
    throw new Error(
      "useCarousel can only be used inside of a `CarouselProvider`"
    );
  }

  return value;
}

const CarouselContext = createContext<null | ReturnType<
  typeof useCarouselValue
>>(null);

function Provider({ children, numberOfItems }: CarouselProviderProps) {
  const value = useCarouselValue({
    numberOfItems,
  });

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
}

function Scroller({ children, ...rest }: CarouselScrollerProps) {
  const { scrollerRef } = useCarousel();

  return (
    <ScrollerContainer {...rest} ref={scrollerRef}>
      {children}
    </ScrollerContainer>
  );
}

function SnapItem({ children, index, ...rest }: SnapItemScrollerProps) {
  const { scrollItemRefs, activeIndex } = useCarousel();

  const isActive = activeIndex === index;

  return (
    <SnapItemContainer
      ref={(node) => {
        if (!node) {
          return;
        }

        scrollItemRefs.current[index] = node;
      }}
      {...rest}
    >
      {typeof children === "function" ? children({ isActive }) : children}
    </SnapItemContainer>
  );
}

function Pagination(props: React.HTMLAttributes<HTMLDivElement>) {
  const { numberOfItems, activeIndex, slideTo } = useCarousel();

  return (
    <PaginationContainer {...props}>
      {Array.from({ length: numberOfItems }, (_, index) => (
        <PaginationPage
          data-active={activeIndex === index}
          key={index}
          onClick={() => slideTo(index)}
        />
      ))}
    </PaginationContainer>
  );
}

function previusComparation(activeIndex: number) {
  return activeIndex - 1;
}

function nextComparation(activeIndex: number) {
  return activeIndex + 1;
}

function Navegation(props: React.HTMLAttributes<HTMLDivElement>) {
  const { slideTo, canSlideTo } = useCarousel();

  const slideToNext = () => slideTo(nextComparation);
  const slideToPrevius = () => slideTo(previusComparation);

  const canSlidePrevius = canSlideTo(previusComparation);
  const canSlideNext = canSlideTo(nextComparation);

  return (
    <NavegationContainer {...props}>
      <NavegationIconButton
        disabled={!canSlidePrevius}
        onClick={slideToPrevius}
      >
        <ArrowDropLeftLineIcon />
      </NavegationIconButton>
      <NavegationIconButton disabled={!canSlideNext} onClick={slideToNext}>
        <ArrowDropRightLineIcon />
      </NavegationIconButton>
    </NavegationContainer>
  );
}

const Carousel = {
  Provider,
  Scroller,
  SnapItem,
  Pagination,
  Navegation,
} as const;

export default Carousel;
