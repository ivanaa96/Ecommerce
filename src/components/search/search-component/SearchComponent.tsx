import React from 'react';
import { Box, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

import './search-component.css';
import CategoryFilter from '../category-filter';
import SearchBar from '../search-bar';
import { Category } from 'store/products/types';

interface SearchComponentProps {
  searchTerm: string;
  categories: Category[];
  showCategories: boolean;
  selectedCategory: Category | null;
  onSearch: (searchTerm: string) => void;
  onToggleCategories: () => void;
  searchByCategory: (category: Category) => void;
}

function SearchComponent({
  searchTerm,
  categories,
  showCategories,
  selectedCategory,
  onToggleCategories,
  onSearch,
  searchByCategory,
}: SearchComponentProps): JSX.Element {
  return (
    <Box className="search-container">
      <Box className="search-bar-wrapper">
        {showCategories ? (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            searchByCategory={searchByCategory}
          />
        ) : (
          <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
        )}
        <IconButton onClick={onToggleCategories}>
          <FilterListIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SearchComponent;
