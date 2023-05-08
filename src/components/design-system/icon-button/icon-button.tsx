import { Props } from "./icon-button.props";
import { Container } from "./icon-button.styles";

export default function IconButton({ children, ...rest }: Props) {
  return <Container {...rest}>{children}</Container>;
}
