import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DashboardComponent from 'components/dashboard';
import { mockCategories, mockProducts } from 'constants/test-constants';
import { Category, Product } from 'store/products/types';
import { SnackbarProvider } from 'hooks/useSnackbar';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof DashboardComponent> = {
  title: 'Components/DashboardComponent',
  component: DashboardComponent,
  args: {
    products: mockProducts,
    searchTerm: '',
    hasMore: true,
    categories: mockCategories,
    showCategories: false,
    selectedCategory: null,
    isLoading: false,
    fetchMoreProducts: () => console.log('Fetching more products...'),
    onSearch: (searchTerm: string) =>
      console.log(`Searching for: ${searchTerm}`),
    onSearchByCategory: (category: Category) =>
      console.log(`Searching in category: ${category.name}`),
    onToggleCategories: () => console.log('Toggled categories'),
  },
  argTypes: {
    products: {
      control: 'object',
      description: 'An array of products to display',
    },
    searchTerm: { control: 'text', description: 'Current search term' },
    hasMore: {
      control: 'boolean',
      description: 'Indicates if more products can be loaded',
    },
    categories: {
      control: 'object',
      description: 'Array of product categories',
    },
    showCategories: {
      control: 'boolean',
      description: 'Toggle to show/hide categories',
    },
    selectedCategory: {
      control: 'object',
      description: 'Currently selected category',
    },
    isLoading: { control: 'boolean', description: 'Loading state' },
  },
};

export default meta;

const Template: StoryFn<{
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
}> = (args) => (
  <BrowserRouter>
    <SnackbarProvider>
      <DashboardComponent {...args} />
    </SnackbarProvider>
  </BrowserRouter>
);

export const WithProducts = Template.bind({});

export const NoProducts = Template.bind({});
NoProducts.args = {
  ...meta.args,
  products: [],
};

export const Loading = Template.bind({});
Loading.args = {
  ...meta.args,
  isLoading: true,
  products: [],
};

export const NoMoreProducts = Template.bind({});
NoMoreProducts.args = {
  ...meta.args,
  hasMore: false,
};

export const WithSearchTerm = Template.bind({});
WithSearchTerm.args = {
  ...meta.args,
  searchTerm: 'powder',
};

export const WithCategories = Template.bind({});
WithCategories.args = {
  ...meta.args,
  showCategories: true,
};

export const WithSelectedCategory = Template.bind({});
WithSelectedCategory.args = {
  ...meta.args,
  showCategories: true,
  selectedCategory: mockCategories[0],
};
