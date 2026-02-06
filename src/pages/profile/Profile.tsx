import { Link } from "react-router-dom";
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

      <Link
        to="/profile/my-listings"
        state={{ returnTo: "/profile" }}
      > MyListings
      </Link>
    </div>
  );
}
