import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'theme';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

const ThemeContext = createContext(null);

const readSavedTheme = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved === 'dark' || saved === 'light' ? saved : null;
    } catch {
        return null;
    }
};

const getSystemTheme = () => (window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light');

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => readSavedTheme() || getSystemTheme());

    // Keep <html data-theme="..."> in sync (the CSS variables react to it)
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Until the user picks a theme manually, follow the operating system setting
    useEffect(() => {
        const media = window.matchMedia(MEDIA_QUERY);
        const handleChange = (e) => {
            if (!readSavedTheme()) setTheme(e.matches ? 'dark' : 'light');
        };
        media.addEventListener('change', handleChange);
        return () => media.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = useCallback(() => {
        const next = theme === 'dark' ? 'light' : 'dark';
        const root = document.documentElement;

        // Short-lived class that enables a smooth colour transition (see theme.css)
        root.classList.add('theme-switching');
        window.setTimeout(() => root.classList.remove('theme-switching'), 350);

        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // storage unavailable: the theme still changes for this session
        }
        setTheme(next);
    }, [theme]);

    const value = useMemo(() => ({ theme, isDark: theme === 'dark', toggleTheme }), [theme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
    return context;
};
