import { useState, useEffect } from 'react';
import { Order } from '@/interfaces/types';
import { apiService } from '@/services/api.service';
import { useAuth } from '@/contexts/AuthContext';

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useOrders = (): UseOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const fetchOrders = async () => {
    if (!isAuthenticated || !user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const fetchedOrders = await apiService.getUserOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar órdenes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      if (!isAuthenticated || !user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedOrders = await apiService.getUserOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar órdenes');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [isAuthenticated, user]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
  };
};
