import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';

export function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <FeaturedProperties />
      <Testimonials />
      <CTA />
    </div>
  );
}
