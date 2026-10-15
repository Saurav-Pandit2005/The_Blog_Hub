import logoLight from '../../assets/Images/Brand/logo.png';
import logoOnDark from '../../assets/Images/Brand/logo-on-dark.png';
import logoIcon from '../../assets/Images/Brand/logo-icon.png';
import { useTheme } from '../../context/ThemeContext';
import './Logo.css';

/**
 * The Blog Hub logo.
 * - variant "full": icon + wordmark. Picks the light-text version in dark mode.
 * - variant "icon": only the "B" icon (used when a sidebar is collapsed).
 * - onDark: force the light-text version (for surfaces that are always dark).
 */
function Logo({ variant = 'full', onDark = false, className = '' }) {
    const { isDark } = useTheme();

    const src = variant === 'icon' ? logoIcon : onDark || isDark ? logoOnDark : logoLight;
    const classes = ['brand-logo', `brand-logo-${variant}`, className].filter(Boolean).join(' ');

    return <img src={src} alt="The Blog Hub" className={classes} draggable="false" />;
}

export default Logo;
