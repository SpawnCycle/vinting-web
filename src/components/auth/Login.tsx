import { useState } from "react";
import { login, whoami } from "@/api/authApi";
import { useAuth } from "@/context/AuthContext";

interface LoginProps {
  switchToRegister: () => void;
}

export default function Login({ switchToRegister }: LoginProps) {
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    try {
      setError(null);

      await login({
        email,
        password,
      });

      const user = await whoami();
      setUser(user);
    } catch (err) {
      setError("Login failed");
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

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

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
