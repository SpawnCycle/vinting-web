interface RegisterProps {
  switchToLogin: () => void;
}

export default function Register({ switchToLogin }: RegisterProps) {
  return (
    <>
      <h2>Create Account</h2>

      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button className="auth-primary">Create Account</button>

      <p>
        Already have an account? &nbsp;&nbsp;
        <span className="auth-link" onClick={switchToLogin}>
          Sign in
        </span>
      </p>
    </>
  );
}
