'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Offer {
  id: number;
  title: string;
  discount: string;
  description: string;
  buttonText: string;
  backgroundColor: string;
  textColor: string;
  image?: string;
}

const OffersCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const offers: Offer[] = [
    {
      id: 1,
      title: "30% OFF",
      discount: "30% OFF",
      description: "Bienes seleccionados",
      buttonText: "Compra ahora",
      backgroundColor: "from-gray-800 to-gray-700",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Venta flash",
      discount: "Hasta 50% OFF",
      description: "Por tiempo limitado",
      buttonText: "Compra ahora",
      backgroundColor: "from-yellow-600 to-yellow-500",
      textColor: "text-black",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Nueva colección",
      discount: "20% OFF",
      description: "Otoño 2025",
      buttonText: "Ver colección",
      backgroundColor: "from-purple-600 to-purple-500",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Envío gratis",
      discount: "FREE",
      description: "En compras sobre $100",
      buttonText: "Comprar ahora",
      backgroundColor: "from-green-600 to-green-500",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % offers.length);
      }, 6000); 
      return () => clearInterval(interval);
    }
  }, [offers.length, isDragging]);

  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartPos(clientX);
    setPrevTranslate(currentTranslate);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const currentPosition = clientX;
    const diff = currentPosition - startPos;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleEnd = () => {
    setIsDragging(false);
    const threshold = 100;
    
    if (currentTranslate - prevTranslate < -threshold) {
      nextSlide();
    } else if (currentTranslate - prevTranslate > threshold) {
      prevSlide();
    }
    
    setCurrentTranslate(0);
    setPrevTranslate(0);
  };

  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  return (
    <section className="bg-black py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl font-light mb-12 text-center">Ofertas especiales</h2>
        
        
        <div 
          ref={carouselRef}
          className="relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={isDragging ? handleMouseMove : undefined}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-all duration-700 ease-in-out"
            style={{
              transform: `translateX(${-currentSlide * 100 + (isDragging ? (currentTranslate - prevTranslate) / (carouselRef.current?.offsetWidth || 1) * 100 : 0)}%)`,
            }}
          >
            {offers.map((offer) => (
              <div key={offer.id} className="w-full flex-shrink-0">
                <div className={`bg-gradient-to-r ${offer.backgroundColor} rounded-xl p-8 ${offer.textColor} relative overflow-hidden h-80 flex items-center shadow-2xl`}>
                  
                  
                  {offer.image && (
                    <div className="absolute inset-0 opacity-20">
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  
                  <div className={`absolute inset-0 bg-gradient-to-r ${offer.backgroundColor} opacity-80`}></div>
                  
                  
                  <div className="relative z-10 max-w-md">
                    <h3 className="text-7xl font-bold mb-3 tracking-tight">{offer.discount}</h3>
                    <p className="text-2xl mb-6 opacity-95 font-light">{offer.description}</p>
                    <button className={`px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      offer.textColor === 'text-white' 
                        ? 'bg-white hover:bg-gray-100 text-black shadow-xl' 
                        : 'bg-black hover:bg-gray-800 text-white shadow-xl'
                    }`}>
                      {offer.buttonText}
                    </button>
                  </div>
                  
                  
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/5 rounded-full -mr-14 -mb-14 animate-pulse" style={{animationDelay: '1s'}}></div>
                  
                  
                  {offer.image && (
                    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-30 hidden md:block">
                      <div className="w-32 h-32 relative">
                        <Image
                          src={offer.image}
                          alt={offer.title}
                          fill
                          className="object-cover rounded-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        
        <div className="flex justify-center mt-6 space-x-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-yellow-600' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersCarousel;
