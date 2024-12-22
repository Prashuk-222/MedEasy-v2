import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignUp from "../src/app/(auth)/SignUp.tsx"
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SignUp />
  </React.StrictMode>
);

reportWebVitals();