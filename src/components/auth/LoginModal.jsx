import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    setLoading(true);
    
    try {
      await login(email, password);
      // Close modal and redirect to dashboard
      onClose();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal active" onClick={handleClose}>
      <div className="auth-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={handleClose}>&times;</button>
        
        <div className="auth-header">
          <h2>Welcome Back</h2>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              type="email"
              id="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              id="loginPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && <div style={{ color: 'var(--primary)', marginBottom: '10px', whiteSpace: 'pre-line' }}>{error}</div>}
          
          <button 
            type="submit" 
            className={`auth-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <div className="divider">or</div>
        
        <div className="social-login">
          <button className="social-btn">
            <i className="fab fa-google"></i>
          </button>
          <button className="social-btn">
            <i className="fab fa-github"></i>
          </button>
          <button className="social-btn">
            <i className="fab fa-apple"></i>
          </button>
        </div>
        
        <div className="auth-footer">
          No account? <button onClick={onSwitchToSignup} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
