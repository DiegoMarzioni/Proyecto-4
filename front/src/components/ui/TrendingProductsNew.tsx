'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/interfaces/product.interface';

interface ExtendedProduct extends Product {
  hoverImage?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  originalPrice?: number;
  discount?: string;
}

interface TrendingProductsProps {
  products?: ExtendedProduct[];
}

const TrendingProducts = ({ products }: TrendingProductsProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const router = useRouter();

  const sampleProducts = [
    {
      id: 1,
      name: "Camisa Elegante",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      hoverImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "25% OFF",
      category: "Camisas",
      rating: 4.8,
      reviews: 124,
      isNew: false,
      isBestseller: true
    },
    {
      id: 2,
      name: "Billetera Premium",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      hoverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "25% OFF",
      category: "Accesorios",
      rating: 4.9,
      reviews: 89,
      isNew: true,
      isBestseller: false
    },
    {
      id: 3,
      name: "Sneakers Urbanos",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      hoverImage: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "25% OFF",
      category: "Calzado",
      rating: 4.7,
      reviews: 203,
      isNew: false,
      isBestseller: true
    },
    {
      id: 4,
      name: "Gafas de Sol",
      price: 159.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      hoverImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "20% OFF",
      category: "Gafas",
      rating: 4.6,
      reviews: 156,
      isNew: true,
      isBestseller: false
    },
    {
      id: 5,
      name: "Jeans Slim Fit",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      hoverImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "19% OFF",
      category: "Pantalones",
      rating: 4.9,
      reviews: 178,
      isNew: false,
      isBestseller: true
    },
    {
      id: 6,
      name: "Chaqueta de Cuero",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      hoverImage: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      discount: "25% OFF",
      category: "Chaquetas",
      rating: 4.8,
      reviews: 92,
      isNew: true,
      isBestseller: false
    }
  ];

  const displayProducts = products || sampleProducts;

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black py-20 px-6 relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium tracking-wider mb-6">
            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
            TRENDING NOW
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wide">
            Productos
            <br />
            <span className="font-extralight italic text-yellow-400">En Tendencia</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Descubre las piezas más deseadas del momento, seleccionadas por nuestro equipo de expertos en moda.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(index)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                
                <div className="relative h-80 overflow-hidden">
                  
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  
                  {product.hoverImage && (
                    <Image
                      src={product.hoverImage}
                      alt={`${product.name} hover`}
                      fill
                      className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                        hoveredProduct === index 
                          ? 'opacity-100' 
                          : 'opacity-0'
                      }`}
                      style={{
                        transition: 'opacity 600ms ease-in-out, transform 700ms ease-out'
                      }}
                    />
                  )}

                  
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        NUEVO
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
                        BESTSELLER
                      </span>
                    )}
                    {product.discount && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  
                  <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-opacity duration-300 ${
                    hoveredProduct === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 group/btn">
                      <svg className="w-5 h-5 text-gray-700 group-hover/btn:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 group/btn">
                      <svg className="w-5 h-5 text-gray-700 group-hover/btn:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>

                  
                  <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredProduct === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button className="bg-white hover:bg-gray-100 text-black px-6 py-3 font-semibold tracking-wider uppercase text-sm transition-all duration-300 transform hover:scale-105">
                      Agregar al Carrito
                    </button>
                  </div>
                </div>

                
                <div className="p-6">
                  
                  <p className="text-gray-500 text-sm font-medium tracking-wider uppercase mb-2">
                    {product.category}
                  </p>

                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-black transition-colors duration-300">
                    {product.name}
                  </h3>

                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">
                      {product.rating || 0} ({product.reviews || 0} reseñas)
                    </span>
                  </div>

                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        €{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          €{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 group-hover:w-full"></div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="text-center mt-16">
          <button 
            onClick={() => router.push('/products')}
            className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-black font-semibold tracking-wider uppercase transition-all duration-300 transform hover:scale-105 rounded-full cursor-pointer"
          >
            Ver Todos los Productos
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      
      <div className="absolute top-20 left-8 w-2 h-16 bg-white/10 transform rotate-45 hidden lg:block"></div>
      <div className="absolute bottom-20 right-8 w-2 h-20 bg-white/10 transform -rotate-12 hidden lg:block"></div>
    </section>
  );
};

export default TrendingProducts;
