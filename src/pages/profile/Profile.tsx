import { useTheme } from "../../context/ThemeContext";

export default function Profile() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h1>Profil</h1>

      <button onClick={toggleTheme}>
        {theme === "light" ? "Sötét mód" : "Világos mód"}
      </button>

      <br />

      <a href="/profile/my-listings">Saját hirdetéseim</a>
    </div>
  );
}
