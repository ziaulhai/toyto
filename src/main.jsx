import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';


import { createBrowserRouter, RouterProvider } from "react-router-dom"; 

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './providers/AuthProvider'; 
import router from './routes/Routes.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        theme="colored"
      />
    </AuthProvider>
  </React.StrictMode>,
);