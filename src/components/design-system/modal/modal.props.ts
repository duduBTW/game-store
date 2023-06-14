export interface PortalProps {
  children: React.ReactNode;
  container?: Element | DocumentFragment;
}

export interface RootProps {
  children: React.ReactNode;
}

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface TriggerProps {
  children: (handleOpen: () => void) => JSX.Element;
}
