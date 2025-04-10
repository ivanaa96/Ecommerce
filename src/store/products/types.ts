interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutResponse {
  id: number;
  products: CartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ProductStore {
  products: Product[];
  totalNumberOfProducts: number;
  cartItems: CartItem[];
  favoriteProducts: Product[];
  categories: Category[];
  getProducts: (
    limit: number,
    skip: number,
    searchTerm?: string
  ) => Promise<void>;
  resetProducts: () => void;
  getProductById: (productId: string) => Promise<Product>;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  checkoutCart: (userId: number) => Promise<CheckoutResponse>;
  addToFavoriteProducts: (product: Product) => void;
  removeFromFavoriteProducts: (productId: number) => void;
  getCategories: () => Promise<void>;
  searchByCategory: (
    category: Category,
    skip: number,
    limit?: number
  ) => Promise<void>;
}
