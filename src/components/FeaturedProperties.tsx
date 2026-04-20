import { motion } from 'motion/react';
import { Bed, Bath, Square, ArrowUpRight } from 'lucide-react';
import { useData } from '../lib/DataContext';
import { Link } from 'react-router-dom';

export function FeaturedProperties() {
  const { properties } = useData();

  return (
    <section id="properties" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-medium text-gold uppercase tracking-widest mb-4">Curated Selection</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-medium leading-tight">
              Featured <span className="italic text-muted-foreground">Residences</span>
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/properties"
              className="group flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold transition-colors"
            >
              View All Properties
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative rounded-2xl overflow-hidden glass-card cursor-pointer hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)] transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-medium uppercase tracking-wider border border-white/10">
                  {property.tag}
                </div>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="p-6 relative z-10 -mt-16">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="text-2xl font-serif font-medium text-foreground">{property.title}</h4>
                  <span className="text-xl font-medium text-gold">{property.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{property.location}</p>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Bed className="w-4 h-4 text-gold" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Bath className="w-4 h-4 text-gold" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Square className="w-4 h-4 text-gold" />
                    <span>{property.sqft} Sq.Ft</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
