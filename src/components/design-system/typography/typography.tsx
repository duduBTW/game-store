import { Props } from "./typography.props";
import { Container } from "./typography.styles";

const Typography = ({
  children,
  size = "base",
  lineHeight = "paragraph",
  color = "gray.100",
  weight = "regular",
  fontFamily = "Nunito",
  ...rest
}: Props) => {
  return (
    <Container
      {...rest}
      color={color}
      size={size}
      weight={weight}
      fontFamily={fontFamily}
      lineHeight={lineHeight}
    >
      {children}
    </Container>
  );
};

export default Typography;
