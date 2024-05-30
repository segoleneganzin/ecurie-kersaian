import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { UserContextProvider } from './context/UserContext';
import 'sg-form-lib/style.css';
import './output.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  </BrowserRouter>
);
