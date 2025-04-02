import React from 'react';
import Dashboard from './Dashboard';
import { ActionProvider } from '@/contexts/ActionContext';

const Index = () => {
  return (
    <ActionProvider>
      <Dashboard />
    </ActionProvider>
  );
};

export default Index;
