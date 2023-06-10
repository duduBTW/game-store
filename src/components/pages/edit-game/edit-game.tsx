import { useParams } from "react-router";
import Tabs from "@/components/design-system/tabs";
import { Params } from "./edit-game.props";
import {
  Container,
  MainPartContainer,
  SidePartContainer,
  SidePartTrigger,
} from "./edit-game.styles";

const TABS = {
  TITLE: "title",
  PRICE: "price",
  SIMPLE_DESCRIPTION: "simpleDescription",
} as const;

function EditGamePage() {
  const { id } = useParams<Params>();

  if (!id) {
    return null;
  }

  return (
    <Tabs.Root direction="vertical">
      <Container>
        <SidePartContainer>
          <SidePartTrigger value={TABS.TITLE}>Game title</SidePartTrigger>
          <SidePartTrigger value={TABS.PRICE}>Price</SidePartTrigger>
          <SidePartTrigger value={TABS.SIMPLE_DESCRIPTION}>
            Simplified description
          </SidePartTrigger>
        </SidePartContainer>
        <MainPartContainer value={TABS.TITLE}>
          Title content {id}
        </MainPartContainer>
        <MainPartContainer value={TABS.PRICE}>
          Price content {id}
        </MainPartContainer>
        <MainPartContainer value={TABS.SIMPLE_DESCRIPTION}>
          Simples desc content {id}
        </MainPartContainer>
      </Container>
    </Tabs.Root>
  );
}

export default EditGamePage;
