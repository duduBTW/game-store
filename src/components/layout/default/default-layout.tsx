import { Outlet } from "react-router-dom";
import Nav from "@/components/design-system/nav";
import { Container, Content } from "./default-layout.styles";
import { Props } from "./default-layout.props";

export default function DefautLayout({ hideNav }: Props) {
  return (
    <Container>
      {!hideNav && <Nav />}
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}
