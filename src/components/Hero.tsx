import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { ContactModal } from './ContactModal';

export function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
          alt="Luxury Mansion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border-gold/30"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
          <span className="text-sm font-medium text-gold-light uppercase tracking-wider">Premium Real Estate in India</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] tracking-tight mb-6 max-w-4xl"
        >
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark italic">Perfect</span> Property
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-light"
        >
          Discover exclusive luxury homes, modern apartments, and premium commercial spaces tailored to your lifestyle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a href="#properties">
            <Button size="lg" className="w-full sm:w-auto bg-gold hover:bg-gold-light text-background font-medium rounded-full px-8 h-14 text-base transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 group">
              View Properties
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <Button onClick={() => setIsContactOpen(true)} size="lg" variant="outline" className="w-full sm:w-auto border-white/20 hover:bg-white/5 text-foreground font-medium rounded-full px-8 h-14 text-base backdrop-blur-md transition-all hover:border-gold/50">
            Book an Appointment
          </Button>
        </motion.div>

        {/* Search/Filter Bar (Glassmorphism) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 w-full max-w-4xl glass-card rounded-full p-2 flex flex-col md:flex-row items-center gap-2"
        >
          <div className="flex-1 flex items-center px-6 py-3 w-full border-b md:border-b-0 md:border-r border-white/10">
            <MapPin className="w-5 h-5 text-gold mr-3" />
            <div className="flex flex-col text-left">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Location</span>
              <input type="text" placeholder="Mumbai, Delhi, Bangalore..." className="bg-transparent border-none outline-none text-foreground placeholder:text-foreground/40 font-medium w-full" />
            </div>
          </div>
          <div className="flex-1 flex items-center px-6 py-3 w-full border-b md:border-b-0 md:border-r border-white/10">
            <div className="flex flex-col text-left w-full">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Property Type</span>
              <select className="bg-transparent border-none outline-none text-foreground font-medium w-full appearance-none cursor-pointer">
                <option value="all" className="bg-background">All Types</option>
                <option value="villa" className="bg-background">Luxury Villa</option>
                <option value="apartment" className="bg-background">Penthouse</option>
                <option value="commercial" className="bg-background">Commercial</option>
              </select>
            </div>
          </div>
          <Button className="w-full md:w-auto bg-gold hover:bg-gold-light text-background rounded-full h-12 px-8 font-medium transition-all">
            Search
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-gold absolute top-0 left-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
