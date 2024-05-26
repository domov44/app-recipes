import React, { useState, useEffect } from 'react';
import { showToast, notifySuccess } from '../../components/ui/Toastify';
import ThemeView from './ThemeView';

const useThemeDetector = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const getCurrentTheme = () => {
      if (typeof window !== 'undefined') {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      return false;
    };
    setIsDarkTheme(getCurrentTheme());

    const mqListener = (e => {
      setIsDarkTheme(e.matches);
    });

    if (typeof window !== 'undefined') {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      darkThemeMq.addListener(mqListener);
      return () => darkThemeMq.removeListener(mqListener);
    }
  }, []);

  return isDarkTheme;
}

function ThemeSwitch() {
  const systemTheme = useThemeDetector();
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme && currentTheme !== "system") {
        setTheme(currentTheme);
        document.querySelector("body").setAttribute("data-theme", currentTheme);
      } else {
        setTheme("system");
        document.querySelector("body").setAttribute("data-theme", systemTheme ? 'dark' : 'light');
        localStorage.setItem("theme", "system");
      }
    }
  }, [systemTheme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      const selectedTheme = newTheme === "system" ? (systemTheme ? 'dark' : 'light') : newTheme;
      document.querySelector("body").setAttribute("data-theme", selectedTheme);
      localStorage.setItem("theme", newTheme);

      const themeText = newTheme === 'system' ? 'système' : selectedTheme === 'dark' ? 'sombre' : 'clair';
      const successMessage = `Thème ${themeText} appliqué`;
      notifySuccess(successMessage);
    }
  };

  return (
    <>
      <div className='theme-container'>
        <input
          className='radio-theme'
          type="radio"
          id="System"
          name="theme"
          value="system"
          checked={theme === "system"}
          onChange={() => handleThemeChange("system")}
        />
        <label className="label-theme" htmlFor="System">
          <ThemeView theme={systemTheme ? 'dark' : 'light'} />
          <div className="text-theme">Système</div>
        </label>
      </div>
      <div className='theme-container'>
        <input
          className='radio-theme'
          type="radio"
          id="Light"
          name="theme"
          value="light"
          checked={theme === "light"}
          onChange={() => handleThemeChange("light")}
        />
        <label className="label-theme" htmlFor="Light">
          <ThemeView theme="light" />
          <div className="text-theme">Clair</div>
        </label>
      </div>
      <div className='theme-container'>
        <input
          className='radio-theme'
          type="radio"
          id="Dark"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange={() => handleThemeChange("dark")}
        />
        <label className="label-theme" htmlFor="Dark">
          <ThemeView theme="dark" />
          <div className="text-theme">Sombre</div>
        </label>
      </div>
    </>
  );
}

export default ThemeSwitch;
