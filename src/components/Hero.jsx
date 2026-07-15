import { useState, useEffect } from 'react';
import './Hero.css';

const backgrounds = [
  '/images/bg1.png',
  '/images/bg2.png',
  '/images/bg3.png'
];

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="hero" 
      style={{ backgroundImage: `url(${backgrounds[currentBg]})` }}
      id="home"
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Celebrate Life with <br /><span>Parthi Events</span></h1>
        <p>Your trusted event partner from Kallakurichi. Memorable celebrations, premium planning, and lifetime experiences.</p>
        
        <div className="hero-btns">
          <button className="btn-yellow">View Packages</button>
          <button className="btn-outline-white" onClick={() => setShowContact(true)}>Contact Us</button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">344+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <div className="stat-num">20+</div>
            <div className="stat-label">Event Packages</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <div className="stat-num">4.3<span style={{ fontSize: '24px'}}>★</span></div>
            <div className="stat-label">Google Rating</div>
          </div>
        </div>
      </div>

      {showContact && (
        <div className="contact-popup-overlay" onClick={() => setShowContact(false)}>
          <div className="contact-popup" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowContact(false)}>×</button>
            <h3>Contact Info</h3>
            <div className="contact-details">
              <p><strong>Name</strong> Parthiban P</p>
              <p><strong>Contact</strong> +91 9788966227</p>
              <p><strong>Mail ID</strong> parthithala350@gmail.com</p>
              <p><strong>Instagram ID</strong> parthie_xx_15</p>
              <p><strong>Facebook ID</strong> Thala Parthi</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
