import { useState } from 'react';
import { supabase } from '../utils/supabase';
import './AuthModal.css';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer'); // 'customer' or 'owner'
  const [secretCode, setSecretCode] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (isLogin) {
      // Login flow
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        onClose(); // Close modal on success
      }
    } else {
      // Signup flow
      if (role === 'owner' && secretCode !== 'PARTHI_ADMIN_2026') {
        setError("Invalid Owner Secret Code!");
        setLoading(false);
        return;
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role
          }
        }
      });

      if (authError) {
        setError(authError.message);
      } else if (data.user) {
        setMessage("Signup successful! You can now log in.");
        setIsLogin(true); // Switch to login view
      }
    }
    setLoading(false);
  };

  return (
    <div className="booking-popup-overlay">
      <div className="booking-popup auth-popup">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
        <p className="booking-subtitle">
          {isLogin ? 'Login to continue' : 'Join Parthi Events'}
        </p>

        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}

        <form className="booking-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
              <div className="role-selector">
                <label>
                  <input 
                    type="radio" 
                    name="role" 
                    value="customer" 
                    checked={role === 'customer'} 
                    onChange={() => setRole('customer')}
                  /> Customer
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="role" 
                    value="owner" 
                    checked={role === 'owner'} 
                    onChange={() => setRole('owner')}
                  /> Event Owner
                </label>
              </div>

              {role === 'owner' && (
                <input 
                  type="password" 
                  placeholder="Owner Secret Code" 
                  value={secretCode} 
                  onChange={(e) => setSecretCode(e.target.value)} 
                  required 
                />
              )}
            </>
          )}

          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          <button type="submit" className="btn-yellow" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}>
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
