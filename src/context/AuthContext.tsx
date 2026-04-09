import { createContext, useContext, useEffect, useState } from "react";

import { whoami } from "../api/authApi";
import type { User } from "../types/User";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const u = await whoami();
      if ("code" in u) {
        setUser(null);
      } else {
        setUser(u);
      }
    } catch {
      setUser(null);
    }
    setLoading(false);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");

  return ctx;
}
