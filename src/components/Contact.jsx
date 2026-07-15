import './Contact.css';

const Contact = () => {
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
        <form className="contact-form">
          <input type="text" placeholder="Your Name" className="form-input" />
          <input type="email" placeholder="Your Email" className="form-input" />
          <textarea placeholder="Tell us about your event..." className="form-input" rows="4"></textarea>
          <button type="button" className="btn-yellow w-100">Send Message</button>
        </form>
      </div>
    </section>
  );
};
export default Contact;
