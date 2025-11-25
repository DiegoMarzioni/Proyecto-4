import { useState, useEffect } from 'react';
import { Product, Category } from '@/interfaces/types';
import { apiService } from '@/services/api.service';

interface UseProductsReturn {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await apiService.getProducts();
      setProducts(fetchedProducts);
      
      
      const uniqueCategories = fetchedProducts.reduce((acc: Category[], product: Product) => {
        if (product.category && !acc.find(cat => cat.id === product.category!.id)) {
          acc.push(product.category);
        }
        return acc;
      }, []);
      
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    refetch: fetchProducts,
  };
};

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export const useProduct = (id: number): UseProductReturn => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await apiService.getProductById(id);
        setProduct(fetchedProduct);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar producto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return {
    product,
    loading,
    error,
  };
};
