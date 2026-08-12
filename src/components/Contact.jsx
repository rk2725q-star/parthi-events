import { useState } from 'react';
import { supabase } from '../utils/supabase';
import './Contact.css';

const Contact = () => {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // 1. Save to Supabase Dashboard
      const { error: dbError } = await supabase.from('messages').insert([{
        name: data.name,
        email: data.email,
        message: data.message
      }]);

      if (dbError) {
        console.error("Supabase message insert error:", dbError);
      }

      // 2. Send Email Backup via FormSubmit
      const response = await fetch("https://formsubmit.co/ajax/parthithala350@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: "New Contact Request - Parthi Events",
            Name: data.name,
            Email: data.email,
            Message: data.message
        })
      });

      if (response.ok) {
        setStatus('Message sent successfully! We will contact you soon.');
        e.target.reset();
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <section className="section-alt" id="contact">
      <div className="section-header">
        <span className="section-tag">Get In Touch</span>
        <h2>Contact Parthi Events</h2>
        <p>Ready to plan your next big event? Let's talk.</p>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Reach Us At</h3>
          <p><strong>Phone:</strong> <a href="tel:+919788966227">+91 9788966227</a></p>
          <p><strong>Email:</strong> <a href="mailto:parthithala350@gmail.com">parthithala350@gmail.com</a></p>
          <p><strong>Location:</strong> Kallakurichi, Tamil Nadu</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" className="form-input" required />
          <input type="email" name="email" placeholder="Your Email" className="form-input" required />
          <textarea name="message" placeholder="Tell us about your event..." className="form-input" rows="4" required></textarea>
          
          <button type="submit" className="btn-yellow w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          
          {status && (
            <p style={{ marginTop: '15px', color: status.includes('successfully') ? '#4ade80' : '#f87171', fontSize: '14px', textAlign: 'center' }}>
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
export default Contact;
