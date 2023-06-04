export interface CarouselProviderProps {
  children: React.ReactNode;
  numberOfItems: number;
}

export interface CarouselScrollerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface SnapItemScrollerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children:
    | React.ReactNode
    | ((snapItemState: { isActive: boolean }) => React.ReactNode);
  index: number;
}
