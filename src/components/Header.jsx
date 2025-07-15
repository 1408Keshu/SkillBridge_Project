import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const Header = ({ onLoginClick, onSignupClick }) => {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="top-nav">
      <Link to="/" className="logo">SkillBridge</Link>
      <nav>
        <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="nav-link">Features</a>
        <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="nav-link">How It Works</a>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="nav-cta">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <i className="fas fa-sun"></i>
          <i className="fas fa-moon"></i>
        </button>
        <button className="login-btn" onClick={onLoginClick}>Login</button>
        <button className="signup-btn" onClick={onSignupClick}>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
