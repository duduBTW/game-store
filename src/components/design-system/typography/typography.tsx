import { Props } from "./typography.props";
import { Container } from "./typography.styles";

const Typography = ({ children, variant = "regular", ...rest }: Props) => {
  return (
    <Container {...rest} variant={variant}>
      {children}
    </Container>
  );
};

export default Typography;
