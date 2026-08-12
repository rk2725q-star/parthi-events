import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';
import './Gallery.css';

const GalleryCard = React.memo(({ item, index, openViewer }) => {
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
          src={item.image_url} 
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
});

const Gallery = () => {
  const { profile } = useAuth();
  const [galleryItems, setGalleryItems] = useState([]);
  
  const [viewerIndex, setViewerIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panState, setPanState] = useState({ isPanning: false, startX: 0, startY: 0, x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 20;

  const categories = ['All', 'Birthday', 'DJ Party', 'Marriage'];
  
  useEffect(() => {
    // Reset when component mounts
    setPage(0);
    setGalleryItems([]);
    setHasMore(true);
    fetchGallery(0);
  }, []);

  const fetchGallery = async (pageIndex = 0) => {
    const from = pageIndex * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);
      
    if (data) {
      if (pageIndex === 0) {
        setGalleryItems(data);
      } else {
        setGalleryItems(prev => [...prev, ...data]);
      }
      
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
    }
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchGallery(next);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(filePath, file);

    if (uploadError) {
      setUploadError(uploadError.message);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(filePath);

    // Insert to DB
    const title = prompt("Enter title for this photo:", "New Event Photo") || "Event Photo";
    const cat = activeCategory === 'All' ? 'Birthday' : activeCategory;

    const { error: dbError } = await supabase.from('gallery').insert([
      { title, category: cat, image_url: publicUrl }
    ]);

    if (dbError) {
      setUploadError(dbError.message);
    } else {
      fetchGallery(); // Refresh images
    }
    
    setUploading(false);
  };

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

      {/* TEMPORARY FIX BUTTON: REMOVE BEFORE LAUNCH */}
      {profile && profile.role !== 'owner' && (
        <div style={{ textAlign: 'center', marginBottom: '20px', padding: '15px', background: '#450a0a', border: '1px solid #ef4444', borderRadius: '8px' }}>
          <p style={{ color: '#fca5a5', marginBottom: '10px' }}>Admin Quick Fix: Click below to force your account to become an Owner.</p>
          <button 
            className="btn-yellow" 
            onClick={async () => {
              const { error } = await supabase.from('profiles').update({ role: 'owner' }).eq('id', profile.id);
              if (error) alert("Error: " + error.message);
              else {
                alert("Success! You are now an Owner. Please refresh the page!");
                window.location.reload();
              }
            }}
          >
            Fix My Account (Make Me Owner)
          </button>
        </div>
      )}

      {profile?.role === 'owner' && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <label className="btn-yellow" style={{ cursor: 'pointer', padding: '10px 20px', display: 'inline-block' }}>
            {uploading ? 'Uploading...' : '📸 Upload Photo'}
            <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleUpload} disabled={uploading} />
          </label>
          {uploadError && <p style={{ color: '#f87171', marginTop: '10px' }}>{uploadError}</p>}
        </div>
      )}

      <div className="gallery-3d-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const absoluteIndex = galleryItems.findIndex(i => i.id === item.id);
            return <GalleryCard key={item.id} item={item} index={absoluteIndex} openViewer={openViewer} />;
          })
        ) : (
          <div className="gallery-empty-state">
            <span className="empty-icon">📁</span>
            <h3>No Photos Uploaded Yet</h3>
            <p>Upload artwork to feature under {activeCategory === 'All' ? 'this gallery' : `the ${activeCategory} category`}.</p>
          </div>
        )}
      </div>

      {hasMore && filteredItems.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn-outline-white" onClick={loadMore}>
            Load More Photos
          </button>
        </div>
      )}

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
              src={galleryItems[viewerIndex].image_url} 
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
               <p style={{fontSize: '14px', color: '#888', marginTop: '10px'}}>Please upload {galleryItems[viewerIndex].image_url}</p>
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
                <img src={item.image_url} alt="" onError={(e) => e.target.src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="%23333"/></svg>'} />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
