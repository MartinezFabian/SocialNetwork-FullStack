import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import { App } from './App';
import { AuthProvider } from './context/AuthContext';

// Create a client for Tanstack / React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App></App>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
