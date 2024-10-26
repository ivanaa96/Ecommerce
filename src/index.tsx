import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './index.css';
import APP_ROUTES from 'api/appRoutes';
import Checkout from 'containers/Checkout';
import Dashboard from 'containers/Dashboard';
import Favorites from 'containers/Favorites';
import Layout from 'containers/Layout';
import Login from 'containers/Login';
import ProductDetails from 'containers/ProductDetails';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={APP_ROUTES.FAVORITES} element={<Favorites />} />
        <Route path={APP_ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
        <Route path={APP_ROUTES.CART} element={<Checkout />} />
        <Route path={APP_ROUTES.HOME} element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}

root.render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
