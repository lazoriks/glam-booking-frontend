// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingFlow from './components/BookingFlow';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingFlow />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;