import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const Header = ({ onLoginClick, onSignupClick }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFeaturesClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If already on landing page, just scroll
      scrollToSection('features');
    } else {
      // If on another page, navigate to landing page with hash
      navigate('/#features');
      // Use a longer timeout to ensure page is loaded
      setTimeout(() => {
        scrollToSection('features');
      }, 200);
    }
  };

  return (
    <header className="top-nav">
      <Link to="/" className="logo">
        <img 
          src={theme === 'light' ? '/light.png' : '/darkLogo.png'} 
          alt="SkillBridge Logo" 
          className="logo-image" 
        />
      
      </Link>


      <nav>
        <a href="#features" onClick={handleFeaturesClick} className="nav-link">Features</a>
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
