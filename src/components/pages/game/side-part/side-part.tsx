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
  StyledCreateReview,
} from "./side-part.styles";
import Carousel from "@/components/design-system/carousel/carousel";
import { useTheme } from "styled-components";
import { useParams } from "react-router";
import StatisticsRecentChart from "../reviews/statistics-recent-chart";
import { useQuery } from "@tanstack/react-query";
import {
  getGameReviewsAllStatistics,
  getGameReviewsRecentStatistics,
} from "@/service/game-review";
import BarGraph from "../reviews/statistics-all-chart/statistics-all-chart";

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
  const gameId = useGameId();

  return (
    <>
      <ReviewsStatistcsCarousel />
      <StyledCreateReview gameId={gameId} />
      <StyledUserReviewList gameId={gameId} />
    </>
  );
}

function ReviewsStatistcsCarousel() {
  return (
    <Carousel.Provider numberOfItems={2}>
      <CarouselUpperPartContainer size="small" centered>
        <Carousel.Pagination />
        <Carousel.Navegation />
      </CarouselUpperPartContainer>

      <StyledCarouselScroller>
        <Carousel.SnapItem index={0}>
          {({ isActive }) => <ReviewRecentStatistcs data-active={isActive} />}
        </Carousel.SnapItem>
        <Carousel.SnapItem index={1}>
          {({ isActive }) => <ReviewAllStatistcs data-active={isActive} />}
        </Carousel.SnapItem>
      </StyledCarouselScroller>
    </Carousel.Provider>
  );
}

function ReviewRecentStatistcs(props: React.HTMLAttributes<HTMLDivElement>) {
  const gameId = useGameId();

  const { data: reviews } = useQuery(
    getGameReviewsRecentStatistics.getKey(gameId),
    () => getGameReviewsRecentStatistics(gameId)
  );

  if (!reviews) {
    return null;
  }

  return (
    <StyledReviewStatistcs
      {...props}
      title="Recent reviews"
      ratio={reviews.ratio}
      total={reviews.quantity.total}
      chart={
        <StatisticsRecentChart height={94} width={140} reviews={reviews} />
      }
    />
  );
}

function ReviewAllStatistcs(props: React.HTMLAttributes<HTMLDivElement>) {
  const gameId = useGameId();

  const { data: reviews } = useQuery(
    getGameReviewsAllStatistics.getKey(gameId),
    () => getGameReviewsAllStatistics(gameId)
  );

  if (!reviews) {
    return null;
  }

  return (
    <StyledReviewStatistcs
      {...props}
      title="All reviews"
      ratio={reviews.ratio}
      total={reviews.total}
      chart={<BarGraph reviews={reviews} />}
    />
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
  const theme = useTheme();
  const [sidepartActive, setSidepartActive] = useState(
    () => window.matchMedia(theme.mq.fromDesktop.replace("@media ", "")).matches
  );

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

function useGameId() {
  const { id } = useParams();

  if (!id) {
    throw new Error("No id found!");
  }

  return id;
}

//
const GameSidePart = {
  Icon: GameSidePartIcon,
  Content: GameSidePartContent,
  Provider: GameSidePartProvider,
} as const;
export default GameSidePart;
