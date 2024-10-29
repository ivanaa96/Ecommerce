import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { mockProducts } from 'constants/test-constants';
import FavoriteProductsComponent from 'components/favorite-products/FavoriteProducts';

const mockOnNavigate = jest.fn();
const mockOnRemoveFromFavorites = jest.fn();

describe('FavoriteProductsComponent', () => {
  it('renders InfoMessage when there are no favorite products', () => {
    render(
      <FavoriteProductsComponent
        favoriteProducts={[]}
        onNavigate={mockOnNavigate}
        onRemoveFromFavorites={mockOnRemoveFromFavorites}
      />
    );

    expect(
      screen.getByText('You have no favorite products yet. Add some!')
    ).toBeInTheDocument();
  });

  it('renders favorite products when they are available', () => {
    render(
      <FavoriteProductsComponent
        favoriteProducts={mockProducts}
        onNavigate={mockOnNavigate}
        onRemoveFromFavorites={mockOnRemoveFromFavorites}
      />
    );

    expect(screen.getAllByText(/product 1/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/product 2/i)[0]).toBeInTheDocument();
  });

  it('calls onRemoveFromFavorites with the correct product ID when delete button is clicked', () => {
    render(
      <FavoriteProductsComponent
        favoriteProducts={mockProducts}
        onNavigate={mockOnNavigate}
        onRemoveFromFavorites={mockOnRemoveFromFavorites}
      />
    );

    const deleteButton = screen.getAllByLabelText(/delete/i)[0];
    fireEvent.click(deleteButton);

    expect(mockOnRemoveFromFavorites).toHaveBeenCalledTimes(1);
    expect(mockOnRemoveFromFavorites).toHaveBeenCalledWith(mockProducts[0].id);
  });

  it('calls onNavigate when product title is clicked', () => {
    render(
      <FavoriteProductsComponent
        favoriteProducts={mockProducts}
        onNavigate={mockOnNavigate}
        onRemoveFromFavorites={mockOnRemoveFromFavorites}
      />
    );

    fireEvent.click(screen.getByText(mockProducts[0].title));

    expect(mockOnNavigate).toHaveBeenCalledWith(1);
    expect(mockOnNavigate).toHaveBeenCalledWith(mockProducts[0].id);
  });
});
