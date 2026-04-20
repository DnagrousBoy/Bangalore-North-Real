import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ContactModal } from './ContactModal';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset mobile menu on route change
    setIsMobileMenuOpen(false);
    
    // Slight timeout ensures the new page DOM is painted before we scroll
    setTimeout(() => {
      if (!location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 50);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Know the Dealer', href: '/dealer' },
    { name: 'Testimonials', href: '/#testimonials' },
  ];

  return (
    <>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative z-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-background font-serif font-bold text-xl group-hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-shadow">
              B
            </div>
            <span className="font-serif text-xl font-semibold tracking-wide text-foreground">
              Bangalore North <span className="text-gold text-sm">Real Estate</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button 
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="bg-gold hover:bg-gold-light text-background font-medium rounded-full px-6 transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105"
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden text-foreground p-2 relative z-30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/10 mt-3 overflow-hidden origin-top relative z-10"
            >
              <ul className="flex flex-col px-6 py-4 gap-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="block text-lg font-medium text-foreground hover:text-gold transition-colors p-2 -m-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Button 
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsContactOpen(true);
                    }}
                    className="w-full bg-gold hover:bg-gold-light text-background font-medium rounded-full mt-2 h-12 text-base"
                  >
                    <Phone className="w-5 h-5 mr-3" /> Call Now
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
