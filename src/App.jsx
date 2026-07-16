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
  const [showPackages, setShowPackages] = useState(false);

  return (
    <>
      <Header setShowPackages={setShowPackages} />
      
      {showPackages ? (
        <div style={{ paddingTop: '40px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Packages />
          <div style={{ textAlign: 'center', marginBottom: '80px', marginTop: '20px' }}>
            <button className="btn-yellow" style={{ padding: '14px 40px', fontSize: '16px' }} onClick={() => setShowPackages(false)}>
              ← Back to Home
            </button>
          </div>
        </div>
      ) : (
        <>
          <Hero setShowPackages={setShowPackages} />
          <Gallery />
          <Reviews />
          <Contact />
        </>
      )}

      <Footer />
    </>
  )
}

export default App;
