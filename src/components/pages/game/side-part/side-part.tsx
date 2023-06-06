import { useState } from "react";
import { useSpring, easings } from "@react-spring/web";
import { createContext, useContextSelector } from "use-context-selector";
import SideBarLineIcon from "remixicon-react/SideBarLineIcon";
import Tabs from "@/components/design-system/tabs/tabs";
import { GameSidePartProviderProps } from "./side-part.props";
import {
  AbsoluteContainer,
  SideBarIcon,
  DesktopContainer,
  MobileContainer,
  TabsContent,
  TabsList,
  CarouselUpperPartContainer,
  ReviewStatistcsContainer,
  StyledCarouselScroller,
} from "./side-part.styles";
import Carousel from "@/components/design-system/carousel/carousel";

const tabs = {
  REVIEW: "reviews",
  DLC: "dlc",
  NEWS: "news",
} as const;

export function GameSidePartContent() {
  const sidebarActive = useSidebarActive();
  const setSidebarActive = useSetSidebarActive();

  const [stylesDeskop] = useSpring(() => {
    return {
      width: sidebarActive ? "68rem" : "0",
      minWidth: sidebarActive ? "68rem" : "0",
      config: {
        easing: easings.easeOutSine,
        duration: 350,
      },
    };
  }, [sidebarActive]);

  const [stylesAbsolute] = useSpring(() => {
    return {
      x: sidebarActive ? "0" : "100%",
    };
  }, [sidebarActive]);

  const closeSidebar = () => {
    setSidebarActive(false);
  };

  return (
    <>
      <AbsoluteContainer size="small" style={stylesAbsolute}>
        <Tabs.Root>
          <TabsList>
            <Tabs.Trigger value={tabs["REVIEW"]}>Reviews</Tabs.Trigger>
            <Tabs.Trigger value={tabs["DLC"]}>DLC’s</Tabs.Trigger>
            <Tabs.Trigger value={tabs["NEWS"]}>News</Tabs.Trigger>
            <Tabs.Trigger value="teste">teste</Tabs.Trigger>
          </TabsList>

          <TabsContent value={tabs["REVIEW"]}>
            <Reviews />
          </TabsContent>

          <TabsContent value={tabs["DLC"]}>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              tenetur eveniet, autem fugit architecto dignissimos atque
              cupiditate error dolore laborum!
            </div>
          </TabsContent>

          <TabsContent value={tabs["NEWS"]}>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              totam in molestiae, illo cupiditate, magni quod eius cumque
              dignissimos consectetur accusamus optio similique autem culpa ab
              vitae nemo corporis modi!
            </div>
          </TabsContent>

          <TabsContent value="teste">
            <div>
              Lousamus optio similique autem culpa ab vitae nemo corporis modi!
            </div>
          </TabsContent>
        </Tabs.Root>
      </AbsoluteContainer>

      <DesktopContainer size="small" style={stylesDeskop} />
      {sidebarActive && <MobileContainer onClick={closeSidebar} />}
    </>
  );
}

export function GameSidePartIcon() {
  const setSidebarActive = useSetSidebarActive();

  return (
    <SideBarIcon as="button" onClick={() => setSidebarActive((a) => !a)}>
      <SideBarLineIcon />
    </SideBarIcon>
  );
}

export function Reviews() {
  return (
    <div>
      <Carousel.Provider numberOfItems={3}>
        <CarouselUpperPartContainer size="small" centered>
          <Carousel.Pagination />
          <Carousel.Navegation />
        </CarouselUpperPartContainer>

        <StyledCarouselScroller>
          {["a", "b", "c"].map((src, index) => (
            <Carousel.SnapItem index={index}>
              {({ isActive }) => <ReviewStatistcs />}
            </Carousel.SnapItem>
          ))}
        </StyledCarouselScroller>
      </Carousel.Provider>
    </div>
  );
}

function ReviewStatistcs() {
  return (
    <ReviewStatistcsContainer>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, ratione!
    </ReviewStatistcsContainer>
  );
}

// Provider
function useGameSidePart() {
  const [sidepartActive, setSidepartActive] = useState(true);

  return [sidepartActive, setSidepartActive] as const;
}

const useSetSidebarActive = () =>
  useContextSelector(GameSidePartContext, (state) => {
    if (!state) {
      throw new Error("");
    }

    const [, set] = state;

    return set;
  });

const useSidebarActive = () =>
  useContextSelector(GameSidePartContext, (state) => {
    if (!state) {
      throw new Error("");
    }

    const [get] = state;

    return get;
  });

const GameSidePartContext = createContext<ReturnType<
  typeof useGameSidePart
> | null>(null);

export function GameSidePartProvider({ children }: GameSidePartProviderProps) {
  const value = useGameSidePart();

  return (
    <GameSidePartContext.Provider value={value}>
      {children}
    </GameSidePartContext.Provider>
  );
}

const GameSidePart = {
  Icon: GameSidePartIcon,
  Content: GameSidePartContent,
  Provider: GameSidePartProvider,
} as const;

export default GameSidePart;
