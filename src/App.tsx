/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { Home } from './pages/Home';
import { Dealer } from './pages/Dealer';
import { PropertiesPage } from './pages/PropertiesPage';
import { AdminDashboard } from './AdminDashboard';
import { DataProvider } from './lib/DataContext';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="dealer" element={<Dealer />} />
            <Route path="properties" element={<PropertiesPage />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
