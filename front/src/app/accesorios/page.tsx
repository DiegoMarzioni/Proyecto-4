'use client';

import ProductsView from '@/components/ui/ProductsView';

export default function AccesoriosPage() {
  return (
    <ProductsView
      title={<><span className="text-yellow-400">Accesorios</span> Exclusivos</>}
      subtitle="Complementa tu estilo con nuestros accesorios únicos y elegantes"
      categoryId={2}
      searchPlaceholder="Buscar accesorios..."
      breadcrumbsData={[
        { label: 'Inicio', href: '/' },
        { label: 'Accesorios', href: '/accesorios' }
      ]}
    />
  );
}
