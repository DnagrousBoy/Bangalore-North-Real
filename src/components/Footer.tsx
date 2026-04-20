import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 bg-background pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-background font-serif font-bold text-xl">
                B
              </div>
              <span className="font-serif text-xl font-semibold tracking-wide text-foreground">
                Bangalore North <span className="text-gold text-sm">Real Estate</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
              Curating India's most exceptional properties for the world's most discerning buyers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">Portfolio</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">Luxury Villas</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">Penthouses</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">Commercial Spaces</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">Off-Market Properties</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-sm text-muted-foreground hover:text-gold transition-colors">Know the Dealer</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">Our Agents</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">Press & Media</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm text-muted-foreground">Level 42, The Imperial, <br />Mumbai, MH 400034</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm text-muted-foreground">concierge@auraestates.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Bangalore North Real Estate. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/admin" className="text-xs text-muted-foreground hover:text-gold transition-colors">Admin Login</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
