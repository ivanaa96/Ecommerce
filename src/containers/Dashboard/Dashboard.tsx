import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import DashboardComponent from 'components/dashboard';
import { INITIAL_SKIP, LIMIT, UNEXPECTED_ERROR } from 'constants/constants';
import useDebounce from 'hooks/useDebounce';
import {
  useProducts,
  useGetProducts,
  useTotalNumberOfProducts,
  useResetProducts,
  useGetCategories,
  useCategories,
  useSearchByCategory,
} from 'store/products/selectors';
import { Category } from 'store/products/types';

function Dashboard() {
  const getProducts = useGetProducts();
  const resetProducts = useResetProducts();
  const getCategories = useGetCategories();
  const searchByCategory = useSearchByCategory();

  const categories = useCategories();
  const totalNumberOfProducts = useTotalNumberOfProducts();
  const products = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [skip, setSkip] = useState(0);
  const [showCategories, setShowCategories] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 1000);

  useEffect(() => {
    getCategories();

    return () => {
      resetProducts();
    };
  }, []);

  useEffect(() => {
    fetchProducts(INITIAL_SKIP);
  }, [debouncedSearchTerm]);

  const reset = () => {
    resetProducts();
    setSkip(INITIAL_SKIP);
  };

  const withLoading = useCallback(async (action: () => Promise<void>) => {
    setLoading(true);
    try {
      await action();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors(err.response?.data?.message || UNEXPECTED_ERROR);
      } else {
        setErrors(err instanceof Error ? err.message : UNEXPECTED_ERROR);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProducts = useCallback(
    (skip: number) =>
      withLoading(() => getProducts(LIMIT, skip, debouncedSearchTerm)),
    [getProducts, debouncedSearchTerm, withLoading]
  );

  const fetchMoreProducts = useCallback(() => {
    const nextSkip = skip + LIMIT;
    setLoading(true);

    if (selectedCategory) {
      withLoading(() => searchByCategory(selectedCategory, nextSkip));
    } else {
      fetchProducts(nextSkip);
    }

    setSkip(nextSkip);
  }, [fetchProducts, searchByCategory, selectedCategory, skip]);

  const handleToggleCategories = () => {
    if (selectedCategory) {
      reset();
      setSearchTerm('');

      if (searchTerm === '') {
        fetchProducts(INITIAL_SKIP);
      }
    }

    setSelectedCategory(null);
    setShowCategories((prev) => !prev);
  };

  const handleSearch = (searchTerm: string) => {
    reset();
    setLoading(true);
    setSearchTerm(searchTerm);
  };

  const handleSearchByCategory = (category: Category) => {
    reset();
    setSelectedCategory(category);
    withLoading(() => searchByCategory(category, INITIAL_SKIP));
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
      isLoading={loading}
      hasErrors={errors}
      fetchMoreProducts={fetchMoreProducts}
      onSearch={handleSearch}
      onSearchByCategory={handleSearchByCategory}
      onToggleCategories={handleToggleCategories}
    />
  );
}

export default Dashboard;
