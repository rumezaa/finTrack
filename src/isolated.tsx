import React from 'react';
import { createRoot } from 'react-dom/client';
import MyAuthPage from './components/MyAuthPage';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<MyAuthPage />);
}
