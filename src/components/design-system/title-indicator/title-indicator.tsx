import { Props } from "./title-indicator.props";
import { Container, Indicator } from "./title-indicator.styles";

function TitleIndicator({ children, ...rest }: Props) {
  return (
    <Container {...rest}>
      {children}
      <Indicator />
    </Container>
  );
}

export default TitleIndicator;
