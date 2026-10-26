export type ThemeMode = "light" | "dark";

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem("indraprastha_theme");
    return saved === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(theme: ThemeMode) {
  if (typeof window === "undefined") return;
  const isDark = theme === "dark";

  try {
    localStorage.setItem("indraprastha_theme", theme);
  } catch {
    // ignore
  }

  const root = document.documentElement;
  const body = document.body;

  if (isDark) {
    root.setAttribute("data-theme", "dark");
    root.classList.add("dark-theme");
    root.classList.remove("light-theme");
    root.style.colorScheme = "dark";
    root.style.backgroundColor = "#0F0905";

    if (body) {
      body.setAttribute("data-theme", "dark");
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
      body.style.backgroundColor = "#0F0905";
    }
  } else {
    root.setAttribute("data-theme", "light");
    root.classList.add("light-theme");
    root.classList.remove("dark-theme");
    root.style.colorScheme = "light";
    root.style.backgroundColor = "#FAF6F0";

    if (body) {
      body.setAttribute("data-theme", "light");
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
      body.style.backgroundColor = "#FAF6F0";
    }
  }

  // Update meta theme-color for mobile browser chrome
  try {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute("content", isDark ? "#0F0905" : "#FAF6F0");
  } catch {
    // ignore
  }

  // Dispatch global window event so every active navbar, drawer, or page synchronizes
  try {
    window.dispatchEvent(new CustomEvent("indraprastha_theme_change", { detail: { theme } }));
  } catch {
    // ignore
  }
}
