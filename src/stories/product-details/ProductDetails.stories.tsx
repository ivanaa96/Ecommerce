import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Product } from 'store/products/types';
import ProductDetailsComponent from 'components/product-details';
import { mockProducts } from 'constants/test-constants';

const meta: Meta<typeof ProductDetailsComponent> = {
  title: 'Components/ProductDetail',
  component: ProductDetailsComponent,
  args: {
    product: mockProducts[0],
    showMoreDetails: false,
    isFavorite: false,
    hasErrors: '',
    isLoading: false,
    onAddToCart: (product: Product) =>
      console.log(`Added to cart: ${product.title}`),
    onToggleMoreDetails: () => console.log('Toggled more details'),
    onToggleFavorite: () => console.log('Toggled favorite'),
  },
  argTypes: {
    product: {
      control: 'object',
      description: 'An object that represents the product',
    },
    showMoreDetails: {
      control: 'boolean',
      description: 'Indicates if more details should be shown',
    },
    isFavorite: {
      control: 'boolean',
      description:
        'Indicates if the product should be added to the favorites list',
    },
    isLoading: {
      control: 'boolean',
      description: 'Indicates if the page is loading',
    },
    hasErrors: {
      control: 'object',
      description: 'indicates if an error happened',
    },
    onAddToCart: { action: 'added to cart' },
    onToggleMoreDetails: { action: 'toggle more details' },
    onToggleFavorite: { action: 'toggle favorite' },
  },
};

export default meta;

const Template: StoryFn<{
  product: Product;
  showMoreDetails: boolean;
  isFavorite: boolean;
  hasErrors: string | null;
  isLoading: boolean;
  onAddToCart: (product: Product) => void;
  onToggleMoreDetails: () => void;
  onToggleFavorite: () => void;
}> = (args) => <ProductDetailsComponent {...args} />;

export const Default = Template.bind({});

export const IsLoading = Template.bind({});
IsLoading.args = {
  ...Default.args,
  isLoading: true,
};

export const HasError = Template.bind({});
HasError.args = {
  ...Default.args,
  hasErrors: 'Product was not found.',
};

export const ShowMoreDetails = Template.bind({});
ShowMoreDetails.args = {
  ...Default.args,
  showMoreDetails: true,
};

export const IsFavorite = Template.bind({});
IsFavorite.args = {
  ...Default.args,
  isFavorite: true,
};

export const AddedToCart = Template.bind({});
AddedToCart.args = {
  ...Default.args,
  onAddToCart: (product: Product) => {
    console.log(`Product added to cart: ${product.title}`);
  },
};
