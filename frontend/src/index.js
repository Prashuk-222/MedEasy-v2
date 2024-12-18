import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import HomePage from "../src/app/HomePage.tsx"
import Login from "../src/app/(auth)/Login.tsx"
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <HomePage /> */}
    <Login />
  </React.StrictMode>
);

reportWebVitals();