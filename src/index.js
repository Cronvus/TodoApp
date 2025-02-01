import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './components/App/App';

const app = document.getElementById('body');
const todoapp = createRoot(app);

todoapp.render(<App />);
