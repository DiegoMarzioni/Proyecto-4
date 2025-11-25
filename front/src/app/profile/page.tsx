'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'info' | 'orders'>('info');

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-2xl font-light text-white mb-4">Acceso requerido</h2>
            <p className="text-gray-400 mb-8">Inicia sesión para ver tu perfil</p>
          </div>
          <button 
            onClick={() => router.push('/login')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Mi <span className="text-yellow-400">Perfil</span>
          </h1>
          <p className="text-xl text-gray-400">
            Bienvenido de vuelta, {user.name}
          </p>
        </div>

        
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900/50 p-1 rounded-xl border border-gray-700">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'info'
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Información Personal
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'orders'
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Historial de Pedidos ({orders.length})
            </button>
          </div>
        </div>

        
        {activeTab === 'info' ? (
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8">
              <h2 className="text-2xl font-light text-white mb-6">Información Personal</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Nombre Completo
                    </label>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                      {user.name}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Correo Electrónico
                    </label>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                      {user.email}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Dirección
                  </label>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                    {user.address}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Teléfono
                  </label>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                    {user.phone}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Rol
                  </label>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-blue-600 text-white'
                    }`}>
                      {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </span>
                  </div>
                </div>
              </div>

              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Cerrar Sesión
                </button>
                
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        ) : (
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-light text-white mb-2">Historial de Pedidos</h2>
              <p className="text-gray-400">
                Tienes {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'} realizados
              </p>
            </div>

            {ordersLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                <p className="text-white">Cargando pedidos...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-8">
                  <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="text-2xl font-light text-gray-400 mb-4">No hay pedidos aún</h3>
                  <p className="text-gray-500 mb-8">Cuando realices tu primera compra, aparecerá aquí</p>
                </div>
                <button 
                  onClick={() => router.push('/products')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Explorar Productos
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          Pedido #{order.id}
                        </h3>
                        <p className="text-gray-400">
                          {formatDate(order.date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'completed' 
                            ? 'bg-green-600 text-white'
                            : order.status === 'pending'
                            ? 'bg-yellow-600 text-black'
                            : 'bg-gray-600 text-white'
                        }`}>
                          {order.status === 'completed' ? 'Completado' :
                           order.status === 'pending' ? 'Pendiente' : order.status}
                        </span>
                      </div>
                    </div>

                    
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="text-white font-medium mb-3">Productos ({order.products.length})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.products.slice(0, 3).map((product) => (
                          <div key={product.id} className="flex items-center space-x-3 bg-gray-800/50 rounded-lg p-3">
                            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="object-cover rounded-lg"
                                />
                              ) : (
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">
                                {product.name}
                              </p>
                              <p className="text-yellow-400 text-sm">
                                ${product.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        {order.products.length > 3 && (
                          <div className="flex items-center justify-center bg-gray-800/50 rounded-lg p-3">
                            <span className="text-gray-400 text-sm">
                              +{order.products.length - 3} más
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    
                    <div className="border-t border-gray-700 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total del pedido:</span>
                        <span className="text-xl font-bold text-yellow-400">
                          ${order.products.reduce((total, product) => total + product.price, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
          >
            ← Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
