'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const SponsorsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sponsors = [
    { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/en/d/da/Puma_complete_logo.svg" },
    { name: "Under Armour", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg" },
    { name: "Calvin Klein", logo: "https://cdn.worldvectorlogo.com/logos/calvin-klein-1.svg" },
    { name: "Tommy Hilfiger", logo: "https://cdn.worldvectorlogo.com/logos/tommy-hilfiger-2.svg" },
    { name: "Converse", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg" }
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sponsors.length]);

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-100 to-white overflow-hidden">
      
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10 10'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full text-gray-600 text-sm font-medium tracking-wider mb-6">
            MARCAS PARTNER
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-wide">
            Trabajamos Con Las
            <br />
            <span className="font-extralight italic">Mejores Marcas</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
            Colaboramos con marcas reconocidas mundialmente para ofrecerte la mejor calidad y variedad.
          </p>
        </div>

        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / 4)}%)`,
              width: `${sponsors.length * 25}%`
            }}
          >
            {sponsors.map((sponsor, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-1/4 px-8 flex items-center justify-center"
              >
                <div className="group relative w-32 h-20 flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={96}
                    height={48}
                    style={{ height: "auto" }}
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="flex justify-center mt-8 space-x-2">
          {sponsors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-black scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-2xl font-light text-gray-900 mb-1">50+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">Marcas</div>
          </div>
          <div>
            <div className="text-2xl font-light text-gray-900 mb-1">1000+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">Productos</div>
          </div>
          <div>
            <div className="text-2xl font-light text-gray-900 mb-1">15+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wide">Años</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;