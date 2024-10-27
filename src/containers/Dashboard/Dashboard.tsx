import React, { useCallback, useEffect, useMemo, useState } from 'react';

import DashboardComponent from 'components/dashboard';
import { INITIAL_SKIP, LIMIT } from 'constants/constants';
import useDebounce from 'hooks/useDebounce';
import {
  useProducts,
  useGetProducts,
  useTotalNumberOfProducts,
  useResetProducts,
  useGetCategories,
  useCategories,
  useSearchByCategory,
  useResetCategories,
} from 'store/products/selectors';
import { Category } from 'store/products/types';

function Dashboard() {
  const getProducts = useGetProducts();
  const resetProducts = useResetProducts();
  const getCategories = useGetCategories();
  const searchByCategory = useSearchByCategory();
  const resetCategories = useResetCategories();

  const categories = useCategories();
  const totalNumberOfProducts = useTotalNumberOfProducts();
  const products = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [skip, setSkip] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 1000);

  useEffect(() => {
    getCategories();

    return () => {
      resetProducts();
      resetCategories();
    };
  }, []);

  useEffect(() => {
    fetchProducts(INITIAL_SKIP);
  }, [debouncedSearchTerm]);

  const fetchProducts = useCallback(
    async (skip: number) => {
      try {
        await getProducts(LIMIT, skip, debouncedSearchTerm);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    [getProducts, debouncedSearchTerm]
  );

  const fetchMoreProducts = () => {
    const nextSkip = skip + LIMIT;

    if (selectedCategory) {
      searchByCategory(selectedCategory, skip + 10);
    } else {
      fetchProducts(skip + 10);
    }

    setSkip(nextSkip);
  };

  const handleSearch = (searchTerm: string) => {
    resetProducts();
    setSearchTerm(searchTerm);
    setSkip(INITIAL_SKIP);
  };

  const handleToggleCategories = () => {
    if (selectedCategory) {
      resetProducts();
      setSearchTerm('');
    }

    setSelectedCategory(null);
    setShowCategories((prev) => !prev);
  };

  const handleSearchByCategory = (category: Category) => {
    resetProducts();
    setSelectedCategory(category);
    setSkip(INITIAL_SKIP);
    searchByCategory(category, INITIAL_SKIP);
  };

  const hasMore = useMemo(
    () => skip + LIMIT < totalNumberOfProducts,
    [skip, totalNumberOfProducts]
  );

  return (
    <DashboardComponent
      products={products}
      searchTerm={searchTerm}
      hasMore={hasMore}
      categories={categories}
      showCategories={showCategories}
      selectedCategory={selectedCategory}
      fetchMoreProducts={fetchMoreProducts}
      onSearch={handleSearch}
      onSearchByCategory={handleSearchByCategory}
      onToggleCategories={handleToggleCategories}
    />
  );
}

export default Dashboard;
