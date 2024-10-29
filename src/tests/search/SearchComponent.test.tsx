import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { mockCategories } from 'constants/test-constants';
import SearchComponent from 'components/search/search-component';

const mockProps = {
  searchTerm: '',
  categories: mockCategories,
  showCategories: false,
  selectedCategory: null,
  onSearch: jest.fn(),
  onToggleCategories: jest.fn(),
  searchByCategory: jest.fn(),
};

describe('SearchComponent', () => {
  it('renders the SearchBar component when categories are not shown', () => {
    render(<SearchComponent {...mockProps} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the CategoryFilter when categories are shown', () => {
    const categories = mockProps.categories;
    render(<SearchComponent {...{ ...mockProps, showCategories: true }} />);

    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('calls onSearch when searchTerm is submitted', () => {
    render(<SearchComponent {...mockProps} />);

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockProps.onSearch).toHaveBeenCalledWith('test');
  });

  it('calls onToggleCategories when the filter icon is clicked', () => {
    render(<SearchComponent {...mockProps} />);

    const toggleButton = screen.getByRole('button', {
      name: /toggle categories/i,
    });
    fireEvent.click(toggleButton);

    expect(mockProps.onToggleCategories).toHaveBeenCalledTimes(1);
  });

  it('calls searchByCategory when a category is selected', () => {
    render(<SearchComponent {...{ ...mockProps, showCategories: true }} />);

    const categoryButton = screen.getByText(mockCategories[0].name);
    fireEvent.click(categoryButton);

    expect(mockProps.searchByCategory).toHaveBeenCalledWith(mockCategories[0]);
    expect(mockProps.searchByCategory).toHaveBeenCalledTimes(1);
  });
});
