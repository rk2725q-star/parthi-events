import { useState, useEffect, useRef, useCallback } from 'react';
import './Gallery.css';

const galleryItems = [
  // Birthday Category (6 items)
  { id: 1, category: 'Birthday', title: 'Welcome to the Party', src: '/images/bday1.png' },
  { id: 2, category: 'Birthday', title: 'About the Birthday Star', src: '/images/bday2.png' },
  { id: 3, category: 'Birthday', title: 'Birthday Theme', src: '/images/bday3.png' },
  { id: 4, category: 'Birthday', title: 'Decorations & Setup', src: '/images/bday4.png' },
  { id: 5, category: 'Birthday', title: 'Cake Moment', src: '/images/bday5.png' },
  { id: 6, category: 'Birthday', title: 'Photo Highlights', src: '/images/bday6.png' },
  
  // DJ Party Category (3 items)
  { id: 7, category: 'DJ Party', title: 'Stage Setup', src: '/images/dj1.png' },
  { id: 8, category: 'DJ Party', title: 'Crowd Vibe', src: '/images/dj2.png' },
  { id: 9, category: 'DJ Party', title: 'Laser Show', src: '/images/dj3.png' },
  
  // Marriage Category (3 items)
  { id: 10, category: 'Marriage', title: 'Mandapam Decor', src: '/images/mar1.png' },
  { id: 11, category: 'Marriage', title: 'Garlands & Rituals', src: '/images/mar2.png' },
  { id: 12, category: 'Marriage', title: 'Couple Entry', src: '/images/mar3.png' }
];

const GalleryCard = ({ item, index, openViewer }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt calculations (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    });
  };

  return (
    <div 
      className="gallery-3d-card" 
      ref={cardRef}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => openViewer(index)}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title}`}
      onKeyDown={(e) => e.key === 'Enter' && openViewer(index)}
    >
      <div className="card-glass-overlay"></div>
      {!imgError ? (
        <img 
          src={item.src} 
          alt={item.title} 
          loading={index < 4 ? "eager" : "lazy"} 
          decoding="async"
          className="gallery-card-img"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="gallery-placeholder">
          <span className="placeholder-icon">🖼️</span>
          <span className="placeholder-text">{item.title}</span>
        </div>
      )}
      <div className="card-title-layer">
        <span>{item.title}</span>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [viewerIndex, setViewerIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panState, setPanState] = useState({ isPanning: false, startX: 0, startY: 0, x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Birthday', 'DJ Party', 'Marriage'];
  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  // URL Hash Sync
  useEffect(() => {
    const handleHash = () => {
      const match = window.location.hash.match(/#gallery\/(\d+)/);
      if (match) {
        const id = parseInt(match[1]);
        const index = galleryItems.findIndex(i => i.id === id);
        if (index !== -1) setViewerIndex(index);
      } else {
        setViewerIndex(null);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openViewer = useCallback((index) => {
    window.history.pushState(null, '', `#gallery/${galleryItems[index].id}`);
    setViewerIndex(index);
    setZoomLevel(1);
    setPanState({ isPanning: false, startX: 0, startY: 0, x: 0, y: 0 });
  }, []);

  const closeViewer = useCallback(() => {
    window.history.pushState(null, '', window.location.pathname);
    setViewerIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    if (viewerIndex !== null) {
      const nextIdx = (viewerIndex + 1) % galleryItems.length;
      openViewer(nextIdx);
    }
  }, [viewerIndex, openViewer]);

  const prevImage = useCallback(() => {
    if (viewerIndex !== null) {
      const prevIdx = (viewerIndex - 1 + galleryItems.length) % galleryItems.length;
      openViewer(prevIdx);
    }
  }, [viewerIndex, openViewer]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewerIndex === null) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerIndex, closeViewer, nextImage, prevImage]);

  // Body Scroll Lock
  useEffect(() => {
    if (viewerIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [viewerIndex]);

  // Zoom & Pan Logic
  const handleWheel = (e) => {
    if (viewerIndex === null) return;
    setZoomLevel(prev => Math.min(Math.max(1, prev - e.deltaY * 0.01), 4));
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setPanState({ ...panState, isPanning: true, startX: e.clientX - panState.x, startY: e.clientY - panState.y });
    }
  };

  const handleMouseMove = (e) => {
    if (panState.isPanning && zoomLevel > 1) {
      setPanState({ ...panState, x: e.clientX - panState.startX, y: e.clientY - panState.startY });
    }
  };

  const handleMouseUp = () => {
    setPanState({ ...panState, isPanning: false });
  };

  // Mobile Swipe
  const [touchStart, setTouchStart] = useState(null);
  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextImage();
    if (distance < -50) prevImage();
  };

  return (
    <section className="section-alt" id="gallery">
      <div className="section-header">
        <span className="section-tag premium-tag">Exclusive Event Artwork</span>
        <h2>Premium Gallery Showcase</h2>
        <p>Step inside our premium digital exhibition. Hover cards for 3D interactions.</p>
      </div>
      
      <div className="gallery-categories">
        {categories.map(cat => (
          <button 
            key={cat}
            className={`gallery-cat-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-3d-grid">
        {filteredItems.map((item) => {
          const absoluteIndex = galleryItems.findIndex(i => i.id === item.id);
          return <GalleryCard key={item.id} item={item} index={absoluteIndex} openViewer={openViewer} />;
        })}
      </div>

      {viewerIndex !== null && (
        <div 
          className="fullscreen-viewer-overlay" 
          role="dialog" 
          aria-modal="true"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="viewer-controls top-controls">
            <div className="image-counter" aria-live="polite">{viewerIndex + 1} / {galleryItems.length}</div>
            <button className="viewer-close-btn" onClick={closeViewer} aria-label="Close Viewer">×</button>
          </div>

          <button className="viewer-nav-btn prev-btn" onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Previous Image">‹</button>
          
          <div className="viewer-content">
            <img 
              src={galleryItems[viewerIndex].src} 
              alt={galleryItems[viewerIndex].title}
              className="viewer-main-img"
              style={{
                transform: `translate(${panState.x}px, ${panState.y}px) scale(${zoomLevel})`,
                cursor: zoomLevel > 1 ? 'grab' : 'zoom-in'
              }}
              onDoubleClick={() => {
                if(zoomLevel > 1) { setZoomLevel(1); setPanState({...panState, x:0, y:0}); }
                else setZoomLevel(2);
              }}
              draggable="false"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="viewer-placeholder" style={{display: 'none'}}>
               <span style={{fontSize: '48px', marginBottom: '10px'}}>🖼️</span>
               <p style={{fontSize: '20px', fontWeight: 'bold'}}>Artwork Not Available Yet</p>
               <p style={{fontSize: '14px', color: '#888', marginTop: '10px'}}>Please upload {galleryItems[viewerIndex].src}</p>
            </div>
          </div>

          <button className="viewer-nav-btn next-btn" onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Next Image">›</button>

          <div className="thumbnail-strip" role="tablist" aria-label="Image Thumbnails">
            {galleryItems.map((item, idx) => (
              <button 
                key={item.id}
                role="tab"
                aria-selected={idx === viewerIndex}
                aria-label={`View ${item.title}`}
                className={`thumb-btn ${idx === viewerIndex ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); openViewer(idx); }}
              >
                <img src={item.src} alt="" onError={(e) => e.target.src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="%23333"/></svg>'} />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
