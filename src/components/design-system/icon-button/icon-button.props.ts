export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  isLoading?: boolean;
}
