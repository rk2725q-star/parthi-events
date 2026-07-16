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
                <button className="pkg-btn" style={{ width: '100%', padding: '12px' }}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
