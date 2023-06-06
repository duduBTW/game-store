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
    <ScrollerContainer {...rest} ref={scrollerRef} tabIndex={0}>
      {children}
    </ScrollerContainer>
  );
}

function SnapItem({ children, index, ...rest }: SnapItemScrollerProps) {
  const { scrollItemRefs, activeIndex } = useCarousel();

  const isActive = activeIndex === index;

  return (
    <SnapItemContainer
      {...rest}
      {...{ [DATA_INDEX]: index }}
      ref={(node) => {
        if (!node) {
          return;
        }

        scrollItemRefs.current[index] = node;
      }}
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

// ----------------
// Consts
// ----------------
const DATA_INDEX = "data-index";
const ROOT_MARGIN = "0px -50%";

// ----------------
// Hooks
// ----------------
function useCarouselValue({ numberOfItems }: { numberOfItems: number }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollItemRefs = useRef<Element[]>([]);

  const canSlideTo = useMemo(
    () => canSlideToFactory(activeIndex, numberOfItems),
    [activeIndex, numberOfItems]
  );

  const slideTo = useCallback(
    (getDestinationIndex: DestinationIndex) => {
      if (!scrollerRef.current) {
        return;
      }

      const left = getScrollItemScrollLeft(
        getDestinationIndex,
        activeIndex,
        scrollItemRefs.current
      );

      if (left === undefined) {
        console.warn("Cant scroll to that item");
        return;
      }

      scrollerRef.current.scrollTo({
        left,
        behavior: "smooth",
      });
    },
    [activeIndex]
  );

  // Watches for scroll changes and updates the active index
  useEffect(() => {
    const scrollItemElements = scrollItemRefs.current;

    const updateActiveIndex = (newActiveElement: Element) => {
      setActiveIndex(
        findScrollItemIndex(newActiveElement, scrollItemRefs.current)
      );
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
        rootMargin: ROOT_MARGIN,
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

// ----------------
// Helpers
// ----------------
type DestinationIndex = ((activeIndex: number) => number) | number;

function previusComparation(activeIndex: number) {
  return activeIndex - 1;
}

function nextComparation(activeIndex: number) {
  return activeIndex + 1;
}

// Generates a canSlideTo function
function canSlideToFactory(activeIndex: number, numberOfItems: number) {
  return (getDestinationIndex: DestinationIndex) => {
    const destinationIndex = generateDestinationIndex(
      getDestinationIndex,
      activeIndex
    );

    return inRange(destinationIndex, 0, numberOfItems);
  };
}

// Gets the left scroll position of the generateDestinationIndex
function getScrollItemScrollLeft(
  getDestinationIndex: DestinationIndex,
  activeIndex: number,
  scrollItemRefs: Element[]
) {
  const destinationIndex = generateDestinationIndex(
    getDestinationIndex,
    activeIndex
  );

  const firstElement = scrollItemRefs[0] as HTMLElement | undefined;
  const scrollToElement = scrollItemRefs[destinationIndex] as
    | HTMLElement
    | undefined;

  if (!scrollToElement || !firstElement) {
    return;
  }

  return scrollToElement.offsetLeft - firstElement.offsetLeft;
}

// Finds new active element index
function findScrollItemIndex(
  newActiveElement: Element,
  scrollItemRefs: Element[]
) {
  return scrollItemRefs.findIndex(
    (element) =>
      element.getAttribute(DATA_INDEX) ===
      newActiveElement.getAttribute(DATA_INDEX)
  );
}

function generateDestinationIndex(
  destinationIndex: DestinationIndex,
  activeIndex: number
) {
  if (typeof destinationIndex === "function") {
    return destinationIndex(activeIndex);
  }

  return destinationIndex;
}

const Carousel = {
  Provider,
  Scroller,
  SnapItem,
  Pagination,
  Navegation,
} as const;
export default Carousel;
