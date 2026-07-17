import { useState } from 'react';
import './Header.css';

const Header = ({ setCurrentPage }) => {
  const [showBooking, setShowBooking] = useState(false);
  return (
    <nav className="navbar">
      <a href="#home" className="brand-logo">
        <div className="brand-name">
          PARTH<span className="brand-i">I<span className="brand-flame"></span></span>
        </div>
        <div className="brand-sub">EVENT'S</div>
      </a>
      
      <div className="nav-links">
        <a href="#home" onClick={() => setCurrentPage('home')}>Home</a>
        <a href="#packages" onClick={(e) => { e.preventDefault(); setCurrentPage('packages'); window.scrollTo(0,0); }}>Packages</a>
        <a href="#gallery" onClick={(e) => { e.preventDefault(); setCurrentPage('gallery'); window.scrollTo(0,0); }}>Gallery</a>
        <a href="#reviews" onClick={() => setCurrentPage('home')}>Reviews</a>
        <a href="#contact" onClick={() => setCurrentPage('home')}>Contact</a>
      </div>

      <div className="nav-right">
        <div className="nav-contact">
          <a href="tel:+919788966227">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            +91 9788966227
          </a>
          <a href="mailto:parthithala350@gmail.com">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            parthithala350@gmail.com
          </a>
        </div>
        <button className="nav-btn" onClick={() => setShowBooking(true)}>Book Now</button>
      </div>

      {showBooking && (
        <div className="booking-popup-overlay">
          <div className="booking-popup">
            <button className="close-btn" onClick={() => setShowBooking(false)}>×</button>
            <h3>Parthi Events</h3>
            <p className="booking-subtitle">Booking Details</p>
            <form className="booking-form" onSubmit={(e) => { e.preventDefault(); alert("Booking Submitted Successfully!"); setShowBooking(false); }}>
              <input type="text" placeholder="Name" required />
              <input type="text" placeholder="Address" required />
              <input type="tel" placeholder="Phone number" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Location" required />
              <textarea placeholder="Events mention" rows="3" required></textarea>
              <button type="submit" className="btn-yellow" style={{ width: '100%', padding: '14px', marginTop: '10px' }}>Submit Booking</button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
