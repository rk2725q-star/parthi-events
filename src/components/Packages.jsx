import { useState } from 'react';
import './Packages.css';
import TravelPackages from './TravelPackages';

const allPackages = [
  {
    title: 'Dj Party',
    subtitle: 'High-energy sound & light setup',
    imgClass: 'pkg-img-1',
    features: ['Basic DJ Sound System', 'Stark Moving Lights', 'Smoke & Fog Effects']
  },
  {
    title: 'Birthday Party',
    subtitle: 'Magical celebrations for all ages',
    imgClass: 'pkg-img-2',
    features: ['Stage decoration', 'Photography', 'Videography']
  },
  {
    title: 'Marriage Function',
    subtitle: 'Grand South Indian wedding planning',
    imgClass: 'pkg-img-3',
    features: ['Stage decoration', 'Garlands', 'Outdoor shoot', 'Photography', 'Videography', 'Catering']
  },
  {
    title: 'Reception',
    subtitle: 'Glamorous evening celebration',
    imgClass: 'pkg-img-4',
    features: ['Modern LED Backdrop', 'Red Carpet Entry', 'Live Sound & DJ', 'Drone Photography', 'Cold Pyro Effects']
  },
  {
    title: 'Baby Shower',
    subtitle: 'Auspicious family traditional event',
    imgClass: 'pkg-img-5',
    features: ['Traditional Flower Mandapam', 'Traditional Music Setup', 'Candid Photography', 'Return Gift Setup']
  },
  {
    title: 'Corporate & School Events',
    subtitle: 'Professional stage & sound setup',
    imgClass: 'pkg-img-6',
    features: ['Truss & LED Screen Setup', 'Public Address Sound System', 'Stage Lighting & Mics', 'Event Management']
  },
  {
    title: 'Mascot Performance',
    subtitle: 'Fun character dance & kid interaction',
    imgClass: 'pkg-img-7',
    features: ['Teddy Bear Mascot', 'Gorilla Mascot', 'Fun Crowd & Kids Interaction', 'Dance & Photo Performance']
  },
  {
    title: 'Tent & Chairs',
    subtitle: 'Canopy, shamiana & event seating',
    imgClass: 'pkg-img-8',
    features: ['Wedding Canopy & Luxury Chairs', 'Baby Shower Seating Setup', 'Birthday Party Seating', 'All Event Tent & Shamiana Setup']
  }
];

const Packages = () => {
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'travel'
  const [showBooking, setShowBooking] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const displayedPackages = showMore ? allPackages : allPackages.slice(0, 3);

  return (
    <section className="section" id="packages">
      <div className="section-header">
        <span className="section-tag">Our Services</span>
        <h2>{activeTab === 'events' ? 'Premium Event Packages' : 'Tour & Travel Packages'}</h2>
        <p>Explore our carefully curated packages designed to make your celebrations and trips truly unforgettable.</p>
      </div>

      <div className="pkg-category-switch">
        <button 
          className={`pkg-switch-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          🎉 Event Packages
        </button>
        <button 
          className={`pkg-switch-btn ${activeTab === 'travel' ? 'active' : ''}`}
          onClick={() => setActiveTab('travel')}
        >
          ✈️ Travel Packages
        </button>
      </div>

      {activeTab === 'events' ? (
        <>
          <div className="packages-grid">
            {displayedPackages.map((pkg, idx) => (
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

          <div className="load-more-container">
            <button className="btn-load-more" onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show Less Packages ↑' : 'View More Packages ↓'}
            </button>
            <p className="custom-pkg-note">
              Looking for custom requirements? We continuously add and tailor packages to your budget!
            </p>
          </div>
        </>
      ) : (
        <TravelPackages />
      )}

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
