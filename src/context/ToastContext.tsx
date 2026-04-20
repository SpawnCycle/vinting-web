import { createContext, useContext, useState } from "react";
import Toast from "../components/toast/Toast";

import { BiError } from "react-icons/bi";
import { SiTicktick } from "react-icons/si";
import { RiRobot2Line } from "react-icons/ri";

type ToastType = "success" | "error" | "system";

type ToastItem = {
  id: number;
  title: string;
  message: string;
  type: ToastType;
};

const ToastContext = createContext<any>(null);

const ICONS = {
  success: { icon: SiTicktick, color: "#22c55e" },
  error: { icon: BiError, color: "#ef4444" },
  system: { icon: RiRobot2Line, color: "#6b7280" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function showToast(
    title: string,
    message: string,
    type: ToastType = "system",
  ) {
    const id = Date.now() + Math.random();

    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }

  function removeToast(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="toast-container">
        {toasts.map((t) => {
          const { icon, color } = ICONS[t.type];

          return (
            <Toast
              key={t.id}
              title={t.title}
              message={t.message}
              icon={icon}
              color={color}
              onClose={() => removeToast(t.id)}
            />
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return ctx;
}
