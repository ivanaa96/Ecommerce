import React from 'react';
import { Grid2, Typography } from '@mui/material';

import './product-list.css';
import ProductItem from 'components/product-item';
import { Product } from 'store/products/types';

interface ProductListProps {
  products: Product[] | null;
}

function ProductList({ products }: ProductListProps): JSX.Element {
  return (
    <div className="product-list-wrapper">
      {products && products.length > 0 ? (
        <div className="grid-container">
          <Grid2
            container
            spacing={2}
            columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
            className="products-grid"
          >
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Grid2>
        </div>
      ) : (
        <Typography variant="body1">No products available.</Typography>
      )}
    </div>
  );
}

export default ProductList;
