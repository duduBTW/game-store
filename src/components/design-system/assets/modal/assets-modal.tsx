import { createPortal } from "react-dom";
import {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useTheme } from "styled-components";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import ArrowDropRightLineIcon from "remixicon-react/ArrowDropRightLineIcon";
import ArrowDropLeftLineIcon from "remixicon-react/ArrowDropLeftLineIcon";
import inRange from "lodash.inrange";

import { Asset } from "@/service/game";
import Typography from "@/components/design-system/typography";
import IconButton from "@/components/design-system/icon-button";

import { PortalProps, RootProps } from "./assets-modal.props";
import {
  AssetImage,
  BottomPartContainer,
  ContentContainer,
  CurrentAssetContainer,
  StyledOverlay,
  UpperPartContainer,
} from "./assets-modal.styles";

const AssetsModalContext = createContext<ReturnType<
  typeof useAssetsModalValue
> | null>(null);

// ------------------
// Root
// ------------------
function Root({ children }: RootProps) {
  const value = useAssetsModalValue();

  return (
    <AssetsModalContext.Provider value={value}>
      {children}
    </AssetsModalContext.Provider>
  );
}

// ------------------
// Portal
// ------------------
function Portal({ children, container = document.body }: PortalProps) {
  const { isOpen } = useAssetsModal();

  if (!isOpen) {
    return null;
  }

  return createPortal(children, container);
}

// ------------------
// Content
// ------------------
function Content() {
  const { isOpen } = useAssetsModal();

  if (!isOpen) {
    return null;
  }

  return (
    <ContentContainer>
      <UpperPart />
      <CurrentAsset />
      <BottomPart />
    </ContentContainer>
  );
}

function UpperPart() {
  const theme = useTheme();
  const { handleClose } = useAssetsModal();

  return (
    <UpperPartContainer>
      <Typography color="gray.300">Assets</Typography>

      <IconButton onClick={handleClose}>
        <CloseLineIcon color={theme.colors.red["500"]} />
      </IconButton>
    </UpperPartContainer>
  );
}

function CurrentAsset() {
  const { currentAsset } = useAssetsModal();

  return (
    <CurrentAssetContainer>
      <AssetImage key={currentAsset.id} src={currentAsset.contentUrl} />
    </CurrentAssetContainer>
  );
}

function BottomPart() {
  const {
    assetCount,
    selectedAsset,
    canMoveTo: canSlideTo,
    moveTo: slideTo,
  } = useAssetsModal();

  const moveToNext = () => slideTo(nextComparation);
  const moveToPrevius = () => slideTo(previousComparation);

  const canMovePrevius = canSlideTo(previousComparation);
  const canMoveNext = canSlideTo(nextComparation);

  return (
    <BottomPartContainer>
      <IconButton disabled={!canMovePrevius} onClick={moveToPrevius}>
        <ArrowDropLeftLineIcon />
      </IconButton>
      <Typography>
        {selectedAsset} of {assetCount}
      </Typography>
      <IconButton disabled={!canMoveNext} onClick={moveToNext}>
        <ArrowDropRightLineIcon />
      </IconButton>
    </BottomPartContainer>
  );
}

// ------------------
// Overlay
// ------------------
function Overlay() {
  const { handleClose } = useAssetsModal();

  return <StyledOverlay onClick={handleClose} />;
}

// ------------------
// Hooks
// ------------------
function useAssetsModalValue() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedAssetIndex, setSelectedAsset] = useState(0);

  const assetCount = useMemo(() => assets.length, [assets]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setAssets([]);
    setSelectedAsset(0);
  }, []);

  const handleOpen = useCallback(
    (newAssets: Asset[], defaultSelectedAsset = 0) => {
      setOpen(true);
      setAssets(newAssets);
      setSelectedAsset(defaultSelectedAsset);
    },
    []
  );

  const canMoveTo = useMemo(
    () => canMoveToFactory(selectedAssetIndex, assetCount),
    [selectedAssetIndex, assetCount]
  );

  const moveTo = useCallback(
    (getDestinationIndex: DestinationIndex) => {
      if (!canMoveTo(getDestinationIndex)) {
        return;
      }

      const destinationIndex = getDestinationIndex(selectedAssetIndex);

      setSelectedAsset(destinationIndex);
    },
    [canMoveTo, selectedAssetIndex]
  );

  const currentAsset = useMemo(
    () => assets[selectedAssetIndex],
    [assets, selectedAssetIndex]
  );

  const keyPressedHandlers = useMemo<Record<string, () => void>>(
    () => ({
      ArrowRight: () => moveTo(nextComparation),
      ArrowLeft: () => moveTo(previousComparation),
      Escape: () => handleClose(),
    }),
    [moveTo, handleClose]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      keyPressedHandlers[event.key]?.();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [keyPressedHandlers]);

  return {
    handleClose,
    handleOpen,
    isOpen: open && currentAsset && assets.length > 0,
    assetCount: assets.length,
    selectedAsset: selectedAssetIndex + 1,
    currentAsset,
    canMoveTo,
    moveTo,
  } as const;
}

export function useAssetsModal() {
  const value = useContext(AssetsModalContext);

  if (value === null) {
    throw new Error(
      "useCarousel can only be used inside of a `AssetsModalProvider`"
    );
  }

  return value;
}

// ----------------
// Helpers
// ----------------
function previousComparation(activeIndex: number) {
  return activeIndex - 1;
}

function nextComparation(activeIndex: number) {
  return activeIndex + 1;
}

type DestinationIndex = (activeIndex: number) => number;

function canMoveToFactory(activeIndex: number, numberOfItems: number) {
  return (getDestinationIndex: DestinationIndex) => {
    const destinationIndex = getDestinationIndex(activeIndex);

    return inRange(destinationIndex, 0, numberOfItems);
  };
}

const AssetsModal = {
  Content,
  Root,
  Portal,
  Overlay,
} as const;
export default AssetsModal;
