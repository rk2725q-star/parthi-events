import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Packages from './components/Packages';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <Header setCurrentPage={setCurrentPage} />
      
      {currentPage === 'packages' && (
        <div style={{ paddingTop: '40px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Packages />
          <div style={{ textAlign: 'center', marginBottom: '80px', marginTop: '20px' }}>
            <button className="btn-yellow" style={{ padding: '14px 40px', fontSize: '16px' }} onClick={() => setCurrentPage('home')}>
              ← Back to Home
            </button>
          </div>
        </div>
      )}

      {currentPage === 'gallery' && (
        <div style={{ paddingTop: '40px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Gallery />
          <div style={{ textAlign: 'center', marginBottom: '80px', marginTop: '20px' }}>
            <button className="btn-yellow" style={{ padding: '14px 40px', fontSize: '16px' }} onClick={() => setCurrentPage('home')}>
              ← Back to Home
            </button>
          </div>
        </div>
      )}

      {currentPage === 'home' && (
        <>
          <Hero setCurrentPage={setCurrentPage} />
          <Reviews />
          <Contact />
        </>
      )}

      <Footer />
    </>
  )
}

export default App;
