'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Carlos Martinez",
      role: "Executive Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "La calidad de la ropa es excepcional. Cada pieza cuenta una historia y se siente única. Definitivamente mi marca favorita para el trabajo.",
      rating: 5,
      location: "Madrid, España"
    },
    {
      id: 2,
      name: "Diego Rodriguez",
      role: "CEO & Entrepreneur",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "Increíble atención al detalle. La ropa no solo se ve bien, sino que también es cómoda para el día a día profesional y personal.",
      rating: 5,
      location: "Buenos Aires, Argentina"
    },
    {
      id: 3,
      name: "Alejandro Torres",
      role: "Model & Influencer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "Cada outfit me hace sentir seguro y elegante. La marca entiende perfectamente el estilo masculino moderno.",
      rating: 5,
      location: "México DF, México"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-black rounded-full transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-900 rounded-full transform translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full text-gray-600 text-sm font-medium tracking-wider mb-6">
            TESTIMONIALES
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
            Lo Que Dicen
            <br />
            <span className="font-extralight italic">Nuestros Clientes</span>
          </h2>
        </div>

        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            
            <div className="absolute top-8 left-8 text-gray-100 text-6xl font-serif">
              &ldquo;
            </div>

            
            <div className="relative z-10 text-center">
              
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonialData.rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              
              <blockquote className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-8 italic">
                {currentTestimonialData.content}
              </blockquote>

              
              <div className="flex items-center justify-center space-x-4">
                <Image
                  src={currentTestimonialData.image}
                  alt={currentTestimonialData.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {currentTestimonialData.name}
                  </h4>
                  <p className="text-gray-600 text-sm font-medium">
                    {currentTestimonialData.role}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {currentTestimonialData.location}
                  </p>
                </div>
              </div>
            </div>

            
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-yellow-400/20 to-transparent"></div>
          </div>

          
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-black scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          {[
            { number: "10K+", label: "Clientes Felices" },
            { number: "99%", label: "Satisfacción" },
            { number: "500+", label: "Reseñas 5★" },
            { number: "24h", label: "Envío Express" }
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
    </section>
  );
};

export default TestimonialsSection;
