import { CartItem, Category, Product } from 'store/products/types';

export const mockFavoriteProducts: Product[] = [
  {
    id: 1,
    title: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    category: 'Electronics',
    price: 150.0,
    discountPercentage: 10,
    rating: 4.5,
    stock: 50,
    tags: ['audio', 'wireless'],
    brand: 'AudioPro',
    sku: 'AUDIO123',
    weight: 0.5,
    dimensions: { width: 18, height: 20, depth: 8 },
    warrantyInformation: '2-year warranty included.',
    shippingInformation: 'Ships within 2-3 business days.',
    availabilityStatus: 'In Stock',
    returnPolicy: '30-day return policy.',
    thumbnail: 'https://example.com/images/headphones_thumb.jpg',
    reviews: [],
    minimumOrderQuantity: 0,
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: '',
    },
    images: [],
  },
  {
    id: 2,
    title: 'Smartwatch Series X',
    description: 'Latest smartwatch with heart rate monitor and GPS.',
    category: 'Wearables',
    price: 299.0,
    discountPercentage: 15,
    rating: 4.7,
    stock: 30,
    tags: ['smartwatch', 'wearable'],
    brand: 'TechLife',
    sku: 'TECH1001',
    weight: 0.2,
    dimensions: { width: 5, height: 10, depth: 1 },
    warrantyInformation: '1-year warranty included.',
    shippingInformation: 'Ships within 1-2 business days.',
    availabilityStatus: 'In Stock',
    returnPolicy: '15-day return policy.',
    thumbnail: 'https://example.com/images/smartwatch_thumb.jpg',
    reviews: [],
    minimumOrderQuantity: 0,
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: '',
    },
    images: [],
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description of Mock Product 1',
    thumbnail: 'https://example.com/product1.jpg',
    category: 'mock-category',
    price: 0,
    discountPercentage: 0,
    rating: 3,
    stock: 0,
    tags: [],
    brand: '',
    sku: '',
    weight: 2,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: 0,
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: '',
    },
    images: [],
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description of Product 2',
    thumbnail: 'https://example.com/product2.jpg',
    category: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: '',
    sku: '',
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: 0,
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: '',
    },
    images: [],
  },
];

export const mockCategories: Category[] = [
  {
    slug: 'first-category',
    name: 'First Category',
    url: 'first-category.url',
  },
  {
    slug: 'second-category',
    name: 'Second Category',
    url: 'second-category.url',
  },
  {
    slug: 'thrid-category',
    name: 'Thrid Category',
    url: 'thrid-category.url',
  },
];

export const mockCartItems: CartItem[] = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description of Product 1',
    thumbnail: 'https://example.com/product1.jpg',
    category: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: '',
    sku: '',
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: 0,
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: '',
    },
    images: [],
    quantity: 0,
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description of Product 2',
    thumbnail: 'https://example.com/product2.jpg',
    category: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: '',
    sku: '',
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: 0,
    meta: {
      createdAt: '',
      updatedAt: '',
      barcode: '',
      qrCode: '',
    },
    images: [],
    quantity: 0,
  },
];
