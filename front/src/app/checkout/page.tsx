'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api.service';
import Image from 'next/image';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'review' | 'payment' | 'confirmation'>('review');
  const [orderId, setOrderId] = useState<number | null>(null);

  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  
  const [shippingData, setShippingData] = useState({
    address: user?.address || '',
    city: '',
    postalCode: '',
    country: 'España',
    phone: user?.phone || '',
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <svg className="w-16 h-16 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-2xl font-light text-white mb-4">Inicia sesión para continuar</h2>
            <p className="text-gray-400 mb-8">Necesitas estar registrado para realizar una compra</p>
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 7H4M7 13L5.4 7M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6M17 13H7" />
            </svg>
            <h2 className="text-2xl font-light text-gray-400 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-8">Agrega algunos productos antes de proceder al checkout</p>
          </div>
          <button 
            onClick={() => router.push('/products')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            Explorar Productos
          </button>
        </div>
      </div>
    );
  }


  const handlePayment = async () => {
    
    if (paymentMethod === 'card' && (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name)) {
      toast.error('Información de pago incompleta', {
        description: 'Por favor, completa todos los campos de la tarjeta'
      });
      return;
    }

    setLoading(true);
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      
      const productIds = items.map(item => item.product.id);
      
      if (!user?.id) {
        throw new Error('Usuario no autenticado');
      }
      
      const order = await apiService.createOrder(productIds, user.id);
      
      setOrderId(order.id);
      setStep('confirmation');
      clearCart();
      
      toast.success('¡Compra realizada exitosamente!', {
        description: `Orden #${order.id} creada correctamente`,
        action: {
          label: 'Ver historial',
          onClick: () => router.push('/profile')
        }
      });
      
    } catch (error) {
      console.error('Error in payment process:', error);
      toast.error('Error al procesar el pago', {
        description: 'Por favor, inténtalo de nuevo. Si el problema persiste, contacta soporte.',
        action: {
          label: 'Reintentar',
          onClick: () => handlePayment()
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  
  const getStepColor = (stepType: 'review' | 'payment' | 'confirmation') => {
    if (step === stepType) return 'text-yellow-400';
    if (step === 'confirmation' && (stepType === 'review' || stepType === 'payment')) return 'text-green-400';
    return 'text-gray-500';
  };

  const getStepBgColor = (stepType: 'review' | 'payment' | 'confirmation') => {
    if (step === stepType) return 'bg-yellow-400 text-black';
    if (step === 'confirmation' && (stepType === 'review' || stepType === 'payment')) return 'bg-green-400 text-black';
    return 'bg-gray-600 text-white';
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-black pt-24">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-light text-white mb-4">
              ¡Pedido <span className="text-green-400">Confirmado!</span>
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Tu pedido ha sido procesado exitosamente
            </p>
            {orderId && (
              <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-6 mb-8">
                <p className="text-gray-400 mb-2">Número de pedido:</p>
                <p className="text-2xl font-bold text-yellow-400">#{orderId}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push('/profile')}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Ver Mis Pedidos
            </button>
            <button
              onClick={() => router.push('/products')}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-all duration-300"
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Finalizar <span className="text-yellow-400">Compra</span>
          </h1>
          
          
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${getStepColor('review')}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepBgColor('review')}`}>
                  {step === 'review' ? '1' : '✓'}
                </div>
                <span className="text-sm font-medium">Revisar</span>
              </div>
              <div className="w-8 h-px bg-gray-600"></div>
              <div className={`flex items-center space-x-2 ${getStepColor('payment')}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepBgColor('payment')}`}>
                  {(step as string) === 'confirmation' ? '✓' : '2'}
                </div>
                <span className="text-sm font-medium">Pago</span>
              </div>
              <div className="w-8 h-px bg-gray-600"></div>
              <div className={`flex items-center space-x-2 ${getStepColor('confirmation')}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepBgColor('confirmation')}`}>
                  3
                </div>
                <span className="text-sm font-medium">Confirmación</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            {step === 'review' && (
              <div className="space-y-6">
                
                <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
                  <h2 className="text-2xl font-light text-white mb-6">Revisar Pedido</h2>
                  
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-4 bg-gray-800/50 rounded-lg p-4">
                        <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden">
                          {item.product.image ? (
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{item.product.name}</h3>
                          <p className="text-gray-400 text-sm">Cantidad: {item.quantity}</p>
                          {item.product.category && (
                            <p className="text-gray-500 text-xs">{item.product.category.name}</p>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-yellow-400 font-semibold">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-gray-500 text-sm">
                            ${item.product.price.toLocaleString()} c/u
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                
                <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
                  <h2 className="text-2xl font-light text-white mb-6">Información de Envío</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Dirección
                      </label>
                      <input
                        type="text"
                        value={shippingData.address}
                        onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="Calle, número, piso..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="Ciudad"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="28001"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="+34 600 000 000"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Continuar al Pago
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                
                <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
                  <h2 className="text-2xl font-light text-white mb-6">Método de Pago</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        paymentMethod === 'card'
                          ? 'border-yellow-400 bg-yellow-400/10'
                          : 'border-gray-700 bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="text-white font-medium">Tarjeta</span>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        paymentMethod === 'paypal'
                          ? 'border-yellow-400 bg-yellow-400/10'
                          : 'border-gray-700 bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a9.159 9.159 0 0 1-.414 1.86c-.942 4.36-4.059 5.873-7.967 5.873h-1.946c-.524 0-.968.382-1.05.9l-.689 4.378-.177 1.124c-.047.297.197.539.495.539h3.465c.524 0 .968-.382 1.05-.9l.177-1.124.689-4.378c.083-.518.526-.9 1.05-.9h1.946c3.908 0 7.025-1.513 7.967-5.873z"/>
                        </svg>
                        <span className="text-white font-medium">PayPal</span>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Número de Tarjeta
                        </label>
                        <input
                          type="text"
                          value={cardData.number}
                          onChange={(e) => setCardData({...cardData, number: formatCardNumber(e.target.value)})}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Fecha de Expiración
                          </label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({...cardData, expiry: formatExpiry(e.target.value)})}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Nombre del Titular
                        </label>
                        <input
                          type="text"
                          value={cardData.name}
                          onChange={(e) => setCardData({...cardData, name: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                          placeholder="Juan Pérez"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-8">
                      <p className="text-gray-400 mb-4">Serás redirigido a PayPal para completar el pago</p>
                      <div className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block">
                        PayPal Checkout
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep('review')}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-xl font-medium transition-all duration-300"
                  >
                    Volver
                  </button>
                  
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 py-4 rounded-xl font-medium transition-all duration-300"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                        <span>Procesando...</span>
                      </div>
                    ) : (
                      'Procesar Pago'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 sticky top-24">
              <h2 className="text-2xl font-light text-white mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Envío</span>
                  <span className="text-green-400">Gratis</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>IVA (21%)</span>
                  <span>${(totalAmount * 0.21).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span className="text-yellow-400">
                      ${(totalAmount * 1.21).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-400 space-y-2">
                <p>• Envío gratuito en pedidos superiores a €50</p>
                <p>• Garantía de devolución de 30 días</p>
                <p>• Pago 100% seguro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
