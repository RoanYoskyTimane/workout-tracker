import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Activity, Dumbbell, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { to: '/exercises', label: 'Exercises', icon: <Dumbbell size={20} /> },
    { to: '/workouts', label: 'Workouts', icon: <Activity size={20} /> },
  ];

  return (
    <nav className="glass" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '1rem',
      borderRadius: 'var(--radius-md)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
        <Activity size={28} color="var(--primary)" />
        <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--text-dark)' }}>KINETIC</span>
      </div>

      {/* Desktop Links */}
      <div style={{ display: 'none', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 600,
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              transition: 'var(--transition)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: isActive ? 'rgba(129, 166, 198, 0.1)' : 'transparent'
            })}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
        
        <button 
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600,
            color: 'var(--error)',
            padding: '0.5rem 1rem',
            background: 'transparent',
            borderRadius: 'var(--radius-sm)',
            transition: 'var(--transition)'
          }}
          className="logout-btn"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        style={{ display: 'none', background: 'transparent', color: 'var(--text-dark)' }} 
        className="mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '0.5rem',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'rgba(129, 166, 198, 0.1)' : 'transparent',
                  borderRadius: 'var(--radius-sm)'
                })}
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
            <button 
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                fontWeight: 600,
                color: 'var(--error)',
                background: 'transparent',
                textAlign: 'left'
              }}
            >
              <LogOut size={20} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .mobile-toggle { display: block !important; }
        }
        .logout-btn:hover {
          background-color: rgba(225, 112, 85, 0.1) !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
