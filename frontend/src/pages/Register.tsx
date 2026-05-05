import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Activity, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../lib/api';
import authHeroImg from '../assets/auth-hero.png';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await authApi.register({ email, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-hero">
        <img src={authHeroImg} alt="Kinetic Performance" />
        <div className="auth-hero-overlay"></div>
        <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Activity size={32} color="var(--primary-light)" />
            <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '0.1em' }}>KINETIC</span>
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1 }}>JOIN THE<br />REVOLUTION</h1>
          <p style={{ marginTop: '1rem', opacity: 0.8, fontSize: '1.1rem' }}>Start tracking your progress with precision.</p>
        </div>
      </div>

      <div className="auth-form-section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="auth-card"
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid #E0E0E0' }}>
              <Link to="/login" style={{ paddingBottom: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Login</Link>
              <span style={{ paddingBottom: '0.75rem', borderBottom: '2px solid var(--primary)', fontWeight: 600 }}>Sign Up</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Create Account.</h2>
            <p style={{ color: 'var(--text-muted)' }}>Join our elite community of performers.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input 
                  id="email"
                  type="email" 
                  placeholder="name@kinetic.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input 
                  id="password"
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input 
                  id="confirmPassword"
                  type="password" 
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="auth-footer">
            By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
