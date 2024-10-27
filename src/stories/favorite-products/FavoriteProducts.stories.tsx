import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { mockFavoriteProducts } from 'constants/test-constants';
import FavoriteProductsComponent from 'components/favorite-products/FavoriteProducts';
import { FavoriteProductsComponentProps } from 'components/favorite-products/FavoriteProducts/FavoriteProducts';

const meta: Meta<typeof FavoriteProductsComponent> = {
  title: 'Components/FavoriteProductsComponent',
  component: FavoriteProductsComponent,
  argTypes: {
    onNavigate: { action: 'navigated to product', table: { disable: true } },
    onRemoveFromFavorites: {
      action: 'removed from favorites',
      table: { disable: true },
    },
  },
};
export default meta;

const Template: StoryFn<FavoriteProductsComponentProps> = (args) => (
  <FavoriteProductsComponent {...args} />
);

export const WithFavoriteProducts = Template.bind({});
WithFavoriteProducts.args = {
  favoriteProducts: mockFavoriteProducts,
  onNavigate: action('Navigated to product'),
  onRemoveFromFavorites: action('Removed from favorites'),
};

export const WithoutFavoriteProducts = Template.bind({});
WithoutFavoriteProducts.args = {
  favoriteProducts: [],
  onNavigate: action('Navigated to product'),
  onRemoveFromFavorites: action('Removed from favorites'),
};
