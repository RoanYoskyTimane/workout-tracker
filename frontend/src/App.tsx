import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Placeholder for protected route */}
        <Route path="/dashboard" element={<div style={{ padding: '2rem' }}><h1>Dashboard</h1><p>Welcome to Kinetic Performance Dashboard!</p></div>} />
      </Routes>
    </Router>
  );
}

export default App;
