

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: 'admin' | 'user';
  orders?: Order[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  products?: Product[];
}

export interface Order {
  id: number;
  status: string;
  date: string;
  user: User;
  products: Product[];
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export interface LoginResponse {
  login: boolean;
  user: User;
  token: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
