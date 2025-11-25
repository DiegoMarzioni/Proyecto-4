'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedCollectionsSection = () => {
  const [hoveredCollection, setHoveredCollection] = useState<number | null>(null);

  const collections = [
    {
      id: 1,
      title: "Executive Style",
      subtitle: "Colección Ejecutiva 2025",
      description: "Piezas sofisticadas para el hombre moderno que busca elegancia en cada detalle profesional.",
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      products: 24,
      priceRange: "€89 - €299",
      badge: "Nueva",
      link: "/collections/executive-style"
    },
    {
      id: 2,
      title: "Urban Casual",
      subtitle: "Estilo Urbano",
      description: "Combinaciones perfectas entre comodidad y estilo para el día a día en la ciudad moderna.",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      products: 18,
      priceRange: "€45 - €159",
      badge: "Bestseller",
      link: "/collections/urban-casual"
    },
    {
      id: 3,
      title: "Night Out",
      subtitle: "Salidas Nocturnas",
      description: "Diseños exclusivos para ocasiones especiales que te harán destacar con elegancia.",
      image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      products: 12,
      priceRange: "€129 - €399",
      badge: "Exclusiva",
      link: "/collections/night-out"
    }
  ];

  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case 'Nueva':
        return 'bg-green-500 text-white';
      case 'Bestseller':
        return 'bg-yellow-500 text-black';
      case 'Exclusiva':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-black rounded-full transform -translate-y-32"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-900 rounded-full transform translate-y-48"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full text-gray-600 text-sm font-medium tracking-wider mb-6">
            COLECCIONES DESTACADAS
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-wide">
            Descubre Nuestras
            <br />
            <span className="font-extralight italic">Colecciones</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Cada colección cuenta una historia única, diseñada para complementar tu estilo personal y adaptarse a cada momento de tu vida.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="group relative"
              onMouseEnter={() => setHoveredCollection(index)}
              onMouseLeave={() => setHoveredCollection(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${getBadgeStyles(collection.badge)}`}>
                    {collection.badge}
                  </div>

                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  
                  <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                    hoveredCollection === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link
                        href={collection.link}
                        className="bg-white hover:bg-gray-100 text-black px-6 py-3 font-semibold tracking-wider uppercase text-sm transition-all duration-300 transform hover:scale-105"
                      >
                        Ver Colección
                      </Link>
                    </div>
                  </div>
                </div>

                
                <div className="p-6">
                  
                  <div className="mb-4">
                    <p className="text-gray-500 text-sm font-medium tracking-wider uppercase mb-1">
                      {collection.subtitle}
                    </p>
                    <h3 className="text-2xl font-light text-gray-900 group-hover:text-black transition-colors duration-300">
                      {collection.title}
                    </h3>
                  </div>

                  
                  <p className="text-gray-600 font-light leading-relaxed mb-4">
                    {collection.description}
                  </p>

                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">
                      {collection.products} piezas
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {collection.priceRange}
                    </span>
                  </div>
                </div>

                
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-black transition-all duration-500 group-hover:w-full"></div>
              </div>

              
              <div className="absolute -right-4 top-8 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-light text-lg z-10 group-hover:bg-gray-800 transition-colors duration-300">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        
        <div className="text-center mt-16">
          <Link
            href="/collections"
            className="inline-flex items-center px-8 py-4 bg-black hover:bg-gray-800 text-white font-medium tracking-wider uppercase transition-all duration-300 transform hover:scale-105 rounded-full"
          >
            Ver Todas las Colecciones
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      
      <div className="absolute top-1/4 left-8 w-2 h-16 bg-gray-200 transform rotate-45 opacity-30 hidden lg:block"></div>
      <div className="absolute bottom-1/4 right-8 w-2 h-20 bg-gray-200 transform -rotate-12 opacity-30 hidden lg:block"></div>
    </section>
  );
};

export default FeaturedCollectionsSection;
