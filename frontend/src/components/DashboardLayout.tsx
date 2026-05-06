import React from 'react';
import Navbar from '../components/Navbar';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '0 2rem 2rem 2rem' }}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
