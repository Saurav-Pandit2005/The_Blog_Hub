import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

/**
 * Light / dark mode switch.
 * variant: 'icon' (navbars), 'sidebar' (icon + label row), 'floating' (fixed top-right corner)
 */
function ThemeToggle({ variant = 'icon' }) {
    const { isDark, toggleTheme } = useTheme();
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

    return (
        <button
            type="button"
            className={`theme-toggle theme-toggle-${variant}`}
            onClick={toggleTheme}
            aria-label={label}
            title={label}
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            {variant === 'sidebar' && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
    );
}

export default ThemeToggle;
