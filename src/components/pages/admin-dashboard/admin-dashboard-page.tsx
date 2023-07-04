import Button from "@/components/design-system/button";
import GameGrid from "@/components/design-system/game/grid";
import SizeContainer from "@/components/design-system/size-container/size-container";
import { Link } from "react-router-dom";

function AdminDashboardPage() {
  return (
    <SizeContainer size="large" centered>
      <GameGrid
        title="Games"
        cardLinkPrefix="admin/edit-game"
        action={
          <Link to="/admin/create-game">
            <Button as="div" size="small">
              New
            </Button>
          </Link>
        }
      />
    </SizeContainer>
  );
}

export default AdminDashboardPage;
