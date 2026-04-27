import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// ===============================
// Tipos del contexto
// ===============================
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// ===============================
// Contexto tipado
// ===============================
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ===============================
// Provider tipado
// ===============================
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;

    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
      return;
    }

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial: "light" | "dark" = prefersDark ? "dark" : "light";

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggleTheme() {
    const newTheme: "light" | "dark" = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ===============================
// Hook seguro y tipado
// ===============================
export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  }
  return ctx;
}
