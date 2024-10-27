import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ProductItemComponent from 'components/product-item';
import { mockProducts } from 'constants/test-constants';

const mockProps = {
  product: mockProducts[0],
  isFavorite: false,
  onAddToCart: jest.fn(),
  onToggleFavorite: jest.fn(),
};

describe('ProductItemComponent', () => {
  it('renders the product item', () => {
    render(
      <MemoryRouter>
        <ProductItemComponent {...mockProps} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockProps.product.title)).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: mockProps.product.title })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProps.product.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it('calls onAddToCart when Add to Cart button is clicked', () => {
    render(
      <MemoryRouter>
        <ProductItemComponent {...mockProps} />
      </MemoryRouter>
    );

    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });

    fireEvent.click(addToCartButton);

    expect(mockProps.onAddToCart).toHaveBeenCalledWith(mockProps.product);
    expect(mockProps.onAddToCart).toHaveBeenCalledTimes(1);
  });
});
