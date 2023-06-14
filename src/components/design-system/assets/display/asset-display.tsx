import { getIsValidImage } from "@/service/game";
import { ImageAssetProps, Props } from "./asset-display.props";
import { StyledDefaultAsset, StyledImageAsset } from "./asset-display.styles";
import { useQuery } from "@tanstack/react-query";

function AssetDisplay({ asset, ...rest }: Props) {
  if (!asset || asset.contentUrl.trim() === "") {
    return <DefaultAsset {...rest} />;
  }

  switch (asset?.type) {
    case "image":
      return <ImageAsset asset={asset} {...rest} />;
    default:
      return <DefaultAsset {...rest} />;
  }
}

function DefaultAsset(props: React.HTMLAttributes<HTMLElement>) {
  return <StyledDefaultAsset {...props} />;
}

function ImageAsset({ asset, ...rest }: ImageAssetProps) {
  const { data: isValidImage, isLoading } = useQuery(
    getIsValidImage.getKey(asset.contentUrl),
    () => getIsValidImage(asset.contentUrl)
  );

  if (isLoading || !isValidImage) {
    return <DefaultAsset {...rest} />;
  }

  return <StyledImageAsset {...rest} src={asset.contentUrl} />;
}

export default AssetDisplay;
