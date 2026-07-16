import './Gallery.css';

const Gallery = () => {
  return (
    <section className="section-alt" id="gallery">
      <div className="section-header">
        <span className="section-tag">Portfolio</span>
        <h2>Our Recent Events</h2>
        <p>A glimpse into the magical moments we've created for our wonderful clients.</p>
      </div>
      <div className="gallery-grid">
        <div className="gallery-img" style={{ backgroundImage: "url('/images/gallery1.png')" }}></div>
        <div className="gallery-img" style={{ backgroundImage: "url('/images/gallery2.png')" }}></div>
        <div className="gallery-img" style={{ backgroundImage: "url('/images/gallery3.png')" }}></div>
        <div className="gallery-img" style={{ backgroundImage: "url('/images/gallery4.png')" }}></div>
      </div>
    </section>
  );
};
export default Gallery;
