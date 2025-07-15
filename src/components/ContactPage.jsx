import { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (This is a demo)');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main>
      <div className="contact-page-container">
        <div className="contact-header">
          <h1 className="section-title">Get In Touch</h1>
          <p className="section-subtitle">
            We'd love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
        
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contactName">Name</label>
              <input
                type="text"
                id="contactName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactEmail">Email</label>
              <input
                type="email"
                id="contactEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactMessage">Message</label>
              <textarea
                id="contactMessage"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help?"
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary submit-btn">
              Send Message
            </button>
          </form>
          
          <div className="contact-info">
            <h3>Contact Information</h3>
            
            <div className="contact-info-item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:hello@skillbridge.ai">hello@skillbridge.ai</a>
            </div>
            
            <div className="contact-info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Silicon Valley, California</span>
            </div>
            
            <div className="contact-socials">
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/" className="btn">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
