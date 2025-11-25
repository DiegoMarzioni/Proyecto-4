'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);
  
  const { product, loading, error } = useProduct(productId);
  const { addItem, isInCart } = useCart();
  const { user } = useAuth();
  
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (!product) return;
    
    
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
    
    setIsAddingToCart(true);
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
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-2xl font-light text-red-400 mb-4">Producto no encontrado</h2>
            <p className="text-gray-500 mb-8">{error || 'El producto que buscas no existe'}</p>
          </div>
          <button 
            onClick={() => router.push('/products')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            Ver Todos los Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <button 
              onClick={() => router.push('/')} 
              className="hover:text-yellow-400 transition-colors"
            >
              Inicio
            </button>
            <span>/</span>
            <button 
              onClick={() => router.push('/products')} 
              className="hover:text-yellow-400 transition-colors"
            >
              Productos
            </button>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="space-y-4">
            <div className="aspect-square relative bg-gray-900 rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium">
                    Agotado
                  </span>
                </div>
              )}
            </div>
          </div>

          
          <div className="space-y-6">
            
            {product.category && (
              <div className="inline-block">
                <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category.name}
                </span>
              </div>
            )}

            
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-white mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-yellow-400">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-gray-400">
                  Stock: {product.stock} disponibles
                </span>
              </div>
            </div>

            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            
            {product.stock > 0 && (
              <div className="space-y-4">
                
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !user || isInCart(product.id)}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isAddingToCart ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                      <span>Agregando...</span>
                    </div>
                  ) : !user ? (
                    'Inicia sesión para comprar'
                  ) : isInCart(product.id) ? (
                    'Ya está en tu carrito'
                  ) : (
                    'Agregar al carrito'
                  )}
                </button>

                {!user && (
                  <p className="text-center text-gray-400 text-sm">
                    <button 
                      onClick={() => router.push('/login')}
                      className="text-yellow-400 hover:underline"
                    >
                      Inicia sesión
                    </button> para realizar compras
                  </p>
                )}
              </div>
            )}

            
            <div className="border-t border-gray-700 pt-6 space-y-4">
              <h3 className="text-lg font-medium text-white mb-4">Detalles del producto</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">ID:</span>
                  <span className="text-white ml-2">#{product.id}</span>
                </div>
                <div>
                  <span className="text-gray-400">Categoría:</span>
                  <span className="text-white ml-2">{product.category?.name || 'Sin categoría'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Stock:</span>
                  <span className="text-white ml-2">{product.stock} unidades</span>
                </div>
                <div>
                  <span className="text-gray-400">Precio:</span>
                  <span className="text-white ml-2">${product.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push('/products')}
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
          >
            ← Volver a productos
          </button>
        </div>
      </div>
    </div>
  );
}
