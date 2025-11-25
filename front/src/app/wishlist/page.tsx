'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

import { Product } from '@/interfaces/types';

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem, isInCart, getItemQuantity } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loadingProducts, setLoadingProducts] = useState<Set<number>>(new Set());

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar productos al carrito', {
        action: {
          label: 'Iniciar sesión',
          onClick: () => router.push('/login')
        }
      });
      return;
    }

    
    if (isInCart(product.id)) {
      toast.warning('Este producto ya está en tu carrito', {
        description: 'Solo puedes agregar 1 de cada producto.'
      });
      return;
    }

    setLoadingProducts(prev => new Set(prev).add(product.id));
    try {
      addItem(product);
      toast.success('¡Producto agregado al carrito!', {
        description: `${product.name} se agregó correctamente`,
        action: {
          label: 'Ver carrito',
          onClick: () => router.push('/cart')
        }
      });
    } catch (error) {
      toast.error('Error al agregar al carrito', {
        description: 'Inténtalo de nuevo más tarde'
      });
    } finally {
      setLoadingProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
  };

  const handleClearWishlist = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar tu lista de deseos?')) {
      clearWishlist();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-light text-white mb-4">Inicia sesión para ver tu lista de deseos</h2>
            <p className="text-gray-400 mb-8">Guarda tus productos favoritos para más tarde</p>
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

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Lista de <span className="text-yellow-400">Deseos</span>
            </h1>
            <p className="text-xl text-gray-400">
              Tienes {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu lista de deseos
            </p>
          </div>
          
          {items.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              Vaciar lista
            </button>
          )}
        </div>

        {items.length === 0 ? (
          
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-2xl font-light text-gray-400 mb-4">Tu lista de deseos está vacía</h2>
              <p className="text-gray-500 mb-8">Explora nuestros productos y agrega los que más te gusten</p>
            </div>
            <button 
              onClick={() => router.push('/products')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Explorar Productos
            </button>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => {
              const inCart = isInCart(product.id);
              const cartQuantity = getItemQuantity(product.id);
              const isLoading = loadingProducts.has(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
                >
                  
                  <div className="relative h-48 bg-gray-800 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                    
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                    
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="absolute top-3 right-3 z-20 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    
                    {product.category && (
                      <div className="absolute top-3 left-3 z-20">
                        <span className="bg-yellow-600/90 text-black text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                          {product.category.name}
                        </span>
                      </div>
                    )}

                    
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-15">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-lg font-medium">
                          Agotado
                        </span>
                      </div>
                    )}
                  </div>

                  
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors cursor-pointer line-clamp-2"
                      >
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-yellow-400">
                          ${product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400">
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>

                    
                    <div className="space-y-2">
                      {inCart && (
                        <div className="text-center text-sm text-green-400 bg-green-900/20 py-1 rounded-lg border border-green-500/30">
                          En carrito ({cartQuantity})
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => router.push(`/products/${product.id}`)}
                          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        >
                          Ver Detalles
                        </button>
                        
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isLoading || product.stock === 0}
                          className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : product.stock === 0 ? (
                            'Sin Stock'
                          ) : inCart ? (
                            'Agregar +'
                          ) : (
                            'Al Carrito'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push('/products')}
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
}
