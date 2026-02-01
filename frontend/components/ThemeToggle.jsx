'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'luxerent-theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const next = stored || (prefersDark ? 'dark' : 'light');
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', next === 'dark');
        window.localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-amber-400" />
      ) : (
        <Moon size={18} className="text-gray-600" />
      )}
    </button>
  );
}

