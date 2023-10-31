import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div>
      <h1>Welcome to the Form Management System</h1>
      <ul>
        <li><Link to="/form">Form Management</Link></li>
        {/* <li><Link to="/data/view">View Saved Data</Link></li> */}
      </ul>
    </div>
  );
};

export default IndexPage;
