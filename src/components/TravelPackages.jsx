import { useState } from 'react';
import './TravelPackages.css';

const travelPackages = [
  {
    id: 1,
    title: 'Kodaikanal Tour',
    badge: '2 Days / 1 Night',
    subtitle: '⛰️ Hill Station Experience',
    img: '/images/tr1.png',
    days: [
      {
        title: 'DAY 1',
        items: [
          'Freshup & Check In Hotel',
          'Bryant Park & Coakers Walk',
          'Kodai Lake & Shopping',
          'Campfire with DJ 🎵'
        ]
      },
      {
        title: 'DAY 2',
        items: [
          'Moir Point & Pine Forest',
          'Pillar Rock & Guna Cave'
        ]
      }
    ],
    inclusions: null
  },
  {
    id: 2,
    title: 'Ooty Tour',
    badge: '2 Days / 1 Night',
    subtitle: '🌿 Queen of Hill Stations',
    img: '/images/tr2.png',
    days: [
      {
        title: 'DAY 1',
        items: [
          'Freshup & Check In Hotel',
          'Rose Garden & Tea Factory',
          'Botanical Garden & Campfire 🔥'
        ]
      },
      {
        title: 'DAY 2',
        items: [
          'Pykara Lake & Shooting Point',
          'Pine Forest & Doddabetta Peak'
        ]
      }
    ],
    inclusions: null
  },
  {
    id: 3,
    title: 'Vagamon + Kochi Tour',
    badge: '3 Days / 2 Nights',
    subtitle: '🌊 Kerala Adventure Package',
    img: '/images/tr3.png',
    days: [
      {
        title: 'DAY 1 – VAGAMON',
        items: [
          'Pine Forest & Jeep Safari',
          'Vagamon Falls & Tiger View Point',
          'Campfire & Night Stay'
        ]
      },
      {
        title: 'DAY 2 – VARKALA',
        items: [
          'Kappil Beach & Varkala Beach',
          'Walking Street & Night Stay'
        ]
      },
      {
        title: 'DAY 3 – KOCHI',
        items: [
          'Fort Kochi & Lulu Mall',
          'Vypin Beach & DJ Boating 🛥️'
        ]
      }
    ],
    inclusions: [
      'Tour Guide',
      '54 Seater Vehicle with DJ Lights',
      '9 Times Food (6 Non-Veg)',
      'Adventure Jeep Safari (Off Road)',
      'Campfire & All Entry Fees'
    ]
  }
];

const TravelPackages = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTour, setSelectedTour] = useState('');

  const handleBook = (tourTitle) => {
    setSelectedTour(tourTitle);
    setShowBooking(true);
  };

  return (
    <section className="section" id="travel-packages">
      <div className="section-header">
        <span className="section-tag">Tour & Travel Packages</span>
        <h2>Explore Beautiful Destinations</h2>
        <p>Unforgettable travel packages with transport, DJ campfire, stays & guidance included.</p>
      </div>

      <div className="travel-grid">
        {travelPackages.map((tour) => (
          <div className="travel-card" key={tour.id}>
            <div className="travel-img-header" style={{ backgroundImage: `url(${tour.img})` }}>
              <span className="travel-badge">{tour.badge}</span>
            </div>

            <div className="travel-card-body">
              <h3 className="travel-title">{tour.title}</h3>
              <p className="travel-subtitle">{tour.subtitle}</p>

              <div className="travel-itinerary">
                {tour.days.map((day, dIdx) => (
                  <div className="day-block" key={dIdx}>
                    <span className="day-tag">{day.title}</span>
                    <ul>
                      {day.items.map((item, iIdx) => (
                        <li key={iIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {tour.inclusions && (
                <div className="travel-inclusions-box">
                  <h4 className="inclusions-title">INCLUSIONS</h4>
                  <ul>
                    {tour.inclusions.map((inc, incIdx) => (
                      <li key={incIdx}>✅ {inc}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="travel-card-footer">
                <div className="call-us-price">
                  <span>Call Us</span> <small>for price</small>
                </div>
                <button className="btn-travel-book" onClick={() => handleBook(tour.title)}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showBooking && (
        <div className="booking-popup-overlay">
          <div className="booking-popup">
            <button className="close-btn" onClick={() => setShowBooking(false)}>×</button>
            <h3>Parthi Events & Travels</h3>
            <p className="booking-subtitle">Booking Details {selectedTour && `- ${selectedTour}`}</p>
            <form className="booking-form" onSubmit={(e) => { e.preventDefault(); alert(`Booking Request Submitted for ${selectedTour || 'Travel Package'}!`); setShowBooking(false); }}>
              <input type="text" placeholder="Name" required />
              <input type="text" placeholder="Address" required />
              <input type="tel" placeholder="Phone number" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Location" required />
              <textarea placeholder="Tour / Event details" defaultValue={selectedTour ? `Package: ${selectedTour}` : ''} rows="3" required></textarea>
              <button type="submit" className="btn-yellow" style={{ width: '100%', padding: '14px', marginTop: '10px' }}>Submit Booking</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default TravelPackages;
