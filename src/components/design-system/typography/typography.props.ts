// type PropsOfElement<
//   C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
// > = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;

export type TypographyVariant = "regular" | "lg" | "3xl";

// export type Props<C extends React.ElementType> = PropsOfElement<C> & {
//   as?: C;
//   variant: TypographyVariant;
// };

export interface Props extends React.HTMLAttributes<"div"> {
  as?: React.ElementType;
  variant?: TypographyVariant;
  children: React.ReactNode;
}

export interface StyledContainerProps {
  variant: TypographyVariant;
}
