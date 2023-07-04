import { useQuery } from "@tanstack/react-query";
import usePrice from "@/hooks/usePrice";
import Button from "../../button/button";
import TitleIndicator from "../../title-indicator/title-indicator";
import {
  UpperPart,
  Bottompart,
  GameCardContainer,
  Container,
  GameCardTitle,
  GameCardPrice,
} from "./game-grid.styles";
import { getGameList } from "@/service/game";
import { GameCardProps, Props } from "./game-grid.props";
import AssetDisplay from "../../assets/display/asset-display";

function GameGrid({ cardLinkPrefix, title, action }: Props) {
  const { data: gameList } = useQuery(getGameList.getKey(), () =>
    getGameList()
  );

  if (!gameList) {
    return null;
  }

  return (
    <Container>
      <UpperPart>
        {title && <TitleIndicator>{title}</TitleIndicator>}
        {action}
      </UpperPart>

      <Bottompart>
        {gameList.map((game) => (
          <GameCard linkPrefix={cardLinkPrefix} key={game.id} game={game} />
        ))}
      </Bottompart>
    </Container>
  );
}

function GameCard({ game, linkPrefix, ...rest }: GameCardProps) {
  const formattedPrice = usePrice(game.price);

  return (
    <GameCardContainer {...rest} to={`/${linkPrefix}/${game.id}`}>
      <AssetDisplay asset={game.Assets[0]} />
      <GameCardTitle weight="bold" lineHeight="title">
        {game.title}
      </GameCardTitle>
      <GameCardPrice size="sm" color="gray.400" lineHeight="title">
        {formattedPrice}
      </GameCardPrice>
    </GameCardContainer>
  );
}

export default GameGrid;
