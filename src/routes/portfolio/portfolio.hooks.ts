import { useBoolean } from "../../hooks";

const useDialog = (intialOpenState = false) => {
  const {
    setFalse: closeDialog,
    setTrue: openDialog,
    value: isOpen,
  } = useBoolean(intialOpenState);

  return {
    closeDialog,
    openDialog,
    isOpen,
  };
};

export { useDialog };
