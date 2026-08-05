import { useState } from 'react';
import './Header.css';

const Header = ({ setCurrentPage }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleNav = (page) => {
    setCurrentPage(page);
    closeMenu();
  };

  return (
    <>
      <nav className="navbar">
        {/* Left: Logo + God Name */}
        <div className="brand-header-wrapper">
          <a href="#home" className="brand-logo" onClick={() => handleNav('home')}>
            <div className="brand-name">
              PARTH<span className="brand-i">I<span className="brand-flame"></span></span>
            </div>
            <div className="brand-sub">EVENT'S</div>
          </a>
          <div className="brand-god-blessing">
            <span className="god-line1">ஸ்ரீ சித்தலூர் பெரியநாயகி அம்மன் துணை</span>
            <span className="god-line2">ஸ்ரீ முருகன் துணை</span>
          </div>
        </div>

        {/* Center: Nav Links (Desktop) */}
        <div className="nav-links">
          <a href="#home" onClick={() => handleNav('home')}>Home</a>
          <a href="#packages" onClick={(e) => { e.preventDefault(); handleNav('packages'); window.scrollTo(0,0); }}>Packages</a>
          <a href="#gallery" onClick={(e) => { e.preventDefault(); handleNav('gallery'); window.scrollTo(0,0); }}>Gallery</a>
          <a href="#reviews" onClick={() => handleNav('home')}>Reviews</a>
          <a href="#contact" onClick={() => handleNav('home')}>Contact</a>
        </div>

        {/* Right: Contact + Book Now (Desktop) */}
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
          <button className="nav-btn desktop-book" onClick={() => setShowBooking(true)}>Book Now</button>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {menuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="mobile-brand">
            <span className="mobile-brand-name">PARTHI</span>
            <span className="mobile-brand-sub">EVENT'S</span>
          </div>
          <button className="mobile-close-btn" onClick={closeMenu}>✕</button>
        </div>

        <div className="mobile-god-text">
          <p>ஸ்ரீ சித்தலூர் பெரியநாயகி அம்மன் துணை</p>
          <p>ஸ்ரீ முருகன் துணை</p>
        </div>

        <nav className="mobile-nav-links">
          <a href="#home" onClick={() => handleNav('home')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Home
          </a>
          <a href="#packages" onClick={(e) => { e.preventDefault(); handleNav('packages'); window.scrollTo(0,0); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Packages
          </a>
          <a href="#gallery" onClick={(e) => { e.preventDefault(); handleNav('gallery'); window.scrollTo(0,0); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Gallery
          </a>
          <a href="#reviews" onClick={() => handleNav('home')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Reviews
          </a>
          <a href="#contact" onClick={() => handleNav('home')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Contact
          </a>
        </nav>

        <div className="mobile-contact-info">
          <a href="tel:+919788966227">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +91 9788966227
          </a>
          <a href="mailto:parthithala350@gmail.com">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            parthithala350@gmail.com
          </a>
        </div>

        <button className="mobile-book-btn" onClick={() => { setShowBooking(true); closeMenu(); }}>
          Book Now
        </button>
      </div>

      {/* Booking Popup */}
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
    </>
  );
};

export default Header;
