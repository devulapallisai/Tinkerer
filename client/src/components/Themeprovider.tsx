import React from "react";
export const ThemeContext = React.createContext({
  theme: "dark",
  setTheme: (s: string) => {},
});

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }

  // If you want to use light theme as the default,
  // return "light" instead
  return "light";
};

export const ThemeProvider = ({
  initialTheme,
  children,
}: {
  initialTheme: string;
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = React.useState(getInitialTheme);

  const rawSetTheme = (theme: string) => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("color-theme", theme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <>{children}</>
    </ThemeContext.Provider>
  );
};
