import './Reviews.css';

const reviews = [
  { name: 'Arun Kumar', text: 'Parthi Events made our wedding absolutely perfect. The decorations were beyond our expectations!' },
  { name: 'Priya Raj', text: 'Highly professional team. They handled our corporate event flawlessly from start to finish.' },
  { name: 'Sanjay', text: 'Best event planners in Kallakurichi. The theme birthday party for my kid was a huge hit.' }
];

const Reviews = () => {
  return (
    <section className="section" id="reviews">
      <div className="section-header">
        <span className="section-tag">Testimonials</span>
        <h2>What Our Clients Say</h2>
        <p>Real stories from our happy customers.</p>
      </div>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"{r.text}"</p>
            <div className="review-author">
              <div className="review-avatar">{r.name.charAt(0)}</div>
              <div className="review-name">{r.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Reviews;
