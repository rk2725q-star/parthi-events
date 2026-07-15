const Footer = () => {
  return (
    <footer style={{ background: 'var(--navy)', color: 'var(--text-muted)', padding: '60px 32px 30px', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div className="brand-logo" style={{ pointerEvents: 'none' }}>
          <div className="brand-name">
            PARTH<span className="brand-i">I<span className="brand-flame"></span></span>
          </div>
          <div className="brand-sub">EVENT'S</div>
        </div>
      </div>
      <p style={{ fontSize: '15px', marginBottom: '30px' }}>Making your events memorable since day one.</p>
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '30px', fontSize: '13px' }}>
        &copy; {new Date().getFullYear()} Parthi Events. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
