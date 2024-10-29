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
  isLoading: boolean;
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
  isLoading,
  fetchMoreProducts,
  onSearch,
  onSearchByCategory,
  onToggleCategories,
}: DashboardComponentProps): JSX.Element {
  const shouldShowNoMoreProductsMessage =
    (!isLoading && !hasMore) || (!isLoading && products.length === 0);

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

      {isLoading && <Loader />}

      <InfiniteScroll
        loader={isLoading}
        dataLength={products.length}
        hasMore={hasMore}
        next={fetchMoreProducts}
      >
        <ProductList products={products} />
      </InfiniteScroll>

      {shouldShowNoMoreProductsMessage && (
        <InfoMessage message={NO_MORE_PRODUCTS_MESSAGE} />
      )}
    </>
  );
}

export default DashboardComponent;
