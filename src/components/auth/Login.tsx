interface LoginProps {
  switchToRegister: () => void;
}

export default function Login({ switchToRegister }: LoginProps) {
  return (
    <>
      <h2>Sign in</h2>

      <input type="text" placeholder="User name" />
      <input type="password" placeholder="Password" />

      <button className="auth-primary">Login</button>

      <p>
        Don't have an account? &nbsp;&nbsp;
        <span className="auth-link" onClick={switchToRegister}>
          Create one
        </span>
      </p>
    </>
  );
}
