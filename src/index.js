import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserLoginContextStore from './contexts/UserLoginContextStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductStore from './contexts/ProductStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserLoginContextStore>
      <ProductStore>
        <App />
      </ProductStore>
    </UserLoginContextStore>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
