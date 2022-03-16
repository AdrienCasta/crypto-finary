import { useState, useCallback } from "preact/hooks";

const useBoolean = (intialValue = false) => {
  const [value, setBoolean] = useState(intialValue);

  const setFalse = useCallback(() => {
    setBoolean(false);
  }, []);

  const setTrue = useCallback(() => {
    setBoolean(true);
  }, []);

  return { setFalse, setTrue, value };
};

export default useBoolean;
