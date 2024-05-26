// theme.js
export function applyTheme() {
  if (typeof window !== 'undefined') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme && currentTheme !== "system") {
      document.querySelector("body").setAttribute("data-theme", currentTheme);
    } else {
      document.querySelector("body").setAttribute("data-theme", systemTheme);
      localStorage.setItem("theme", "system");
    }
  }
}
