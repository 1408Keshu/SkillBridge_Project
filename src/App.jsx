import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Header from './components/common/Navbar';
import LandingPage from './Pages/LandingPage';
import ContactPage from './Pages/ContactPage';
import Dashboard from './components/dashboard/Dashboard';
import LoginModal from './components/auth/LoginModal';
import SignupModal from './components/auth/SignupModal';
import CustomCursor from './components/common/CustomCursor';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const handleGetStartedClick = () => {
    setShowSignupModal(true);
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  return (
    <Router>
      <div className="App">
        <CustomCursor />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Header 
                  onLoginClick={handleLoginClick}
                  onSignupClick={handleSignupClick}
                />
                <LandingPage onGetStartedClick={handleGetStartedClick} />
              </>
            } 
          />
          
          <Route 
            path="/contact" 
            element={
              <>
                <Header 
                  onLoginClick={handleLoginClick}
                  onSignupClick={handleSignupClick}
                />
                <ContactPage />
              </>
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        
        <LoginModal 
          isOpen={showLoginModal}
          onClose={handleCloseModals}
          onSwitchToSignup={handleSwitchToSignup}
        />
        
        <SignupModal 
          isOpen={showSignupModal}
          onClose={handleCloseModals}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </div>
    </Router>
  );
}

export default App;