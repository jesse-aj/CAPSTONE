import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#359EFF]/10 text-[#359EFF] dark:bg-[#359EFF]/20 hover:bg-[#359EFF]/20 dark:hover:bg-[#359EFF]/30 transition-colors"
    >
      <span className="material-symbols-outlined">
        {darkMode ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
