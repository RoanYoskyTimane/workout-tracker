import React, { useEffect, useState } from 'react';
import { Activity, Dumbbell, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const stats = [
    { label: 'Total Exercises', value: '24', icon: <Dumbbell size={24} color="var(--primary)" /> },
    { label: 'Active Workouts', value: '3', icon: <Activity size={24} color="var(--success)" /> },
    { label: 'Days Active', value: '12', icon: <Calendar size={24} color="var(--accent)" /> },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-dark)' }}>
          Welcome back, {user?.email?.split('@')[0] || 'Performer'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Here's your performance summary for today.</p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
          >
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: 'var(--white)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</p>
              <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Recent Workouts</h3>
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem 0' }}>
             No recent workouts found. Time to hit the gym!
          </div>
        </div>
        
        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Progress Chart</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '10px', justifyContent: 'center' }}>
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.5 + i * 0.05 }}
                style={{ 
                  width: '30px', 
                  backgroundColor: i === 3 ? 'var(--primary)' : 'var(--primary-light)', 
                  borderRadius: '5px 5px 0 0' 
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
