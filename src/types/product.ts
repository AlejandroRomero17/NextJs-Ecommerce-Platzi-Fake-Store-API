import { Category } from "./category";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
