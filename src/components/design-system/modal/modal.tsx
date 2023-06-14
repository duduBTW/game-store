import { createPortal } from "react-dom";
import {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import {
  ContentProps,
  PortalProps,
  RootProps,
  TriggerProps,
} from "./modal.props";
import { ContentContainer, StyledOverlay } from "./modal.styles";

const ModalContext = createContext<ReturnType<typeof useModalValue> | null>(
  null
);

// ------------------
// Root
// ------------------
function Root({ children }: RootProps) {
  const value = useModalValue();

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

// ------------------
// Portal
// ------------------
function Portal({ children, container = document.body }: PortalProps) {
  const { isOpen } = useModal();

  if (!isOpen) {
    return null;
  }

  return createPortal(children, container);
}

// ------------------
// Content
// ------------------
function Content({ children, ...rest }: ContentProps) {
  const { isOpen } = useModal();

  if (!isOpen) {
    return null;
  }

  return <ContentContainer {...rest}>{children}</ContentContainer>;
}

// ------------------
// Trigger
// ------------------
function Trigger({ children }: TriggerProps) {
  const { handleOpen } = useModal();

  return children(handleOpen);
}

// ------------------
// Overlay
// ------------------
function Overlay() {
  const { handleClose } = useModal();

  return <StyledOverlay onClick={handleClose} />;
}

// ------------------
// Hooks
// ------------------
function useModalValue() {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const keyPressedHandlers = useMemo<Record<string, () => void>>(
    () => ({
      Escape: () => handleClose(),
    }),
    [handleClose]
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
    isOpen: open,
  } as const;
}

export function useModal() {
  const value = useContext(ModalContext);

  if (value === null) {
    throw new Error("useCarousel can only be used inside of a `ModalProvider`");
  }

  return value;
}

const Modal = {
  Content,
  Root,
  Portal,
  Overlay,
  Trigger,
} as const;
export default Modal;
