import { FeaturedProperties } from '../components/FeaturedProperties';
import { motion } from 'motion/react';

export function PropertiesPage() {
  return (
    <div className="pt-20 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-16">
        <h1 className="text-4xl md:text-6xl font-serif font-medium">All <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark italic">Properties</span></h1>
      </motion.div>
      <FeaturedProperties />
    </div>
  );
}
