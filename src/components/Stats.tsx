import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

function Counter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-4xl md:text-5xl font-serif font-medium text-gold mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section id="about" className="py-20 relative z-10 border-y border-white/5 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Counter end={500} suffix="+" label="Happy Clients" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Counter end={1200} suffix="+" label="Properties Sold" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Counter end={15} suffix="+" label="Years Experience" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Counter end={50} suffix="+" label="Awards Won" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
