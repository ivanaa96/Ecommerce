import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { mockFavoriteProducts } from 'constants/test-constants';
import FavoriteProductsComponent from 'components/favorite-products/FavoriteProducts';
import { Product } from 'store/products/types';

const meta: Meta<typeof FavoriteProductsComponent> = {
  title: 'Components/FavoriteProductsComponent',
  component: FavoriteProductsComponent,
  args: {
    favoriteProducts: [],
    onNavigate: action('Navigated to product'),
    onRemoveFromFavorites: action('Removed from favorites'),
  },
  argTypes: {
    favoriteProducts: {
      control: 'object',
      description: 'an array of favorite products',
    },
    onNavigate: { action: 'navigated to product', table: { disable: true } },
    onRemoveFromFavorites: {
      action: 'removed from favorites',
      table: { disable: true },
    },
  },
};
export default meta;

const Template: StoryFn<{
  favoriteProducts: Product[];
  onNavigate: (productId: number) => void;
  onRemoveFromFavorites: (productId: number) => void;
}> = (args) => <FavoriteProductsComponent {...args} />;

export const WithFavoriteProducts = Template.bind({});
WithFavoriteProducts.args = {
  favoriteProducts: mockFavoriteProducts,
};

export const WithoutFavoriteProducts = Template.bind({});
WithoutFavoriteProducts.args = {
  favoriteProducts: [],
};
