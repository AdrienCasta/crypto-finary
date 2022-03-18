import { createContext, FunctionalComponent, h } from "preact";
import { useState, useContext, useCallback } from "preact/hooks";
import { ToastList } from "../../components/Base";
import { ToastType } from "../../types";

const ToastContext = createContext({ addToast: (toast: ToastType) => {} });

const ToastProvider: FunctionalComponent = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback(
    function (toast: ToastType) {
      setToasts((toasts) => [...toasts, toast]);
      setTimeout(() => setToasts((toasts) => toasts.slice(1)), 3000);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastList toasts={toasts} />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export { ToastProvider, useToast };
