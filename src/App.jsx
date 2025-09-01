// src/app/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './contexts/UserContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider >
      <Router>
        <AppRoutes />
      </Router>
       </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
