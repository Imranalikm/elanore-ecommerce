export interface Product {
  id: string;
  name: string;
  category: 'Dresses' | 'Tops' | 'Bottoms' | 'Bags' | 'Accessories' | 'Blazers' | 'Shoes';
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  fabric: string;
  care: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  colors: {
    name: string;
    hex: string;
    bgClass?: string;
  }[];
  sizes: string[];
  image: string;
  gallery: string[];
}

export interface CartItem {
  key: string; // unique combo of product.id + size + color
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface CustomerOrderInfo {
  name: string;
  phone: string;
  city: string;
  address?: string;
  notes?: string;
  paymentPreference: 'cash_on_delivery' | 'bank_transfer' | 'direct_upi';
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  selectedSizes: string[];
  selectedColors: string[];
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: SortOption;
}
