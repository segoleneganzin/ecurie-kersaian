import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { UserContextProvider } from './context/UserContext';
import './output.css';
import { ThemeProvider } from '@material-tailwind/react';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </UserContextProvider>
  </BrowserRouter>
);
