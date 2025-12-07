import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const app = (
  <AuthProvider>
    <App />
  </AuthProvider>
);

root.render(app);