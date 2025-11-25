'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/interfaces/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { addItem, isInCart, getItemQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    
    if (!user) {
      toast.error('Debes iniciar sesión para agregar productos al carrito', {
        action: {
          label: 'Iniciar sesión',
          onClick: () => router.push('/login')
        }
      });
      return;
    }
    
    if (product.stock === 0) return;
    
    
    if (isInCart(product.id)) {
      toast.warning('Este producto ya está en tu carrito', {
        description: 'Solo puedes agregar 1 de cada producto.'
      });
      return;
    }
    
    setIsLoading(true);
    addItem(product);
    
    
    toast.success('¡Producto agregado al carrito!', {
      description: `${product.name} se agregó correctamente`,
      action: {
        label: 'Ver carrito',
        onClick: () => router.push('/cart')
      }
    });
    
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    if (!user) {
      toast.error('Debes iniciar sesión para usar la lista de deseos', {
        action: {
          label: 'Iniciar sesión',
          onClick: () => router.push('/login')
        }
      });
      return;
    }
    
    const isCurrentlyInWishlist = isInWishlist(product.id);
    toggleWishlist(product);
    
    if (isCurrentlyInWishlist) {
      toast.info('Producto removido de favoritos', {
        description: `${product.name} se removió de tu lista de deseos`
      });
    } else {
      toast.success('¡Agregado a favoritos!', {
        description: `${product.name} se agregó a tu lista de deseos`,
        action: {
          label: 'Ver favoritos',
          onClick: () => router.push('/wishlist')
        }
      });
    }
  };

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);
  const inWishlist = isInWishlist(product.id);

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 h-fit"
    >
      
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/0 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      
      <div className="relative aspect-[4/5] bg-gray-800 overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-all duration-500 group-hover:from-black/40"></div>
        
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20"></div>
        
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-all duration-700 group-hover:brightness-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
            <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 sm:top-3 left-2 sm:left-3 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-110 backdrop-blur-sm border border-white/20 ${
            inWishlist 
              ? 'bg-red-600/90 text-white hover:bg-red-700 shadow-lg shadow-red-600/50 animate-pulse' 
              : 'bg-black/40 text-white hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/50'
          } group-hover:translate-x-1 group-hover:-translate-y-1`}
        >
          <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${inWishlist ? 'scale-110' : 'group-hover:scale-125'}`} fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 z-20 transform group-hover:-translate-y-1 transition-transform duration-300">
            <span className="bg-red-600 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium shadow-lg shadow-red-600/50 animate-pulse border border-red-400/50">
              Solo {product.stock} disponibles
            </span>
          </div>
        )}

        
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-15 backdrop-blur-sm">
            <span className="bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-2xl border border-red-400/50 animate-pulse text-sm sm:text-base">
              Agotado
            </span>
          </div>
        )}

        
        <div className="absolute top-3 right-3 z-20">
          <span className="bg-yellow-600/90 text-black text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
            {product.category?.name}
          </span>
        </div>
      </div>

      
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2 group-hover:text-yellow-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="text-xl sm:text-2xl font-bold text-yellow-400">
            ${product.price.toFixed(2)}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            Stock: {product.stock}
          </div>
        </div>

        
        <div className="space-y-2 sm:space-y-3">
          {inCart && (
            <div className="text-center text-xs sm:text-sm text-green-400 bg-green-900/30 py-2 sm:py-2.5 rounded-xl border border-green-500/30 backdrop-blur-sm animate-pulse">
              ✓ En carrito ({quantity} {quantity === 1 ? 'unidad' : 'unidades'})
            </div>
          )}
          
          <button
            onClick={handleAddToCart}
            disabled={isLoading || product.stock === 0 || !user || inCart}
            className="group/btn relative w-full overflow-hidden bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/25 disabled:hover:scale-100 text-sm sm:text-base"
          >
            
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <span className="relative z-10 flex items-center justify-center space-x-2">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                  <span>Agregando...</span>
                </>
              ) : !user ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Inicia sesión</span>
                </>
              ) : inCart ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ya en carrito</span>
                </>
              ) : product.stock === 0 ? (
                <span>Agotado</span>
              ) : (
                <>
                  <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 7H4M7 13L5.4 7M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6M17 13H7" />
                  </svg>
                  <span>Agregar al carrito</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
