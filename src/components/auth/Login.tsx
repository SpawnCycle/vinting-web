import { useState } from "react";
import { login, whoami } from "@/api/authApi";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface LoginProps {
  switchToRegister: () => void;
}

export default function Login({ switchToRegister }: LoginProps) {
  const { setUser } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    try {
      setError(null);

      await login({
        email,
        password,
      });

      const user = await whoami();
      showToast("Login successful", "Welcome back!", "success");
      setUser(user);
    } catch (err) {
      setError("Login failed");
      showToast("Login failed", "Invalid email or password.", "error");
    }
  }

  return (
    <>
      <h2>Sign in</h2>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="auth-password-field">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span
          className="auth-password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <LuEyeClosed /> : <LuEye />}
        </span>
      </div>

      <button className="auth-primary" onClick={handleLogin}>
        Login
      </button>

      {error && <p className="auth-error">{error}</p>}

      <p>
        Don't have an account? &nbsp;&nbsp;
        <span className="auth-link" onClick={switchToRegister}>
          Create one
        </span>
      </p>
    </>
  );
}
