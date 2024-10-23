import React from 'react';

import ProductList from 'components/product-list';
import { Product } from 'store/products/types';

interface DashboardComponentProps {
  products: Product[];
}

function DashboardComponent({
  products,
}: DashboardComponentProps): JSX.Element {
  return <ProductList products={products} />;
}

export default DashboardComponent;
