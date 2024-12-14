// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className="main-container">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
