import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormBuilder from './components/FormBuilder';
import ThankYouPage from './components/ThankYou';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<div><h1><center>FormBuilder</center></h1><FormBuilder /></div>} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
