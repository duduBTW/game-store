import { Outlet } from "react-router-dom";
import { Container } from "./default-layout.styles";

export default function DefautLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
