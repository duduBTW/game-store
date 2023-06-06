import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
} from "react";
import {
  ContentProps,
  ListProps,
  RootProps,
  TriggerProps,
  UseTabsValueProps,
} from "./tabs.props";
import {
  StyledTabList,
  StyledTabTrigger,
  StyledTriggerSeparator,
} from "./tabs.style";
import Typography from "../typography/typography";

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
    <StyledTabList {...rest} role="tablist">
      {children}
    </StyledTabList>
  );
}

// ------------------
// Trigger
// ------------------
function Trigger({ value, children, ...rest }: TriggerProps) {
  const {
    setFocused,
    setSelectedTab,
    selectedTab,
    handleTriggerRef,
    tabsTriggers,
  } = useTabs();

  const canShowSeparator = useMemo(() => {
    if (!selectedTab) {
      return null;
    }

    return getCanShowSeparator(value, selectedTab, tabsTriggers.current);
  }, [selectedTab, value, tabsTriggers]);

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
    <>
      {canShowSeparator?.previous && <TriggerSeparator />}

      <StyledTabTrigger
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        tabIndex={isSelected ? 1 : 0}
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
        <Typography weight="medium">{children}</Typography>
      </StyledTabTrigger>

      {canShowSeparator?.next && <TriggerSeparator />}
    </>
  );
}

// ------------------
// TriggerSeparator
// ------------------
export function TriggerSeparator() {
  return <StyledTriggerSeparator />;
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
      tabIndex={1}
    >
      {children}
    </div>
  );
}

// ------------------
// Hooks
// ------------------
export function useTabsValue({ defaultValue }: UseTabsValueProps) {
  const tabsTriggers = useRef<TabTriggerRecord>({});

  const [focused, setFocused] = useState(false);
  const [selectedTab, setSelectedTab] = useState(defaultValue);

  const handleTriggerRef = useCallback(
    (element: HTMLButtonElement, value: string) => {
      console.log("pog");

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
      const newSelectedTabValue = getKeyPressedTabValue(
        event.key,
        selectedTab,
        tabsTriggers.current
      );

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
  }, [focused, selectedTab]);

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

function getCanShowSeparator(
  currentTab: string,
  selectedTab: string,
  tabsTriggers: TabTriggerRecord
) {
  const previousValue = getPreviousValue(tabsTriggers, currentTab);
  const nextValue = getNextValue(tabsTriggers, currentTab);
  const isSelected = currentTab === selectedTab;

  return {
    previous: !isSelected && previousValue !== selectedTab,
    next: !isSelected && nextValue !== selectedTab,
  };
}

function getKeyPressedTabValue(
  pressedKey: string,
  selectedTab: string,
  tabsTriggers: TabTriggerRecord
) {
  const keyDownHandlers: Record<string, string | undefined> = {
    ArrowLeft: getPreviousValue(tabsTriggers, selectedTab),
    ArrowRight: getNextValue(tabsTriggers, selectedTab),
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
