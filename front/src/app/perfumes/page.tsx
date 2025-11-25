'use client';

import ProductsView from '@/components/ui/ProductsView';

export default function PerfumesPage() {
  return (
    <ProductsView
      title={<><span className="text-yellow-400">Perfumes</span> de Lujo</>}
      subtitle="Fragancias exclusivas que definen tu personalidad única"
      categoryId={3}
      searchPlaceholder="Buscar perfumes..."
      breadcrumbsData={[
        { label: 'Inicio', href: '/' },
        { label: 'Perfumes', href: '/perfumes' }
      ]}
    />
  );
}
