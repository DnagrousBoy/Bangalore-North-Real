import { motion } from 'motion/react';
import { Star, Award, Shield, Users } from 'lucide-react';
import { useData } from '../lib/DataContext';

export function Dealer() {
  const { dealerInfo } = useData();

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6">Know the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark italic">Dealer</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {dealerInfo.headerDesc}
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl overflow-hidden glass-card p-2 border border-gold/20 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
          <img src={dealerInfo.imageUrl} alt="Executive Portrait" className="w-full h-[500px] object-cover rounded-xl" />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
          <div>
            <h3 className="text-3xl font-serif text-gold mb-4">{dealerInfo.legacyTitle}</h3>
            <p className="text-muted-foreground content-relaxed text-lg font-light leading-relaxed mb-4">
              {dealerInfo.legacyDesc1}
            </p>
            <p className="text-muted-foreground content-relaxed text-lg font-light leading-relaxed">
              {dealerInfo.legacyDesc2}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-4">
            {[
              { icon: Shield, title: "Unmatched Discretion", desc: "Your privacy is our utmost priority." },
              { icon: Star, title: "Exclusive Portfolio", desc: "Access to off-market premium listings." },
              { icon: Award, title: "Award Winning", desc: "Recognized nationally for excellence." },
              { icon: Users, title: "Client First", desc: "Dedicated concierge-level service." },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-xl border border-white/5 hover:border-gold/30 transition-colors group">
                <item.icon className="w-8 h-8 text-gold mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-medium text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
