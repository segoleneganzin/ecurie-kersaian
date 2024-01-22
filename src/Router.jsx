import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Admin from './pages/Admin';
import EquestrianCenter from './pages/EquestrianCenter';
import Pension from './pages/Pension';
import Breeding from './pages/Breeding';

const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      {/* Equestrian center */}
      <Route path='/centre-equestre' element={<EquestrianCenter />} />
      {/* Pension */}
      <Route path='/pension' element={<Pension />} />
      {/* Breeding */}
      <Route path='/elevage-de-freol' element={<Breeding />} />
      {/* Administration */}
      <Route path='/admin' element={<Admin />} />
      {/* NotFound */}
      <Route path='*' element={<Home />} />
    </Routes>
  );
};

export default Router;
