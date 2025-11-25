'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  customItems?: BreadcrumbItem[];
}

export default function Breadcrumbs({ customItems }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;
    
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Inicio', href: '/' }
    ];
    
    let href = '';
    pathSegments.forEach((segment) => {
      href += `/${segment}`;
      
      
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (segment === 'products') label = 'Productos';
      if (segment === 'cart') label = 'Carrito';
      if (segment === 'profile') label = 'Perfil';
      if (segment === 'wishlist') label = 'Lista de Deseos';
      
      breadcrumbs.push({ label, href });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index === 0 ? (
            <Link 
              href={breadcrumb.href}
              className="flex items-center hover:text-yellow-400 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
              </svg>
              <span>{breadcrumb.label}</span>
            </Link>
          ) : (
            <>
              <svg className="w-4 h-4 mx-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
              </svg>
              {index === breadcrumbs.length - 1 ? (
                <span className="text-yellow-400 font-medium">{breadcrumb.label}</span>
              ) : (
                <Link 
                  href={breadcrumb.href}
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </>
          )}
        </div>
      ))}
    </nav>
  );
}