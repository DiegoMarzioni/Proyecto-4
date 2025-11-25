import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-yellow-600 mb-4">404</h1>
          <div className="w-32 h-1 bg-yellow-600 mx-auto mb-6"></div>
        </div>

        
        <h2 className="text-4xl font-light text-white mb-4">
          Página no encontrada
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link 
            href="/"
            className="inline-block bg-yellow-600 hover:bg-yellow-500 text-black px-8 py-3 rounded font-medium transition-colors"
          >
            Volver al inicio
          </Link>
          <BackButton 
            className="inline-block border border-gray-600 hover:border-gray-400 text-white px-8 py-3 rounded font-medium transition-colors"
          >
            Página anterior
          </BackButton>
        </div>

       
        <div className="mt-16 text-gray-800">
          <div className="text-6xl mb-4">🛍️</div>
          <p className="text-sm text-gray-600">
            Mientras tanto, explora nuestras categorías
          </p>
        </div>

        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
          <Link 
            href="/ropa" 
            className="text-gray-400 hover:text-yellow-600 transition-colors text-sm py-2"
          >
            Ropa
          </Link>
          <Link 
            href="/accesorios" 
            className="text-gray-400 hover:text-yellow-600 transition-colors text-sm py-2"
          >
            Accesorios
          </Link>
          <Link 
            href="/perfumes" 
            className="text-gray-400 hover:text-yellow-600 transition-colors text-sm py-2"
          >
            Perfumes
          </Link>
        </div>

        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-yellow-600 rounded-full opacity-20"></div>
          <div className="absolute top-1/3 right-20 w-3 h-3 bg-yellow-600 rounded-full opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-yellow-600 rounded-full opacity-30"></div>
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-yellow-600 rounded-full opacity-15"></div>
        </div>
      </div>
    </div>
  );
}
