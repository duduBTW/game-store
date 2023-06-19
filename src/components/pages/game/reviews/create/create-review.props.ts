export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  gameId: string;
}

export interface BottomPartProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  gameId: string;
}
