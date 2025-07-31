import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Add this line

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`${API_URL}/api/auth/register`, formData); // Use API_URL here
      localStorage.setItem('userName', formData.name); // Store the name
      setSuccess('Account created successfully! Please login with your credentials.');
      setLoading(false);
      setTimeout(() => {
        onSwitchToLogin();
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', password: '' });
    setLoading(false);
    setError('');
    setSuccess('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal active" onClick={handleClose}>
      <div className="auth-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={handleClose}>&times;</button>
        
        <div className="auth-header">
          <h2>Create Account</h2>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="signupName">Full Name</label>
            <input
              type="text"
              id="signupName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="signupEmail">Email</label>
            <input
              type="email"
              id="signupEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="signupPassword">Password</label>
            <input
              type="password"
              id="signupPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={`auth-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        {error && <div style={{color:'red', marginTop:8}}>{error}</div>}
        {success && <div style={{color:'green', marginTop:8}}>{success}</div>}
        <div className="auth-footer">
          Already have an account? <button onClick={onSwitchToLogin} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}>Log in</button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
