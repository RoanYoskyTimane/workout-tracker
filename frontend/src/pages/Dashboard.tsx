import React, { useEffect, useState } from 'react';
import { Activity, Dumbbell, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import './Dashboard.css';

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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>
          Welcome back, {user?.email?.split('@')[0] || 'Performer'}
        </h1>
        <p>Here's your performance summary for today.</p>
      </header>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass stat-card"
          >
            <div className="stat-icon-wrapper">
              {stat.icon}
            </div>
            <div>
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="content-grid">
        <div className="glass content-card">
          <h3>Recent Workouts</h3>
          <div className="empty-state">
             No recent workouts found. Time to hit the gym!
          </div>
        </div>
        
        <div className="glass content-card">
          <h3>Progress Chart</h3>
          <div className="chart-container">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="chart-bar"
                style={{ 
                  backgroundColor: i === 3 ? 'var(--primary)' : 'var(--primary-light)', 
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
