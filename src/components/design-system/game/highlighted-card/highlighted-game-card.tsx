import { useEffect, useMemo, useState } from "react";
import * as dompurify from "isomorphic-dompurify";

import Button from "../../button/button";
import Typography from "../../typography/typography";
import { Props } from "./highlighted-game-card.props";
import {
  AssetDisplayContainer,
  Container,
  Html,
  StyledAssetDisplay,
} from "./highlighted-game-card.styles";

function HighlightedGameCard({
  game: { Assets, description, price, title },
  isActive,
  onAssetClick,
  ...rest
}: Props) {
  const [activeAsset, setActiveAsset] = useState(0);

  const handleAssetClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onAssetClick?.(Assets, activeAsset);
  };

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const totalAssets = Assets.length;

    const intervalId = setInterval(() => {
      setActiveAsset((oldActiveAsset) => {
        const newActiveAsset = oldActiveAsset + 1;

        if (newActiveAsset > totalAssets - 1) {
          return 0;
        }

        return newActiveAsset;
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [Assets, isActive]);

  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price),
    [price]
  );

  const purifiedDescription = useMemo(() => {
    if (!dompurify.isSupported) {
      return "";
    }

    return dompurify.sanitize(description);
  }, [description]);

  return (
    <Container data-active={isActive} {...rest}>
      <AssetDisplayContainer onClick={handleAssetClick}>
        <StyledAssetDisplay asset={Assets[activeAsset]} />
      </AssetDisplayContainer>
      <Typography
        lineHeight="title"
        size="2xl"
        fontFamily="Rubik"
        weight="bold"
      >
        {title}
      </Typography>
      <Html
        dangerouslySetInnerHTML={{
          __html: purifiedDescription,
        }}
      />

      <Button.AdditionalInfo label={formattedPrice}>
        <Button>See game</Button>
      </Button.AdditionalInfo>
    </Container>
  );
}

export default HighlightedGameCard;
