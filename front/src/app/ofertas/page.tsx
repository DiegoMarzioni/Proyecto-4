'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import OffersCarousel from '@/components/ui/OffersCarousel';
import SearchBar from '@/components/ui/SearchBar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';

export default function OfertasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const router = useRouter();
  const { products, loading, error } = useProducts();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  
  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-black">
      
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-light text-white mb-6">
            <span className="text-yellow-400">Ofertas</span> Especiales
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Los mejores descuentos en productos seleccionados
          </p>
          
          
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Buscar ofertas..."
          />
          
          
          {searchQuery && (
            <div className="mb-8 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
              <p className="text-gray-300">
                Mostrando resultados para: <span className="text-yellow-400 font-medium">&ldquo;{searchQuery}&rdquo;</span>
              </p>
            </div>
          )}
        </div>
      </section>

      
      <OffersCarousel />

      
      <section className="bg-gradient-to-b from-black via-gray-900 to-black py-20 px-6 relative overflow-hidden">
        
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium tracking-wider mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              {loading ? 'CARGANDO...' : `${filteredProducts.length} OFERTAS DISPONIBLES`}
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wide">
              Todos los
              <br />
              <span className="font-extralight italic text-yellow-400">Productos en Oferta</span>
            </h2>
          </div>

          
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          )}

          
          {error && (
            <div className="text-center">
              <div className="text-red-400 text-lg">
                Error al cargar ofertas: {error}
              </div>
            </div>
          )}

          
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center">
              <div className="text-gray-400 text-lg">
                {searchQuery 
                  ? `No se encontraron ofertas que coincidan con &ldquo;${searchQuery}&rdquo;`
                  : 'No hay ofertas disponibles en este momento'
                }
              </div>
            </div>
          )}

          
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredProduct(index)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2">
                    
                    
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={product.image || "/api/placeholder/400/400"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full animate-pulse">
                          OFERTA ESPECIAL
                        </span>
                        <span className="px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                          -{Math.floor(Math.random() * 30 + 10)}%
                        </span>
                      </div>

                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => router.push(`/products/${product.id}`)}
                          className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200 transform translate-y-4 group-hover:translate-y-0"
                        >
                          Ver Oferta
                        </button>
                      </div>
                    </div>

                    
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-red-400 text-sm font-medium tracking-wider">
                          {product.category?.name.toUpperCase()} EN OFERTA
                        </span>
                      </div>
                      
                      <h3 className="text-white text-xl font-light mb-3 line-clamp-2 group-hover:text-red-400 transition-colors duration-200">
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-white text-2xl font-light">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-gray-500 line-through text-lg">
                            ${(product.price * 1.3).toFixed(2)}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400 text-xs">
                            Stock: {product.stock}
                          </div>
                        </div>
                      </div>
                    </div>

                    
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'linear-gradient(45deg, transparent 30%, rgba(239,68,68,0.1) 50%, transparent 70%)',
                          transform: hoveredProduct === index ? 'translateX(100%)' : 'translateX(-100%)',
                          transition: 'transform 0.6s ease-in-out'
                        }}>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
