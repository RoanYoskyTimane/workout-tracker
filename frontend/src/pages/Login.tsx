import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../lib/api';
import authHeroImg from '../assets/auth-hero.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authApi.login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.userDto));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
          <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1 }}>PRECISION<br />PERFORMANCE</h1>
          <p style={{ marginTop: '1rem', opacity: 0.8, fontSize: '1.1rem' }}>The future of human movement is here.</p>
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
              <span style={{ paddingBottom: '0.75rem', borderBottom: '2px solid var(--primary)', fontWeight: 600 }}>Login</span>
              <Link to="/register" style={{ paddingBottom: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Sign Up</Link>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Welcome Back.</h2>
            <p style={{ color: 'var(--text-muted)' }}>Enter your credentials to access your performance dashboard.</p>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="password">Password</label>
                <a href="#" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>FORGOT?</a>
              </div>
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

            {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Authenticating...' : 'Get Started'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="auth-footer">
            By accessing KINETIC, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
