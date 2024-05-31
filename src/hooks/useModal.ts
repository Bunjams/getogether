import { useState } from "react";

export const useModal = (defaultValue: boolean = false) => {
  const [isOpen, setOpenState] = useState(defaultValue);

  return {
    isOpen,
    open: () => setOpenState(true),
    close: () => setOpenState(false),
    toggle: () => setOpenState((o) => !o),
  };
};
