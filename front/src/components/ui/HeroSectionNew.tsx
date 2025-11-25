'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <div 
          className={`w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 ${
            isLoaded ? 'scale-105' : 'scale-100'
          }`}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        ></div>
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>

      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        
        <p className={`text-white/80 text-sm uppercase tracking-[0.2em] mb-4 font-light transition-all duration-1000 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          Colección Masculina 2025
        </p>
        
        {/* Main title with staggered animation */}
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-extralight leading-tight mb-8 tracking-wide">
          <span className={`inline-block transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Style
          </span>
          <br />
          <span className={`inline-block font-light transition-all duration-1000 ease-out delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            & Elegance
          </span>
        </h1>
        
        
        <button 
          onClick={() => router.push('/products')}
          className={`bg-black hover:bg-gray-900 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-200 transform hover:scale-105 border border-white/20 hover:border-white/40 hover:shadow-2xl hover:shadow-white/10 cursor-pointer ${
            isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
          style={{ 
            transitionDelay: isLoaded ? '200ms' : '0ms',
            boxShadow: isLoaded ? '0 10px 30px rgba(255,255,255,0.1)' : 'none'
          }}
        >
          Ver Colección
        </button>
      </div>

      
      <div className={`absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block transition-all duration-1000 ease-out delay-1000 ${
        isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-0.5 h-16 bg-white/30 transform transition-all duration-500 hover:bg-white/60"></div>
          <span className="text-white/60 text-xs tracking-wider transition-colors duration-300 hover:text-white/90">01</span>
          <div className="w-0.5 h-16 bg-white/30 transform transition-all duration-500 hover:bg-white/60"></div>
        </div>
      </div>
      
      
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 transition-all duration-1000 ease-out delay-1200 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex flex-col items-center space-y-4 group cursor-pointer" 
             onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          
          
          <span className="text-xs uppercase tracking-[0.2em] group-hover:text-white/90 transition-colors duration-300 font-light">
            Descubre Más
          </span>
          
          
          <div className="relative">
            
            <div className="w-6 h-10 border-2 border-white/40 rounded-full group-hover:border-white/70 transition-colors duration-300 relative">
              
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-white/60 rounded-full animate-scroll-wheel group-hover:bg-white/90 transition-colors duration-300"></div>
            </div>
          </div>
          
          
          <div className="flex flex-col items-center space-y-1">
            <svg className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-all duration-300 animate-bounce-arrow-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <svg className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-all duration-300 animate-bounce-arrow-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      
      <div className="absolute inset-0 pointer-events-none">
        {isLoaded && [...Array(8)].map((_, i) => {
          const positions = [
            { left: '6.77%', top: '72.61%' },
            { left: '63.05%', top: '60.38%' },
            { left: '20.16%', top: '76.68%' },
            { left: '85.23%', top: '25.45%' },
            { left: '45.12%', top: '15.89%' },
            { left: '78.94%', top: '65.33%' },
            { left: '12.67%', top: '40.22%' },
            { left: '55.88%', top: '85.11%' }
          ];
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full transition-all duration-2000 ease-out opacity-100"
              style={{
                left: positions[i].left,
                top: positions[i].top,
                animationDelay: `${i * 0.5}s`,
                animation: 'float 6s infinite ease-in-out alternate'
              }}
            />
          );
        })}
      </div>

      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
          100% { transform: translateY(-40px) scale(0.9); opacity: 0.3; }
        }
        
        @keyframes scroll-wheel {
          0% { transform: translateY(-3px); opacity: 0; }
          50% { transform: translateY(3px); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        
        @keyframes bounce-arrow-1 {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
        
        @keyframes bounce-arrow-2 {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          60% { transform: translateY(-3px); }
        }
        
        .animate-scroll-wheel {
          animation: scroll-wheel 2s infinite ease-in-out;
        }
        
        .animate-bounce-arrow-1 {
          animation: bounce-arrow-1 2s infinite ease-in-out;
        }
        
        .animate-bounce-arrow-2 {
          animation: bounce-arrow-2 2s infinite ease-in-out 0.3s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
