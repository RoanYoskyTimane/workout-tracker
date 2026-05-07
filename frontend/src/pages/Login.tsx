import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../lib/api';
import authHeroImg from '../assets/auth-hero.png';
import './Login.css';

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
        <div className="hero-content">
          <div className="hero-logo">
            <Activity size={32} color="var(--primary-light)" />
            <span className="hero-logo-text">KINETIC</span>
          </div>
          <h1 className="hero-title">PRECISION<br />PERFORMANCE</h1>
          <p className="hero-subtitle">The future of human movement is here.</p>
        </div>
      </div>

      <div className="auth-form-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="auth-card"
        >
          <div className="auth-header">
            <div className="auth-tabs">
              <span className="auth-tab active">Login</span>
              <Link to="/register" className="auth-tab">Sign Up</Link>
            </div>
            <h2 className="auth-title">Welcome Back.</h2>
            <p className="auth-description">Enter your credentials to access your performance dashboard.</p>
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
              <div className="password-label-wrapper">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-link">FORGOT?</a>
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

            {error && <p className="error-message">{error}</p>}

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
