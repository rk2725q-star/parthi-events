import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';
import './Reviews.css';

const Reviews = () => {
  const { user } = useAuth();
  const [reviewsList, setReviewsList] = useState([]);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  
  const [newReview, setNewReview] = useState({ name: '', location: '', text: '', rating: 0, image: null, file: null });
  const [hoverRating, setHoverRating] = useState(0);
  const [filterRating, setFilterRating] = useState('All');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 20;

  useEffect(() => {
    // Reset on mount
    setPage(0);
    setReviewsList([]);
    setHasMore(true);
    fetchReviews(0);
  }, []);

  const fetchReviews = async (pageIndex = 0) => {
    const from = pageIndex * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (data) {
      if (pageIndex === 0) {
        setReviewsList(data);
      } else {
        setReviewsList(prev => [...prev, ...data]);
      }

      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
    }
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchReviews(next);
  };

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
    if (!user) {
      alert("Please log in to write a review!");
      return;
    }
    if (newReview.rating === 0) {
      alert("Please select a star rating!");
      return;
    }
    
    setIsSubmitting(true);
    setStatus('');

    let imageUrl = null;

    try {
      if (newReview.file) {
        const fileExt = newReview.file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('reviews-images')
          .upload(fileName, newReview.file);
          
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('reviews-images')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }

      const { error: dbError } = await supabase.from('reviews').insert([{
        user_id: user.id,
        name: newReview.name,
        location: newReview.location,
        rating: newReview.rating,
        text: newReview.text,
        image_url: imageUrl
      }]);

      if (dbError) throw dbError;

      setStatus('Review submitted successfully!');
      fetchReviews();
      
      setTimeout(() => {
        setShowWriteModal(false);
        setNewReview({ name: '', location: '', text: '', rating: 0, image: null, file: null });
        setStatus('');
      }, 2000);

    } catch (error) {
      setStatus('Failed to submit review: ' + error.message);
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
            {r.image_url && <img src={r.image_url} alt="Review" className="review-img-preview" />}
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
                  {r.image_url && <img src={r.image_url} alt="Review" className="review-img-preview" />}
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
              
              {hasMore && filteredReviews.length > 0 && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <button className="btn-outline-white" onClick={loadMore}>
                    Load More Reviews
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
