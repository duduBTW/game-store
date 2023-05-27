import Typography from "../typography/typography";
import { Props } from "./button.props";
import { Container } from "./button.styles";

export default function Button({ children, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Typography size="lg" weight="bold">
        {children}
      </Typography>
    </Container>
  );
}
