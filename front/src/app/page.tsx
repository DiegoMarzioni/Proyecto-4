import HeroSectionNew from '@/components/ui/HeroSectionNew';
import CategoriesGridNew from '@/components/ui/CategoriesGridNew';
import TrendingProductsNew from '@/components/ui/TrendingProductsNew';
import OffersCarousel from '@/components/ui/OffersCarousel';
import FeaturedCollectionsSection from '@/components/ui/FeaturedCollectionsSection';
import BrandValuesSection from '@/components/ui/BrandValuesSection';
import TestimonialsSection from '@/components/ui/TestimonialsSection';
import InstagramSection from '@/components/ui/InstagramSection';
import SponsorsSection from '@/components/ui/SponsorsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSectionNew />
      <CategoriesGridNew />
      <FeaturedCollectionsSection />
      <TrendingProductsNew />
      <BrandValuesSection />
      <OffersCarousel />
      <TestimonialsSection />
      <InstagramSection />
      <SponsorsSection />
    </div>
  );
}
