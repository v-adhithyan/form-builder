import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div>
      <h1>Thank You!</h1>
      <p><Link to="/">Home</Link></p>
    </div>
  );
};

export default ThankYouPage;
