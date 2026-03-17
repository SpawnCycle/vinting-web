import { useState } from "react";
import { signup } from "@/api/authApi";
import { useToast } from "@/context/ToastContext";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface RegisterProps {
  switchToLogin: () => void;
}

export default function Register({ switchToLogin }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  async function handleRegister() {
    try {
      setError(null);

      await signup({
        name,
        email,
        password,
      });

      switchToLogin();
      showToast("Registration successful", "You can now log in.", "success");
    } catch (err) {
      setError("Registration failed");
      showToast(
        "Registration failed",
        "Something went wrong. Please try again.",
        "error",
      );
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
