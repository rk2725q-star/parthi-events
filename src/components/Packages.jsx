import './Packages.css';

const packages = [
  {
    title: 'Premium Wedding',
    price: '₹2,50,000',
    subtitle: 'Complete A-Z Wedding Management',
    imgClass: 'pkg-img-1',
    features: ['Stage Decoration', 'Premium Catering', 'Photography & Videography', 'Guest Management']
  },
  {
    title: 'Corporate Gala',
    price: '₹1,00,000',
    subtitle: 'Professional Corporate Event Setup',
    imgClass: 'pkg-img-2',
    features: ['Audio Visual Setup', 'Corporate Stage', 'Buffet Catering', 'Branding']
  },
  {
    title: 'Birthday Extravaganza',
    price: '₹50,000',
    subtitle: 'Themed Birthday Party',
    imgClass: 'pkg-img-3',
    features: ['Theme Decoration', 'Cake & Snacks', 'Entertainment', 'Return Gifts']
  }
];

const Packages = () => {
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
              <div className="pkg-subtitle">{pkg.subtitle}</div>
              
              <div className="inclusions">
                <h4>What's Included</h4>
                {pkg.features.map((feature, i) => (
                  <div className="inclusion-item" key={i}>{feature}</div>
                ))}
              </div>
              
              <div className="pkg-footer">
                <div className="pkg-price">{pkg.price} <span>/ event</span></div>
                <button className="pkg-btn">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
