import { useState } from 'react';
import './Packages.css';

const packages = [
  {
    title: 'Dj Party',
    subtitle: '',
    imgClass: 'pkg-img-1',
    features: ['Basic', 'Stark light', 'Smoke']
  },
  {
    title: 'Birthday Party',
    subtitle: '',
    imgClass: 'pkg-img-2',
    features: ['Stage decoration', 'Photography', 'Videography']
  },
  {
    title: 'Marriage Function',
    subtitle: '',
    imgClass: 'pkg-img-3',
    features: ['Stage decoration', 'Garlands', 'Outdoor shoot', 'Photography', 'Videography', 'Catering']
  }
];

const Packages = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <section className="section" id="packages">
      <div className="section-header">
        <span className="section-tag">Our Services</span>
        <h2>Premium Event Packages</h2>
        <p>Explore our carefully curated event packages designed to make your celebrations truly unforgettable.</p>
      </div>

      <div className="packages-grid">
        {packages.map((pkg, idx) => (
          <div className="pkg-card" key={idx}>
            <div className={`pkg-img ${pkg.imgClass}`}>
              <div className="pkg-badge">Best Value</div>
            </div>
            <div className="pkg-body">
              <h3>{pkg.title}</h3>
              {pkg.subtitle && <div className="pkg-subtitle">{pkg.subtitle}</div>}
              
              <div className="inclusions">
                <h4>What's Included</h4>
                {pkg.features.map((feature, i) => (
                  <div className="inclusion-item" key={i}>{feature}</div>
                ))}
              </div>
              
              <div className="pkg-footer" style={{ justifyContent: 'center' }}>
                <button className="pkg-btn" style={{ width: '100%', padding: '12px' }} onClick={() => setShowBooking(true)}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
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
    </section>
  );
};

export default Packages;
