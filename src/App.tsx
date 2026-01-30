import AppRouter from "./Router.jsx";
import { ThemeProvider } from "./context/ThemeContext.js";

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
