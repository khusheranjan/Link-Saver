import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-neutral-800 p-2 rounded shadow-md">
        <button
        onClick={() => setDark(!dark)}
        className="text-sm px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        >
        {dark ? "🌙 Dark" : "☀️ Light"}
        </button>
    </div>
  );
}
