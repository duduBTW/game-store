import { Props } from "./size-container.props";
import { Container } from "./size-container.styles";

export default function SizeContainer({ children, ...rest }: Props) {
  return <Container {...rest}>{children}</Container>;
}
