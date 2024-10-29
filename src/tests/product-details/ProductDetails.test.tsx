import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { mockProducts } from 'constants/test-constants';
import ProductDetail from 'components/product-details/ProductDetails';

const mockProps = {
  product: mockProducts[0],
  showMoreDetails: true,
  isFavorite: true,
  onAddToCart: jest.fn(),
  onToggleMoreDetails: jest.fn(),
  onToggleFavorite: jest.fn(),
};

describe('ProductDetails', () => {
  it('renders the product details page', () => {
    render(<ProductDetail {...mockProps} />);

    expect(screen.getByText(mockProps.product.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.product.description)).toBeInTheDocument();
  });

  it('renders the Add to Cart button', () => {
    render(<ProductDetail {...mockProps} />);

    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it('calls onAddToCart action when the button is clicked', () => {
    render(<ProductDetail {...mockProps} />);

    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });
    fireEvent.click(addToCartButton);

    expect(mockProps.onAddToCart).toHaveBeenCalledTimes(1);
    expect(mockProps.onAddToCart).toHaveBeenCalledWith(mockProps.product);
  });
});
