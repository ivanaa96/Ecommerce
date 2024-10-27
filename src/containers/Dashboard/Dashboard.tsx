import React, { useEffect, useState } from 'react';

import DashboardComponent from 'components/dashboard';
import useDebounce from 'hooks/useDebounce';
import {
  useProducts,
  useGetProducts,
  useTotalNumberOfProducts,
  useResetProducts,
} from 'store/products/selectors';

const LIMIT = 10;

function Dashboard() {
  const getProducts = useGetProducts();
  const resetProducts = useResetProducts();
  const totalNumberOfProducts = useTotalNumberOfProducts();
  const products = useProducts();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [skip, setSkip] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 1000);

  useEffect(() => {
    resetProducts();
    fetchProducts(0);
  }, [debouncedSearchTerm]);

  const fetchProducts = async (skip: number) => {
    setLoading(true);

    try {
      await getProducts(LIMIT, skip, debouncedSearchTerm);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreProducts = () => {
    setSkip(skip + 10);
    fetchProducts(skip + 10);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSkip(0);
  };

  return (
    <DashboardComponent
      products={products}
      searchTerm={searchTerm}
      loading={loading}
      hasMore={skip + LIMIT < totalNumberOfProducts}
      fetchMoreProducts={fetchMoreProducts}
      onSearch={handleSearch}
    />
  );
}

export default Dashboard;
