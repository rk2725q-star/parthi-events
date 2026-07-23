import { useState } from 'react';
import './GraphicDesigningPackages.css';

const designServices = [
  {
    id: 'flex-printing',
    title: 'Flex Printing',
    icon: '🖨️',
    description: 'High-definition digital flex banner printing for events, birthdays, and shop boards.',
    features: ['Normal & HD Flex', 'Weatherproof Outdoor Quality', 'Custom Sizes & Eyelets', 'Fast Turnaround']
  },
  {
    id: 'star-flex',
    title: 'Star Flex',
    icon: '🌟',
    description: 'Premium glossy star flex printing with vibrant color saturation and high durability.',
    features: ['Heavy Duty Star Flex', 'Glossy / Smooth Finish', 'Long Lasting Outdoor Life', 'Vibrant Color Accuracy']
  },
  {
    id: 'light-board',
    title: 'Light Board Signage',
    icon: '💡',
    description: 'Custom illuminated sign boards for shops, stage backdrops, and event entrances.',
    features: ['Backlit Flex Boards', 'Sturdy Aluminium Frame', 'Energy Efficient Lighting', 'Custom Design Support']
  },
  {
    id: 'photo-frame',
    title: 'Photo Frame',
    icon: '🖼️',
    description: 'Elegant custom photo framing for wedding portraits, family memories, and gift items.',
    features: ['Synthetic & Wooden Frames', 'Non-glare Glass Option', 'Canvas Prints Available', 'Multiple Sizes (8x12 to 24x36)']
  },
  {
    id: 'led-light-frame',
    title: 'LED Light Frame',
    icon: '🔮',
    description: 'Ultra-thin glowing LED backlight photo frames for modern home decor and event display.',
    features: ['Ultra-thin Acrylic Frame', 'Bright Uniform LED Glow', 'Low Power Consumption', 'Easy Image Swapping']
  },
  {
    id: 'stickering',
    title: 'Stickering Services',
    icon: '🎨',
    description: 'Custom vinyl sticker printing, cut-out stickering, and glass/wall decor branding.',
    features: ['Vinyl & Die-cut Stickers', 'Glass & Wall Frosting', 'Waterproof & Scratch Proof', 'Vehicle Branding']
  },
  {
    id: 'invitation-card',
    title: 'Invitation Card',
    icon: '✉️',
    description: 'Beautiful traditional and modern invitation cards for Weddings, Ear Piercing, Puberty & Birthdays.',
    features: ['Custom Graphic Design', 'Gold Foil & Embossing', 'Premium Paper Stocks', 'Matching Envelopes Included']
  },
  {
    id: 'visiting-card',
    title: 'Visiting Card',
    icon: '💳',
    description: 'Professional business cards that leave a lasting impression on your clients.',
    features: ['Matte & Gloss Lamination', 'Spot UV & Metallic Foil', '350 GSM Premium Cardstock', 'Double-sided Printing']
  }
];

const GraphicDesigningPackages = ({ onBookNow }) => {
  return (
    <div className="graphic-design-container">
      {/* Header Banner */}
      <div className="gd-hero-card">
        <div className="gd-hero-overlay"></div>
        <div className="gd-hero-content">
          <span className="gd-tag">🎨 Design & Printing Hub</span>
          <h2>Graphic Designing & Printing Services</h2>
          <p>From event flex banners to luxury wedding invitations and LED light frames — we design and print everything with premium quality!</p>
          
          <div className="gd-provides-bar">
            <span className="provides-label">Services Provided:</span>
            <div className="provides-tags">
              <span>Flex Printing</span>
              <span>Star Flex</span>
              <span>Light Board</span>
              <span>Photo Frame</span>
              <span>LED Light Frame</span>
              <span>Stickering</span>
              <span>Invitation Card</span>
              <span>Visiting Card</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="gd-grid">
        {designServices.map((service) => (
          <div className="gd-card" key={service.id}>
            <div className="gd-card-header">
              <span className="gd-icon">{service.icon}</span>
              <h3>{service.title}</h3>
            </div>
            <p className="gd-desc">{service.description}</p>

            <div className="gd-features">
              <h4>What We Provide</h4>
              <ul>
                {service.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>

            <button className="gd-btn" onClick={onBookNow}>
              Inquire / Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphicDesigningPackages;
