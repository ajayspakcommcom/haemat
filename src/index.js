import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css'
import LoginContextProvider from './Context/Provider/LoginContextProvider';
import ProductContextProvider from './Context/Provider/ProductContextProvider';
import { checkUrlAndRunCommand } from './Service/Common';

const rootElem = document.getElementById('root');
const isDashboard = checkUrlAndRunCommand("http://localhost:3000/user-dashboard", 'user-dashboard');

isDashboard && rootElem.classList.add('root-dashboard');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <LoginContextProvider>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </LoginContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
