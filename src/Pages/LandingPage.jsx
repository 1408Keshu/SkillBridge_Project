import { useEffect, useRef } from 'react';

const LandingPage = ({ onGetStartedClick }) => {
  const energyCircleRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Handle hash navigation - scroll to section if hash exists in URL
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1); // Remove the '#' symbol
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    // Energy circle mouse movement effect
    const handleMouseMove = (e) => {
      if (heroRef.current && energyCircleRef.current && !window.matchMedia("(pointer: coarse)").matches) {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = heroRef.current;
        const xPos = (clientX / offsetWidth - 0.5) * 30;
        const yPos = (clientY / offsetHeight - 0.5) * 30;
        energyCircleRef.current.style.transform = `translate(${xPos}px, ${yPos}px) rotateX(${-yPos/2}deg) rotateY(${xPos/2}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (energyCircleRef.current) {
        energyCircleRef.current.style.transform = 'translate(0px, 0px) rotateX(0deg) rotateY(0deg)';
      }
    };

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.dataset.target;
          const isDecimal = el.dataset.decimal === 'true';
          const duration = 1500;
          const totalFrames = Math.round(duration / (1000 / 60));
          let frame = 0;
          
          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const current = target * progress;
            el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
            
            if (frame === totalFrames) {
              clearInterval(counter);
              el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
            }
          }, (1000 / 60));
          
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.8 });

    stats.forEach(stat => counterObserver.observe(stat));

    if (heroRef.current) {
      heroRef.current.addEventListener('mousemove', handleMouseMove);
      heroRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
      stats.forEach(stat => counterObserver.unobserve(stat));
      if (heroRef.current) {
        heroRef.current.removeEventListener('mousemove', handleMouseMove);
        heroRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <main>
      <section className="hero" ref={heroRef}>
        <div className="hero-text animate-on-scroll">
          <h1>Unlock Your Tech Career Potential</h1>
          <p>SkillBridge's AI builds a personalized roadmap with curated skills, free resources, and mini-projects to land your dream tech job.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={onGetStartedClick}>
              Start Your Journey
            </button>
          </div>
        </div>
        <div className="hero-image animate-on-scroll">
          <div className="energy-circle" ref={energyCircleRef}></div>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2 className="section-title animate-on-scroll">What We Offer</h2>
        <div className="feature-list">
          <div className="feature animate-on-scroll">
            <h3>AI Plan</h3>
            <p>Weekly, tailored learning paths that adapt to your progress and goals.</p>
          </div>
          <div className="feature animate-on-scroll" style={{ transitionDelay: '100ms' }}>
            <h3>Mini-Projects</h3>
            <p>Build hands-on skills with practical, portfolio-worthy projects.</p>
          </div>
          <div className="feature animate-on-scroll" style={{ transitionDelay: '200ms' }}>
            <h3>Track Progress</h3>
            <p>Visual, actionable dashboard to monitor your learning journey.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <h2 className="section-title animate-on-scroll">How It Works</h2>
        <p className="section-subtitle animate-on-scroll">
          Follow a simple, AI-driven process to accelerate your career growth.
        </p>
        <div className="how-it-works-grid">
          <div className="how-it-works-step animate-on-scroll">
            <div className="step-number">01</div>
            <div className="step-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <h3>Define Your Goal</h3>
            <p>Tell our AI your dream role, like "Backend Developer" or "Data Scientist".</p>
          </div>
          <div className="how-it-works-step animate-on-scroll" style={{ transitionDelay: '100ms' }}>
            <div className="step-number">02</div>
            <div className="step-icon">
              <i className="fas fa-robot"></i>
            </div>
            <h3>Get AI Roadmap</h3>
            <p>Receive a custom, step-by-step learning path with skills and resources.</p>
          </div>
          <div className="how-it-works-step animate-on-scroll" style={{ transitionDelay: '200ms' }}>
            <div className="step-number">03</div>
            <div className="step-icon">
              <i className="fas fa-code"></i>
            </div>
            <h3>Learn and Build</h3>
            <p>Complete curated tutorials and build mini-projects to solidify your skills.</p>
          </div>
          <div className="how-it-works-step animate-on-scroll" style={{ transitionDelay: '300ms' }}>
            <div className="step-number">04</div>
            <div className="step-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <h3>Achieve Career</h3>
            <p>Track your progress, build your portfolio, and land your dream job.</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2 className="section-title animate-on-scroll">Our Impact</h2>
        <div className="stats-grid">
          <div className="stat-item animate-on-scroll">
            <div className="stat-number" data-target="10000">0</div>
            <div className="stat-label">Roadmaps Created</div>
          </div>
          <div className="stat-item animate-on-scroll">
            <div className="stat-number" data-target="94">0</div>
            <div className="stat-label">User Success Rate %</div>
          </div>
          <div className="stat-item animate-on-scroll">
            <div className="stat-number" data-target="4.9" data-decimal="true">0</div>
            <div className="stat-label">User Satisfaction</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="section-title animate-on-scroll">Have Questions?</h2>
        <p className="section-subtitle animate-on-scroll">
          Our team is here to help you on your journey. Reach out to us anytime.
        </p>
        <a href="/contact" className="btn btn-primary">Get In Touch</a>
      </section>
    </main>
  );
};

export default LandingPage;
