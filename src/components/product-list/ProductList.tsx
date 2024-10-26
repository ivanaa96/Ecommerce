import React from 'react';
import { Grid2 } from '@mui/material';

import ProductItem from 'containers/ProductItem';
import { Product } from 'store/products/types';

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps): JSX.Element {
  return (
    <div>
      {products && products.length > 0 && (
        <Grid2 container spacing={2}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Grid2>
      )}
    </div>
  );
}

export default ProductList;
