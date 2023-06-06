export type UseTabsValueProps = {
  defaultValue?: string;
};

export interface RootProps extends UseTabsValueProps {
  children: React.ReactNode;
}

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  loop?: boolean;
  children: React.ReactNode;
}

export interface TriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  value: string;
}

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value: string;
}
