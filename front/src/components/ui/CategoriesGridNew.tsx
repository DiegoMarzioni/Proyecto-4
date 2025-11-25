'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CategoriesGrid = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    {
      name: "Ropa",
      href: "/ropa",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      hoverImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Estilo masculino",
      itemCount: "150+ productos",
      color: "from-purple-600 to-pink-600"
    },
    {
      name: "Accesorios",
      href: "/accesorios",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      hoverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Complementa tu estilo",
      itemCount: "85+ productos",
      color: "from-blue-600 to-cyan-600"
    },
    {
      name: "Perfumes",
      href: "/perfumes",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      hoverImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Fragancias masculinas",
      itemCount: "45+ productos",
      color: "from-amber-600 to-orange-600"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6 relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-black rounded-full transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-900 rounded-full transform -translate-x-32 translate-y-32"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full text-gray-600 text-sm font-medium tracking-wider mb-6">
            EXPLORA NUESTRAS CATEGORÍAS
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
            Encuentra Tu
            <br />
            <span className="font-extralight italic">Estilo Perfecto</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Descubre nuestra cuidada selección de productos organizados para que encuentres exactamente lo que buscas.
          </p>
        </div>
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.name}
              href={category.href} 
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              
              <div className="aspect-square relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  
                  <Image
                    src={category.hoverImage}
                    alt={`${category.name} hover`}
                    fill
                    className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                      hoveredCategory === category.name 
                        ? 'opacity-100' 
                        : 'opacity-0'
                    }`}
                    style={{
                      transition: 'opacity 600ms ease-in-out, transform 700ms ease-out'
                    }}
                  />
                  
                  
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-80 transition-all duration-500`}></div>
                  
                  
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                </div>

                
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  
                  <div className="mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium tracking-wider">
                      {category.itemCount}
                    </span>
                  </div>

                  
                  <h3 className="text-2xl font-semibold mb-2 transform transition-all duration-300 group-hover:scale-110">
                    {category.name}
                  </h3>

                  
                  <p className="text-white/90 font-light mb-4 opacity-90 group-hover:opacity-100 transition-all duration-300">
                    {category.description}
                  </p>

                  
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="inline-flex items-center text-white font-medium tracking-wider text-sm">
                      Explorar
                      <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {String(index + 1).padStart(2, '0')}
                </div>

                
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${category.color} transition-all duration-500 group-hover:w-full`}></div>
              </div>
            </Link>
          ))}
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          {[
            { number: "400+", label: "Productos" },
            { number: "50+", label: "Marcas" },
            { number: "24h", label: "Envío" },
            { number: "10K+", label: "Clientes" }
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className="text-3xl md:text-4xl font-light text-gray-900 mb-2 group-hover:text-black transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="absolute top-1/4 left-8 w-2 h-12 bg-gray-200 transform rotate-45 opacity-30 hidden lg:block"></div>
      <div className="absolute bottom-1/4 right-8 w-2 h-16 bg-gray-200 transform -rotate-12 opacity-30 hidden lg:block"></div>
    </section>
  );
};

export default CategoriesGrid;
