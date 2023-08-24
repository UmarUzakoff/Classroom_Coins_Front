import { createContext, useState, useEffect } from "react";

export const ThemeApi = createContext({});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <ThemeApi.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeApi.Provider>
  );
};

export default ThemeProvider;
