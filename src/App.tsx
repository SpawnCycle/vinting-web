import AppRouter from "./Router.jsx";
import GlobalLoader from "./components/globalLoader/GlobalLoader.js";
import { AuthProvider } from "./context/AuthContext.js";
import { ThemeProvider } from "./context/ThemeContext.js";
import { ToastProvider } from "./context/ToastContext.js";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <GlobalLoader />
          <AppRouter />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
