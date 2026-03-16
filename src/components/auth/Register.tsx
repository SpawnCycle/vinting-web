import { useState } from "react";
import { signup } from "@/api/authApi";

interface RegisterProps {
  switchToLogin: () => void;
}

export default function Register({ switchToLogin }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleRegister() {
    try {
      setError(null);

      await signup({
        name,
        email,
        password,
      });

      switchToLogin();
    } catch (err) {
      setError("Registration failed");
    }
  }

  return (
    <>
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
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

      <button className="auth-primary" onClick={handleRegister}>
        Create Account
      </button>

      {error && <p className="auth-error">{error}</p>}

      <p>
        Already have an account? &nbsp;&nbsp;
        <span className="auth-link" onClick={switchToLogin}>
          Sign in
        </span>
      </p>
    </>
  );
}
