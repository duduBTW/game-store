import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import Typography from "@/components/design-system/typography";
import {
  ContentProps,
  ListProps,
  RootProps,
  TabsDirection,
  TriggerProps,
  UseTabsValueProps,
} from "./tabs.props";

type TabTriggerRecord = Record<string, HTMLButtonElement>;

// ------------------
// Root
// ------------------
const TabsContext = createContext<ReturnType<typeof useTabsValue> | null>(null);

function Root({ children, ...rest }: RootProps) {
  const value = useTabsValue(rest);

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

// ------------------
// List
// ------------------
function List({ children, ...rest }: ListProps) {
  return (
    <div {...rest} role="tablist">
      {children}
    </div>
  );
}

// ------------------
// Trigger
// ------------------
function Trigger({ value, children, ...rest }: TriggerProps) {
  const { setFocused, setSelectedTab, selectedTab, handleTriggerRef } =
    useTabs();

  const isSelected = value === selectedTab;

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    setFocused(true);
    rest.onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    setFocused(false);
    rest.onBlur?.(event);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSelectedTab(value);
    rest.onClick?.(event);
  };

  return (
    <button
      {...rest}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      tabIndex={isSelected ? 0 : -1}
      aria-selected={isSelected}
      role="tab"
      aria-controls={getControlledAria(value)}
      data-value={value}
      data-selected={isSelected}
      ref={(node) => {
        if (!node) return;

        handleTriggerRef(node, value);
      }}
    >
      <Typography
        color={isSelected ? "gray.100" : "gray.300"}
        weight={isSelected ? "medium" : "regular"}
      >
        {children}
      </Typography>
    </button>
  );
}

// ------------------
// Content
// ------------------
function Content({ children, value, ...rest }: ContentProps) {
  const { selectedTab } = useTabs();
  const isSelected = value === selectedTab;

  if (!isSelected) {
    return null;
  }

  return (
    <div
      {...rest}
      role="tabpanel"
      aria-labelledby={getControlledAria(value)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

// ------------------
// Hooks
// ------------------
export function useTabsValue({
  defaultValue,
  direction = "horizontal",
}: UseTabsValueProps) {
  const tabsTriggers = useRef<TabTriggerRecord>({});

  const [focused, setFocused] = useState(false);
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  const handleTriggerRef = useCallback(
    (element: HTMLButtonElement, value: string) => {
      tabsTriggers.current[value] = element;
    },
    []
  );

  useLayoutEffect(() => {
    if (selectedTab) {
      return;
    }

    setSelectedTab(getFirstSelectedTab(tabsTriggers.current));
  }, [selectedTab]);

  useEffect(() => {
    if (!selectedTab || !focused) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const newSelectedTabValue = getKeyPressedTabValue({
        pressedKey: event.key,
        selectedTab: selectedTab,
        tabsTriggers: tabsTriggers.current,
        direction,
      });

      if (!newSelectedTabValue) {
        return;
      }

      setSelectedTab(newSelectedTabValue);
      tabsTriggers.current[newSelectedTabValue].focus();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [focused, selectedTab, direction]);

  return {
    setFocused,
    selectedTab,
    setSelectedTab,
    handleTriggerRef,
    tabsTriggers,
  } as const;
}

export function useTabs() {
  const value = useContext(TabsContext);

  if (value === null) {
    throw new Error(
      "useCarousel can only be used inside of a `TabsContextProvider`"
    );
  }

  return value;
}

// ------------------
// Helpers
// ------------------
function getControlledAria(value: string) {
  return `tab-${value}`;
}

function getFirstSelectedTab(tabsTriggers: TabTriggerRecord) {
  const firstTrigger = Object.values(tabsTriggers)[0];

  return firstTrigger?.dataset.value;
}

function getLastSelectedTab(tabsTriggers: TabTriggerRecord) {
  const tabValues = Object.keys(tabsTriggers);

  return tabValues[tabValues.length - 1];
}

function getNextValue(tabsTriggers: TabTriggerRecord, selectedTab: string) {
  const tabValues = Object.keys(tabsTriggers);
  const selectedTabValueIndex = tabValues.indexOf(selectedTab);

  return tabValues[selectedTabValueIndex + 1];
}

function getPreviousValue(tabsTriggers: TabTriggerRecord, selectedTab: string) {
  const tabValues = Object.keys(tabsTriggers);
  const selectedTabValueIndex = tabValues.indexOf(selectedTab);

  return tabValues[selectedTabValueIndex - 1];
}

function getKeyPressedTabValue({
  pressedKey,
  selectedTab,
  tabsTriggers,
  direction,
}: {
  pressedKey: string;
  selectedTab: string;
  tabsTriggers: TabTriggerRecord;
  direction: TabsDirection;
}) {
  const nextKey = direction === "horizontal" ? "ArrowRight" : "ArrowDown";
  const previousKey = direction === "horizontal" ? "ArrowLeft" : "ArrowUp";

  const keyDownHandlers: Record<string, string | undefined> = {
    [previousKey]: getPreviousValue(tabsTriggers, selectedTab),
    [nextKey]: getNextValue(tabsTriggers, selectedTab),
    Home: getFirstSelectedTab(tabsTriggers),
    End: getLastSelectedTab(tabsTriggers),
  };

  return keyDownHandlers[pressedKey];
}

const Tabs = {
  Root,
  List,
  Trigger,
  Content,
} as const;
export default Tabs;
