import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { NO_MORE_PRODUCTS_MESSAGE } from 'constants/constants';
import Loader from 'components/ui/loader';
import InfoMessage from 'components/ui/info-message';
import ProductList from 'components/product-list';
import SearchBar from 'components/ui/search-bar';
import { Product } from 'store/products/types';

interface DashboardComponentProps {
  products: Product[];
  searchTerm: string;
  hasMore: boolean;
  loading: boolean;
  fetchMoreProducts: () => void;
  onSearch: (searchTerm: string) => void;
}

function DashboardComponent({
  products,
  searchTerm,
  hasMore,
  fetchMoreProducts,
  onSearch,
}: DashboardComponentProps): JSX.Element {
  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
      <InfiniteScroll
        dataLength={products.length}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<InfoMessage message={NO_MORE_PRODUCTS_MESSAGE} />}
        next={fetchMoreProducts}
      >
        <ProductList products={products} />
      </InfiniteScroll>
    </>
  );
}

export default DashboardComponent;
