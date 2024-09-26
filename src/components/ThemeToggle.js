// src/components/ThemeToggle.js
import { useTheme } from '../context/ThemeContext';
import { Button } from 'reactstrap';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import sun and moon icons

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme} color={theme === 'light' ? 'dark' : 'light'}>
            {theme === 'light' ? <FaMoon /> : <FaSun />} {/* Use icons instead of text */}
        </Button>
    );
};

export default ThemeToggle;
