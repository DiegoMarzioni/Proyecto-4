'use client';

import ProductsView from '@/components/ui/ProductsView';

export default function ProductsPage() {
  return (
    <ProductsView
      title={<>Todos los <span className="text-yellow-400">Productos</span></>}
      subtitle="Descubre nuestra colección completa de productos exclusivos"
      searchPlaceholder="Buscar productos..."
      breadcrumbsData={[
        { label: 'Inicio', href: '/' },
        { label: 'Productos', href: '/products' }
      ]}
    />
  );
}
