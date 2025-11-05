// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Message sent! (This is a demo)');
//     setFormData({ name: '', email: '', message: '' });
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <main>
//       <div className="contact-page-container">
//         <div className="contact-header">
//           <h1 className="section-title">Get In Touch</h1>
//           <p className="section-subtitle">
//             We'd love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
//           </p>
//         </div>
        
//         <div className="contact-grid">
//           <form className="contact-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="contactName">Name</label>
//               <input
//                 type="text"
//                 id="contactName"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="contactEmail">Email</label>
//               <input
//                 type="email"
//                 id="contactEmail"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="contactMessage">Message</label>
//               <textarea
//                 id="contactMessage"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="How can we help?"
//                 required
//               />
//             </div>
            
//             <button type="submit" className="btn btn-primary submit-btn">
//               Send Message
//             </button>
//           </form>
          
//           <div className="contact-info">
//             <h3>Contact Information</h3>
            
//             <div className="contact-info-item">
//               <i className="fas fa-envelope"></i>
//               <a href="mailto:hello@skillbridge.ai">hello@skillbridge.ai</a>
//             </div>
            
//             <div className="contact-info-item">
//               <i className="fas fa-map-marker-alt"></i>
//               <span>Silicon Valley, California</span>
//             </div>
            
//             <div className="contact-socials">
//               <a href="#" className="social-icon" aria-label="LinkedIn">
//                 <i className="fab fa-linkedin-in"></i>
//               </a>
//               <a href="#" className="social-icon" aria-label="Twitter">
//                 <i className="fab fa-twitter"></i>
//               </a>
//               <a href="#" className="social-icon" aria-label="GitHub">
//                 <i className="fab fa-github"></i>
//               </a>
//             </div>
//           </div>
//         </div>
        
//         <div style={{ textAlign: 'center', marginTop: '60px' }}>
//           <Link to="/" className="btn">← Back to Home</Link>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ContactPage;

import { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // EmailJS configuration
  // You'll need to get these from your EmailJS account (https://www.emailjs.com/)
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS Public Key

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'korplz1408@gmail.com', // Your email address
        },
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for reaching out! We\'ll get back to you within 24 hours.' 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or email us directly at korplz1408@gmail.com' 
      });
    } finally {
      setIsLoading(false);
    }
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
            Have a question? We'd love to hear from you.
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
              <label htmlFor="contactSubject">Subject</label>
              <input
                type="text"
                id="contactSubject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
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
            
            {submitStatus.message && (
              <div className={`submit-status ${submitStatus.type}`}>
                <i className={`fas ${submitStatus.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                <span>{submitStatus.message}</span>
              </div>
            )}
            
            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Send Message
                </>
              )}
            </button>
          </form>
          
          <div className="contact-info">
            <h3>Contact Information</h3>
            
            <div className="contact-info-item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:korplz1408@gmail.com">korplz1408@gmail.com</a>
            </div>
            
            <div className="contact-info-item">
              <i className="fas fa-phone"></i>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </div>
            
            <div className="contact-info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Gurgaon, Haryana</span>
            </div>
            
            <div className="contact-info-item">
              <i className="fas fa-clock"></i>
              <span>Mon-Fri: 9AM-6PM PST</span>
            </div>
            
            <div className="contact-socials">
              <a href="https://www.linkedin.com/in/keshav-chauhan-83b940296/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/1408Keshu" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
