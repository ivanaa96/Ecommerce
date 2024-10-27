import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { NO_MORE_PRODUCTS_MESSAGE } from 'constants/constants';
import ProductList from 'components/product-list';
import Loader from 'components/ui/loader';
import InfoMessage from 'components/ui/info-message';
import SearchComponent from 'components/search/search-component';
import { Category, Product } from 'store/products/types';

interface DashboardComponentProps {
  products: Product[];
  searchTerm: string;
  hasMore: boolean;
  categories: Category[];
  showCategories: boolean;
  selectedCategory: Category | null;
  fetchMoreProducts: () => void;
  onSearch: (searchTerm: string) => void;
  onSearchByCategory: (category: Category) => void;
  onToggleCategories: () => void;
}

function DashboardComponent({
  products,
  searchTerm,
  hasMore,
  categories,
  showCategories,
  selectedCategory,
  fetchMoreProducts,
  onSearch,
  onSearchByCategory,
  onToggleCategories,
}: DashboardComponentProps): JSX.Element {
  return (
    <>
      <SearchComponent
        searchTerm={searchTerm}
        categories={categories}
        showCategories={showCategories}
        onToggleCategories={onToggleCategories}
        onSearch={onSearch}
        searchByCategory={onSearchByCategory}
        selectedCategory={selectedCategory}
      />
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
