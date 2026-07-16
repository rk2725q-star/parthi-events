import { useState, useEffect } from 'react';
import './Hero.css';

const backgrounds = [
  '/images/bg1.png',
  '/images/bg2.png',
  '/images/bg3.png'
];

const Hero = ({ setShowPackages }) => {
  const [currentBg, setCurrentBg] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleNameClick = () => {
    setShowHearts(true);
    setTimeout(() => {
      setShowHearts(false);
    }, 4000);
  };

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
          <button className="btn-yellow" onClick={() => setShowPackages(true)}>View Packages</button>
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
              <div className="contact-link" style={{ cursor: 'pointer' }} onClick={handleNameClick}>
                <div className="contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
                <div className="contact-text"><strong>Name</strong><span>Parthiban P</span></div>
              </div>
              <a href="tel:+919788966227" className="contact-link">
                <div className="contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                <div className="contact-text"><strong>Contact</strong><span>+91 9788966227</span></div>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=parthithala350@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                <div className="contact-text"><strong>Mail ID</strong><span>parthithala350@gmail.com</span></div>
              </a>
              <a href="https://www.instagram.com/parthie_xx_15" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></div>
                <div className="contact-text"><strong>Instagram</strong><span>@parthie_xx_15</span></div>
              </a>
              <a href="https://www.facebook.com/people/Thala-Parthi/pfbid032Enc1djSYVdqEKn3fQ8gaFYFzXEpAq8ctZKtp5oBjnJTeucJF7V7HJXPABZudFcUl/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></div>
                <div className="contact-text"><strong>Facebook</strong><span>Thala Parthi</span></div>
              </a>
            </div>
          </div>
        </div>
      )}

      {showHearts && (
        <div className="hearts-overlay">
          <div className="quote-box">
            <h2>உங்கள் கோரிக்கைகள் அனைத்தும் சிறப்பாக நிறைவேற்றப்படும்... ❤️</h2>
          </div>
          <div className="heart heart-1">❤️</div>
          <div className="heart heart-2">💖</div>
          <div className="heart heart-3">❤️</div>
          <div className="heart heart-4">💕</div>
          <div className="heart heart-5">❤️</div>
          <div className="heart heart-6">💝</div>
          <div className="heart heart-7">💖</div>
          <div className="heart heart-8">❤️</div>
        </div>
      )}
    </div>
  );
};

export default Hero;
