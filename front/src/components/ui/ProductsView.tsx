'use client';

import { useState, useMemo, ReactNode } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
import SearchBar from '@/components/ui/SearchBar';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useProducts } from '@/hooks/useProducts';

interface ProductsViewProps {
  title: string | ReactNode;
  subtitle: string;
  categoryId?: number;
  searchPlaceholder?: string;
  breadcrumbsData?: Array<{ href: string; label: string }>;
}

const ProductsView = ({ 
  title, 
  subtitle, 
  categoryId, 
  searchPlaceholder = "Buscar productos...",
  breadcrumbsData 
}: ProductsViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryId ? categoryId.toString() : 'all');
  const [sortBy, setSortBy] = useState('name');
  
  const { products, categories, loading, error } = useProducts();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      const categoryIdToFilter = parseInt(selectedCategory);
      filtered = filtered.filter(product =>
        product.categoryId === categoryIdToFilter
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, products, sortBy]);

  const categoryList = categoryId 
    ? [categoryId.toString()]
    : ['all', ...categories.map(cat => cat.id.toString())];

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mb-6">
            <div className="h-5 bg-gray-800 rounded w-32 animate-pulse"></div>
          </div>
          
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-12 bg-gray-800 rounded-lg w-80 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-800 rounded w-96 mx-auto mb-8 animate-pulse"></div>
            
            <div className="h-12 bg-gray-800 rounded-xl w-full max-w-md mx-auto animate-pulse"></div>
          </div>

          {!categoryId && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-800 rounded-full w-20 animate-pulse"></div>
              ))}
            </div>
          )}

          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="h-4 bg-gray-800 rounded w-20 animate-pulse"></div>
              <div className="h-10 bg-gray-800 rounded-lg w-40 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(12)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-2xl font-light text-red-400 mb-4">Error al cargar productos</h2>
            <p className="text-gray-500 mb-8">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs customItems={breadcrumbsData} />
        
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
          
          <SearchBar 
            onSearch={handleSearch}
            placeholder={searchPlaceholder}
          />
        </div>

        {!categoryId && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categoryList.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category === 'all' ? 'Todos' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
            >
              <option value="name">Nombre A-Z</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {(searchQuery || selectedCategory !== 'all') && (
          <div className="mb-8 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
            <p className="text-gray-300 text-center">
              {filteredProducts.length === 0 ? 'No se encontraron productos' : 
               `Mostrando ${filteredProducts.length} ${filteredProducts.length === 1 ? 'producto' : 'productos'}`}
              {searchQuery && (
                <span> para <span className="text-yellow-400 font-medium">&ldquo;{searchQuery}&rdquo;</span></span>
              )}
              {selectedCategory !== 'all' && !categoryId && (
                <span> en <span className="text-yellow-400 font-medium">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</span></span>
              )}
            </p>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h2 className="text-2xl font-light text-gray-400 mb-4">No se encontraron productos</h2>
              <p className="text-gray-500 mb-8">
                {categoryId 
                  ? `No hay productos disponibles en esta categoría` 
                  : 'Prueba con otros términos de búsqueda o categorías'
                }
              </p>
            </div>
            {!categoryId && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Ver Todos los Productos
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsView;