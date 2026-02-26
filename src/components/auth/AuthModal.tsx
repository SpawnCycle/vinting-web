import { useEffect, useState, type MouseEvent } from "react";
import Login from "./Login";
import Register from "./Register";
import "./auth.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: "login" | "register";
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains("auth-overlay")) {
      onClose();
    }
  };

  return (
    <div className="auth-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>
          ✕
        </button>

        {mode === "login" ? (
          <Login switchToRegister={() => setMode("register")} />
        ) : (
          <Register switchToLogin={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
