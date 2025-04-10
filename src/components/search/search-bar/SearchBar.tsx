import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import './search-bar.css';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

function SearchBar({ searchTerm, onSearch }: SearchBarProps): JSX.Element {
  return (
    <TextField
      variant="outlined"
      aria-label="textarea"
      className="search-bar"
      placeholder="Search products..."
      value={searchTerm}
      onChange={({ target }) => onSearch(target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default SearchBar;
