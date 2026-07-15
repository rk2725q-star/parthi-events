import './Reviews.css';

const reviews = [
  { name: 'Saravana', location: 'Karur', text: 'Parthi Events made our wedding absolutely perfect. The decorations were beyond our expectations!' },
  { name: 'Santhosh', location: 'Kallakurichi', text: 'Highly professional team. They handled our corporate event flawlessly from start to finish.' },
  { name: 'Ranjith', location: 'Dindigul', text: 'Best event planners in Kallakurichi. The theme birthday party for my kid was a huge hit.' }
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
              <div className="review-info">
                <div className="review-name">{r.name}</div>
                <div className="review-location">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {r.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Reviews;
