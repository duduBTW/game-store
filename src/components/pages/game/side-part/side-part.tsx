import { useState, createContext, useContext } from "react";
import { useSpring, easings } from "@react-spring/web";
import SideBarLineIcon from "remixicon-react/SideBarLineIcon";
import Tabs from "@/components/design-system/tabs";
import { GameSidePartProviderProps } from "./side-part.props";
import {
  AbsoluteContainer,
  SideBarIcon,
  DesktopContainer,
  MobileContainer,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
  CarouselUpperPartContainer,
  StyledCarouselScroller,
  StyledUserReviewList,
  StyledReviewStatistcs,
} from "./side-part.styles";
import Carousel from "@/components/design-system/carousel/carousel";

const TABS = {
  REVIEW: "reviews",
  DLC: "dlc",
  NEWS: "news",
} as const;

// ----------------
// Provider
// ----------------
const GameSidePartContext = createContext<ReturnType<
  typeof useGameSidePartValue
> | null>(null);

export function GameSidePartProvider({ children }: GameSidePartProviderProps) {
  const value = useGameSidePartValue();

  return (
    <GameSidePartContext.Provider value={value}>
      {children}
    </GameSidePartContext.Provider>
  );
}

// ----------------
// GameSidePartContent
// ----------------
export function GameSidePartContent() {
  const {
    sidebarActive: [sidebarActive, setSidepartActive],
    styles: { stylesAbsolute, stylesDeskop },
  } = useGameSidePart();

  const handleSidePartClose = () => {
    setSidepartActive(false);
  };

  return (
    <>
      <AbsoluteContainer size="small" style={stylesAbsolute}>
        <Tabs.Root>
          <StyledTabsList>
            <StyledTabsTrigger value={TABS["REVIEW"]}>
              Reviews
            </StyledTabsTrigger>
            <StyledTabsTrigger value={TABS["DLC"]}>DLC's</StyledTabsTrigger>
          </StyledTabsList>

          <StyledTabsContent value={TABS["REVIEW"]}>
            <Reviews />
          </StyledTabsContent>
        </Tabs.Root>
      </AbsoluteContainer>

      <DesktopContainer size="small" style={stylesDeskop} />
      {sidebarActive && <MobileContainer onClick={handleSidePartClose} />}
    </>
  );
}

// ----------------
// Reviews
// ----------------
function Reviews() {
  return (
    <>
      <ReviewsStatistcsCarousel />
      <StyledUserReviewList />
    </>
  );
}

function ReviewsStatistcsCarousel() {
  return (
    <Carousel.Provider numberOfItems={3}>
      <CarouselUpperPartContainer size="small" centered>
        <Carousel.Pagination />
        <Carousel.Navegation />
      </CarouselUpperPartContainer>

      <StyledCarouselScroller>
        {["a", "b", "c"].map((src, index) => (
          <Carousel.SnapItem index={index}>
            {({ isActive }) => <StyledReviewStatistcs />}
          </Carousel.SnapItem>
        ))}
      </StyledCarouselScroller>
    </Carousel.Provider>
  );
}

// ----------------
// GameSidePartIcon
// ----------------
export function GameSidePartIcon() {
  const {
    sidebarActive: [, setSidebarActive],
  } = useGameSidePart();

  return (
    <SideBarIcon as="button" onClick={() => setSidebarActive((a) => !a)}>
      <SideBarLineIcon />
    </SideBarIcon>
  );
}

// ----------------
// Hooks
// ----------------
function useGameSidePartValue() {
  const [sidepartActive, setSidepartActive] = useState(true);

  const [stylesDeskop] = useSpring(() => {
    return {
      width: sidepartActive ? "68rem" : "0",
      minWidth: sidepartActive ? "68rem" : "0",
      config: {
        easing: easings.easeOutSine,
        duration: 350,
      },
    };
  }, [sidepartActive]);

  const [stylesAbsolute] = useSpring(() => {
    return {
      x: sidepartActive ? "0" : "100%",
    };
  }, [sidepartActive]);

  return {
    sidebarActive: [sidepartActive, setSidepartActive],
    styles: {
      stylesDeskop,
      stylesAbsolute,
    },
  } as const;
}

function useGameSidePart() {
  const value = useContext(GameSidePartContext);

  if (value === null) {
    throw new Error(
      "useGameSidePart can only be used inside of a `GameSidePartProvider`"
    );
  }

  return value;
}

//
const GameSidePart = {
  Icon: GameSidePartIcon,
  Content: GameSidePartContent,
  Provider: GameSidePartProvider,
} as const;
export default GameSidePart;
