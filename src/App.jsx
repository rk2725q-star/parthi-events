import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Packages from './components/Packages';
import TravelPackages from './components/TravelPackages';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <AuthProvider>
      <Header setCurrentPage={setCurrentPage} />
      
      {currentPage === 'packages' && (
        <div style={{ paddingTop: '40px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Packages setCurrentPage={setCurrentPage} />
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

      {currentPage === 'admin' && (
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <AdminDashboard />
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
    </AuthProvider>
  )
}

export default App;
