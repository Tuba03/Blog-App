// src/components/ThemeToggle.js
import { useTheme } from '../context/ThemeContext';
import { Button } from 'reactstrap';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme} color={theme === 'light' ? 'dark' : 'light'}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
        
    );
};

export default ThemeToggle;
