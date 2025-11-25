const BrandValuesSection = () => {
  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Entrega Express",
      description: "Recibe tu pedido en 24-48h en toda España",
      detail: "Envío gratuito en compras superiores a €50"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Garantía Total",
      description: "30 días para cambios y devoluciones",
      detail: "Sin preguntas, sin complicaciones"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Materiales Premium",
      description: "Calidad excepcional en cada fibra",
      detail: "Seleccionados éticamente y sostenibles"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: "Atención 24/7",
      description: "Soporte personalizado siempre disponible",
      detail: "Chat, email o teléfono cuando lo necesites"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-2 h-20 bg-black transform rotate-45"></div>
        <div className="absolute top-32 right-20 w-2 h-16 bg-black transform -rotate-12"></div>
        <div className="absolute bottom-20 left-32 w-2 h-24 bg-black transform rotate-12"></div>
        <div className="absolute bottom-10 right-10 w-2 h-18 bg-black transform -rotate-45"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full text-gray-600 text-sm font-medium tracking-wider mb-6">
            ¿POR QUÉ ELEGIRNOS?
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
            Comprometidos Con
            <br />
            <span className="font-extralight italic">Tu Experiencia</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Cada detalle importa. Desde la selección de materiales hasta el momento en que recibes tu pedido.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="group text-center">
              
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-6 group-hover:bg-gray-800 transition-all duration-300 transform group-hover:scale-110">
                {value.icon}
              </div>

              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-black transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-gray-600 font-medium mb-2">
                {value.description}
              </p>
              <p className="text-gray-400 text-sm font-light">
                {value.detail}
              </p>

              
              <div className="w-0 h-0.5 bg-black mx-auto mt-4 group-hover:w-12 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-500 font-light tracking-wider">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              +10.000 clientes satisfechos
            </span>
            <span className="hidden md:block">•</span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
              4.9/5 puntuación media
            </span>
            <span className="hidden md:block">•</span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Confianza desde 2020
            </span>
          </div>
        </div>
      </div>

      
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-24 h-24 border border-gray-200 rounded-full opacity-20"></div>
      <div className="absolute right-0 top-1/3 transform -translate-y-1/2 translate-x-1/2 w-32 h-32 border border-gray-200 rounded-full opacity-20"></div>
    </section>
  );
};

export default BrandValuesSection;
