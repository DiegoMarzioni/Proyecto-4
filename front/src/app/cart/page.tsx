'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, totalAmount, updateQuantity, removeItem } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-2xl font-light text-white mb-4">Inicia sesión para ver tu carrito</h2>
            <p className="text-gray-400 mb-8">Necesitas estar registrado para ver y gestionar tu carrito de compras</p>
          </div>
          <button 
            onClick={() => router.push('/login')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 mr-4"
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => router.push('/register')}
            className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Registrarse
          </button>
        </div>
      </div>
    );
  }

  const shipping = totalAmount > 100 ? 0 : 9.99;
  const total = totalAmount + shipping;

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Tu <span className="text-yellow-400">Carrito</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        {items.length === 0 ? (
          
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 7H4M7 13L5.4 7M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6M17 13H7" />
              </svg>
              <h2 className="text-2xl font-light text-gray-400 mb-4">Tu carrito está vacío</h2>
              <p className="text-gray-500 mb-8">¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
            </div>
            <Link 
              href="/"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gray-800 rounded-xl overflow-hidden relative">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/api/placeholder/96/96';
                          }}
                        />
                      </div>
                    </div>

                    
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-medium text-white mb-2">{item.product.name}</h3>
                          <div className="space-y-1 text-sm text-gray-400">
                            <p>Descripción: {item.product.description}</p>
                            <p>Stock disponible: {item.product.stock}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-yellow-400">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-400">
                            ${item.product.price.toFixed(2)} c/u
                          </p>
                        </div>
                      </div>

                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-400">Cantidad:</span>
                          <div className="flex items-center border border-gray-700 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-800 transition-colors rounded-l-lg"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="px-4 py-2 bg-gray-800 text-white font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-800 transition-colors rounded-r-lg"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 sticky top-6">
                <h2 className="text-2xl font-light mb-6">Resumen del Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Envío</span>
                    <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {totalAmount > 100 && (
                    <div className="text-sm text-green-400 bg-green-900/20 p-3 rounded-lg">
                      ¡Felicidades! Tienes envío gratis
                    </div>
                  )}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-yellow-400">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 mb-4 text-center"
                >
                  Proceder al Pago
                </Link>

                <Link 
                  href="/"
                  className="block text-center text-gray-400 hover:text-white transition-colors py-2"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
