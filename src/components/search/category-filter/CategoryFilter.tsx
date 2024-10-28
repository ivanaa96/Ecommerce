import React from 'react';
import { Box, Chip } from '@mui/material';

import './category-filter.css';
import { Category } from 'store/products/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | null;
  searchByCategory: (category: Category) => void;
}

function CategoryFilter({
  categories,
  selectedCategory,
  searchByCategory,
}: CategoryFilterProps): JSX.Element {
  return (
    <Box className="category-tags">
      {categories.map((category) => (
        <Chip
          key={category.slug}
          label={category.name}
          color="primary"
          variant={
            selectedCategory?.slug === category.slug ? 'filled' : 'outlined'
          }
          className="category-chip"
          onClick={() => searchByCategory(category)}
        />
      ))}
    </Box>
  );
}

export default CategoryFilter;
