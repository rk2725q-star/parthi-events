import { useState } from 'react';
import './Reviews.css';

const initialReviews = [
  { name: 'Saravana', location: 'Karur', rating: 5, text: 'Parthi Events made our wedding absolutely perfect. The decorations were beyond our expectations!', image: null },
  { name: 'Santhosh', location: 'Kallakurichi', rating: 5, text: 'Highly professional team. They handled our corporate event flawlessly from start to finish.', image: null },
  { name: 'Ranjith', location: 'Dindigul', rating: 5, text: 'Best event planners in Kallakurichi. The theme birthday party for my kid was a huge hit.', image: null },
  { name: 'Karthik', location: 'Salem', rating: 4, text: 'Great photography and stage decor. Slightly delayed on catering, but overall a fantastic experience.', image: null },
  { name: 'Priya', location: 'Erode', rating: 5, text: 'The DJ party setup was insane! Best lighting and sound system we could have asked for.', image: null }
];

const Reviews = () => {
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  
  const [newReview, setNewReview] = useState({ name: '', location: '', text: '', rating: 0, image: null });
  const [hoverRating, setHoverRating] = useState(0);
  const [filterRating, setFilterRating] = useState('All');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReview({ ...newReview, image: reader.result, file: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert("Please select a star rating!");
      return;
    }
    
    setIsSubmitting(true);
    setStatus('');

    const formData = new FormData();
    formData.append('_subject', 'New Review Submitted - Parthi Events');
    formData.append('Name', newReview.name);
    formData.append('Location', newReview.location);
    formData.append('Rating', newReview.rating + ' Stars');
    formData.append('Comments', newReview.text);
    if (newReview.file) {
      formData.append('Attachment', newReview.file);
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/parthithala350@gmail.com", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setStatus('Review sent to owner for approval!');
        // Keep it in local state just for immediate feedback on screen
        setReviewsList([newReview, ...reviewsList]);
        setTimeout(() => {
          setShowWriteModal(false);
          setNewReview({ name: '', location: '', text: '', rating: 0, image: null, file: null });
          setStatus('');
        }, 2000);
      } else {
        setStatus('Failed to send review. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    }
    setIsSubmitting(false);
  };

  const filteredReviews = filterRating === 'All' 
    ? reviewsList 
    : reviewsList.filter(r => r.rating === filterRating);

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section className="section" id="reviews">
      <div className="section-header">
        <span className="section-tag">Testimonials</span>
        <h2>What Our Clients Say</h2>
        <p>Real stories from our happy customers.</p>
      </div>
      <div className="reviews-grid">
        {reviewsList.slice(0, 3).map((r, i) => (
          <div className="review-card" key={i}>
            <div className="review-stars">{renderStars(r.rating)}</div>
            <p className="review-text">"{r.text}"</p>
            {r.image && <img src={r.image} alt="Review" className="review-img-preview" />}
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

      <div className="reviews-actions">
        <button className="btn-outline-white" onClick={() => setShowWriteModal(true)}>Write a Review</button>
        <button className="btn-yellow" onClick={() => setShowAllModal(true)}>View All Reviews</button>
      </div>

      {showWriteModal && (
        <div className="booking-popup-overlay">
          <div className="booking-popup review-popup">
            <button className="close-btn" onClick={() => setShowWriteModal(false)}>×</button>
            <h3>Write a Review</h3>
            <p className="booking-subtitle">Share your experience with Parthi Events</p>
            <form className="booking-form" onSubmit={submitReview}>
              
              <div className="star-rating-input">
                {[1, 2, 3, 4, 5].map(star => (
                  <span 
                    key={star}
                    className={`star ${star <= (hoverRating || newReview.rating) ? 'active' : ''}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setNewReview({...newReview, rating: star})}
                  >★</span>
                ))}
              </div>

              <input type="text" placeholder="Your Name" required value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} />
              <input type="text" placeholder="Location (e.g. Kallakurichi)" required value={newReview.location} onChange={e => setNewReview({...newReview, location: e.target.value})} />
              <textarea placeholder="Your Comments..." rows="4" required value={newReview.text} onChange={e => setNewReview({...newReview, text: e.target.value})}></textarea>
              
              <div className="file-upload-wrapper">
                <label className="file-upload-label">
                  📸 Upload an Image (Optional)
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                </label>
                {newReview.image && <div className="img-preview-small">Image attached!</div>}
              </div>

              <button type="submit" className="btn-yellow" style={{ width: '100%', marginTop: '10px' }} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
              {status && (
                <p style={{ marginTop: '10px', color: status.includes('approval') ? '#4ade80' : '#f87171', fontSize: '14px', textAlign: 'center' }}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {showAllModal && (
        <div className="booking-popup-overlay">
          <div className="booking-popup all-reviews-popup">
            <button className="close-btn" onClick={() => setShowAllModal(false)}>×</button>
            <h3>All Reviews</h3>
            
            <div className="review-filters">
              {['All', 5, 4, 3, 2, 1].map(f => (
                <button 
                  key={f} 
                  className={`filter-btn ${filterRating === f ? 'active' : ''}`}
                  onClick={() => setFilterRating(f)}
                >
                  {f === 'All' ? 'All' : `${f} Stars`}
                </button>
              ))}
            </div>

            <div className="all-reviews-list">
              {filteredReviews.length > 0 ? filteredReviews.map((r, i) => (
                <div className="review-card list-card" key={i}>
                  <div className="review-stars">{renderStars(r.rating)}</div>
                  <p className="review-text">"{r.text}"</p>
                  {r.image && <img src={r.image} alt="Review" className="review-img-preview" />}
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
              )) : (
                <p className="no-reviews">No reviews found for this rating.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
