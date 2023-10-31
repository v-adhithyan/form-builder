import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/index';
import FormBuilder from './components/FormBuilder';  
import FormList  from './components/FormList';
import NewForm from './components/NewForm';
import ThankYouPage from './components/ThankYou';
import PublicForm from './components/PublicForn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/form/build/:id" element={<FormBuilder />} />
        <Route path="/form" element={<FormList />} />
        <Route path="/form/new" element={<NewForm />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/public/form/:uuid" element={<PublicForm />} />
      </Routes>
    </Router>
  );
}

export default App;
