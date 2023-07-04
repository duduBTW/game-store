export type TabsDirection = "horizontal" | "vertical";

export type UseTabsValueProps = {
  defaultValue?: string;
  direction?: TabsDirection;
};

export interface RootProps extends UseTabsValueProps {
  children: React.ReactNode;
}

export interface ListProps extends React.ComponentProps<"div"> {
  loop?: boolean;
  children: React.ReactNode;
}

export interface TriggerProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  value: string;
}

export interface ContentProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  value: string;
}
