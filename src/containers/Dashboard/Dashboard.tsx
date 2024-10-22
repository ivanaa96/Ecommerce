import React, { useEffect } from 'react';

import ProductList from 'components/product-list';
import { useProducts, useGetProducts } from 'store/products/selectors';

function Dashboard() {
  const getProducts = useGetProducts();
  const products = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  //TODO: add loading component

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default Dashboard;
