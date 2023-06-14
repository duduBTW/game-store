import { Props } from "./loading-overlay.props";
import { LoadingOverlayContent } from "./loading-overlay.styles";

function LoadingOverlay({ isLoading }: Props) {
  if (!isLoading) {
    return null;
  }

  return <LoadingOverlayContent />;
}

export default LoadingOverlay;
