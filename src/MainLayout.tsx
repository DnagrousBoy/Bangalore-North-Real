import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export function MainLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold/30 selection:text-gold-light">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-background font-serif font-bold text-3xl mb-8 animate-pulse shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              B
            </div>
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1/2 h-full bg-gold rounded-full"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col min-h-screen"
          >
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
            
            {/* Floating WhatsApp Button */}
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all hover:scale-110"
              aria-label="Contact on WhatsApp"
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.124.553 4.179 1.602 6.002L.031 24l6.14-1.602A11.96 11.96 0 0012.031 24c6.648 0 12.031-5.383 12.031-12.031C24.062 5.383 18.679 0 12.031 0zm0 22.016c-1.812 0-3.586-.484-5.14-1.406l-.367-.219-3.82.992.992-3.82-.219-.367A9.96 9.96 0 012.016 12.03c0-5.516 4.484-10 10.015-10 5.516 0 10.016 4.484 10.016 10s-4.5 10-10.016 10zm5.492-7.516c-.305-.148-1.789-.883-2.062-.984-.281-.102-.484-.148-.688.148-.203.305-.781.984-.961 1.188-.18.203-.359.227-.664.078-1.547-.75-2.68-1.477-3.68-3.32-.102-.18-.016-.281.062-.359.07-.07.148-.18.227-.281.078-.102.102-.18.148-.281.055-.125.023-.227-.016-.305-.039-.078-.688-1.656-.938-2.266-.25-.602-.492-.516-.688-.516h-.586c-.203 0-.531.078-.812.383-.281.305-1.078 1.055-1.078 2.57 0 1.516 1.102 2.984 1.258 3.188.148.203 2.172 3.32 5.258 4.656 2.031.883 2.844.961 3.844.805.805-.125 2.445-.992 2.789-1.953.344-.961.344-1.789.242-1.953-.102-.172-.383-.273-.688-.422z" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
