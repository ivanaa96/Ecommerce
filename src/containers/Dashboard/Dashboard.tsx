import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import DashboardComponent from 'components/dashboard';
import InfoMessage from 'components/ui/info-message';
import Loader from 'components/ui/loader';
import {
  useProducts,
  useGetProducts,
  useTotalNumberOfProducts,
} from 'store/products/selectors';

function Dashboard() {
  const getProducts = useGetProducts();
  const totalNumberOfProducts = useTotalNumberOfProducts();
  const products = useProducts() || [];
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await getProducts(true);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [getProducts]);

  const fetchMoreProducts = async () => {
    setLoading(true);
    try {
      await getProducts();
      setHasMore(products.length < totalNumberOfProducts);
    } catch (error) {
      console.error('Error fetching more products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!loading && products.length === 0) {
    return <InfoMessage message="No products available." />;
  }

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchMoreProducts}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<InfoMessage message="No more products to load" />}
    >
      <DashboardComponent products={products} />
    </InfiniteScroll>
  );
}

export default Dashboard;
