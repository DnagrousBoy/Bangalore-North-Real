import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { RatingModal } from './RatingModal';
import { useData } from '../lib/DataContext';

export function Testimonials() {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const { ratings } = useData();

  return (
    <section id="testimonials" className="py-32 relative z-10 bg-secondary/50">
      <RatingModal isOpen={isRatingOpen} onClose={() => setIsRatingOpen(false)} />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium text-gold uppercase tracking-widest mb-4"
          >
            Client Success
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-8"
          >
            Trusted by <span className="italic text-muted-foreground">Visionaries</span>
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button onClick={() => setIsRatingOpen(true)} className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-background font-medium rounded-full px-8 py-3 transition-all">
              Give Ratings
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ratings.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card p-8 rounded-2xl relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5" />
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground font-serif text-xl border border-white/10">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
