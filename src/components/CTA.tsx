import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function CTA() {
  return (
    <section className="py-32 relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-[3rem] p-12 md:p-20 border border-gold/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-50" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-medium leading-tight mb-6">
              Ready to find your <br />
              <span className="italic text-gold">dream home?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto font-light">
              Connect with our elite property advisors today and gain access to India's most exclusive real estate portfolio.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-gold hover:bg-gold-light text-background font-medium rounded-full px-8 h-14 text-base transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 group">
                Schedule a Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 text-foreground font-medium rounded-full px-8 h-14 text-base backdrop-blur-md transition-all hover:border-gold/50">
                Browse Portfolio
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
