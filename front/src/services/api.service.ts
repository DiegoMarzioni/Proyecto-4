import { LoginDto, RegisterDto, LoginResponse, User, Product, Order } from '@/interfaces/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { authorization: token }),
    };
  }

  
  async login(credentials: LoginDto): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    return response.json();
  }

  async register(userData: RegisterDto): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error al registrar usuario');
    }

    return response.json();
  }

  
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }

    return response.json();
  }

  async getProductById(id: number): Promise<Product> {
    
    const products = await this.getProducts();
    const product = products.find(p => p.id === id);
    
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    return product;
  }

  
  async getUserOrders(): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/users/orders`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al obtener órdenes');
    }

    return response.json();
  }

  async createOrder(products: number[], userId: number): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ products, userId }),
    });

    if (!response.ok) {
      throw new Error('Error al crear orden');
    }

    return response.json();
  }
}

export const apiService = new ApiService();
