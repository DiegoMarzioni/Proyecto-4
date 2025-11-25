'use client';

import Link from 'next/link';
import Image from 'next/image';
import logoNavbar from '@/assets/logo-navbar.png';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="relative text-white hover:text-yellow-400 transition-all duration-300 font-light text-sm uppercase tracking-wide group">
                <span className="relative z-10">Productos</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link href="/ropa" className="relative text-white hover:text-yellow-400 transition-all duration-300 font-light text-sm uppercase tracking-wide group">
                <span className="relative z-10">Ropa</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link href="/accesorios" className="relative text-white hover:text-yellow-400 transition-all duration-300 font-light text-sm uppercase tracking-wide group">
                <span className="relative z-10">Accesorios</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link href="/perfumes" className="relative text-white hover:text-yellow-400 transition-all duration-300 font-light text-sm uppercase tracking-wide group">
                <span className="relative z-10">Perfumes</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </nav>

            <div className="md:hidden flex items-center space-x-3">
              
              <Link href="/wishlist" className="relative p-2 hover:text-yellow-400 transition-colors group">
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold text-[10px]">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              
              
              <Link href="/cart" className="relative p-2 hover:text-yellow-400 transition-colors group">
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 7H4M7 13L5.4 7M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6M17 13H7" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-yellow-600 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold text-[10px]">
                  {totalItems}
                </span>
              </Link>
            </div>
          </div>

          
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 hover:opacity-80 transition-opacity">
            <Image 
              src={logoNavbar} 
              alt="Logo" 
              width={140} 
              height={45} 
              className="object-contain"
            />
          </Link>

          
          <div className="flex items-center space-x-4">
            
            <div className="hidden md:flex items-center space-x-4">
              
              <Link href="/wishlist" className="relative p-3 hover:text-yellow-400 transition-all duration-300 group hover:bg-white/10 rounded-full">
                <svg className="w-5 h-5 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold text-[10px] animate-pulse border-2 border-white/20">
                    {wishlistItems.length}
                  </span>
                )}
                <div className="absolute inset-0 rounded-full bg-yellow-400/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
              
              
              <Link href="/cart" className="relative p-3 hover:text-yellow-400 transition-all duration-300 group hover:bg-white/10 rounded-full">
                <svg className="w-5 h-5 text-white group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 7H4M7 13L5.4 7M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6M17 13H7" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-yellow-600 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold text-[10px] animate-bounce border-2 border-white/20">
                  {totalItems}
                </span>
                <div className="absolute inset-0 rounded-full bg-yellow-400/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            </div>

            
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/profile"
                    className="text-white hover:text-yellow-400 transition-colors text-sm flex items-center space-x-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Hola, {user?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="group relative overflow-hidden bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 uppercase tracking-wide"
                  >
                    <span className="relative z-10">Salir</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login"
                    className="relative group text-white hover:text-yellow-400 transition-all duration-300 px-4 py-2 text-sm font-light uppercase tracking-wide"
                  >
                    <span className="relative z-10">Ingresar</span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                  <Link 
                    href="/register"
                    className="group relative overflow-hidden bg-white hover:bg-gray-100 text-black px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white/25 uppercase tracking-wide"
                  >
                    <span className="relative z-10">Registro</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </Link>
                </>
              )}
            </div>

            
            <button 
              className="md:hidden p-2 hover:text-yellow-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        
        {isMenuOpen && (
          <div className="md:hidden mt-8 mx-4">
            
            <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
              
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-purple-600/10 pointer-events-none"></div>
              
              <nav className="relative z-10 p-8 space-y-6">
                
                <div className="space-y-4">
                  <Link 
                    href="/products" 
                    className="block text-white hover:text-yellow-400 transition-all duration-300 font-light text-xl uppercase tracking-wider hover:translate-x-2 hover:scale-105 py-2 px-4 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Productos
                  </Link>
                  <Link 
                    href="/ropa" 
                    className="block text-white hover:text-yellow-400 transition-all duration-300 font-light text-xl uppercase tracking-wider hover:translate-x-2 hover:scale-105 py-2 px-4 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ropa
                  </Link>
                  <Link 
                    href="/accesorios" 
                    className="block text-white hover:text-yellow-400 transition-all duration-300 font-light text-xl uppercase tracking-wider hover:translate-x-2 hover:scale-105 py-2 px-4 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Accesorios
                  </Link>
                  <Link 
                    href="/perfumes" 
                    className="block text-white hover:text-yellow-400 transition-all duration-300 font-light text-xl uppercase tracking-wider hover:translate-x-2 hover:scale-105 py-2 px-4 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Perfumes
                  </Link>
                </div>

                
                <div className="space-y-4 pt-6">
                  {isAuthenticated ? (
                    <>
                      <div className="text-center text-white text-lg mb-4">
                        Hola, {user?.name}
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-600/25 hover:scale-105 uppercase tracking-wide"
                      >
                        Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/login"
                        className="block text-center text-white hover:text-yellow-400 transition-all duration-300 font-light text-lg py-3 px-6 rounded-xl border border-white/20 hover:border-yellow-400/50 hover:bg-white/10 hover:scale-105 uppercase tracking-wide"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Ingresar
                      </Link>
                      <Link 
                        href="/register"
                        className="block text-center bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 hover:scale-105 uppercase tracking-wide"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Registro
                      </Link>
                    </>
                  )}
                </div>
              </nav>
              
              
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;
