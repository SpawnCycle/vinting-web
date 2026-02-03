import { useTheme } from "../../context/ThemeContext";

export default function Profile() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h1>Profile</h1>

      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark mode" : "Light mode"}
      </button>

      <br />

      <a href="/profile/my-listings">My listings</a>
    </div>
  );
}
