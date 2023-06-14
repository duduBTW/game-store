import { useEffect } from "react";

function useFocustrap(active: boolean) {
  useEffect(() => {
    if (!active) {
      return;
    }

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      event.preventDefault();
    };

    window.document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);
}

export default useFocustrap;
