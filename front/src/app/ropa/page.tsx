'use client';

import ProductsView from '@/components/ui/ProductsView';

export default function RopaPage() {
  return (
    <ProductsView
      title={<>Colección de <span className="text-yellow-400">Ropa</span></>}
      subtitle="Descubre nuestra exclusiva selección de prendas de la más alta calidad"
      categoryId={1}
      searchPlaceholder="Buscar ropa..."
      breadcrumbsData={[
        { label: 'Inicio', href: '/' },
        { label: 'Ropa', href: '/ropa' }
      ]}
    />
  );
}
