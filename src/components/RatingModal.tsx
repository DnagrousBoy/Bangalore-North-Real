import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star } from 'lucide-react';
import { Button } from './ui/button';
import { useData } from '../lib/DataContext';

export function RatingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const { addRating } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !name || !content) return;
    
    addRating({ name, rating, content });
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setRating(0);
      setName('');
      setContent('');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101] p-6"
          >
            <div className="glass-card rounded-2xl p-8 relative border border-gold/20">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 fill-gold" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">Your feedback has been published.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-serif font-medium mb-2">Rate Your Experience</h3>
                  <p className="text-muted-foreground mb-6 text-sm">We value your feedback at Bangalore North Real Estate.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="p-2 transition-transform hover:scale-110"
                        >
                          <Star 
                            className={`w-8 h-8 ${
                              (hoveredRating || rating) >= star 
                                ? 'fill-gold text-gold' 
                                : 'text-muted-foreground'
                            } transition-colors`} 
                          />
                        </button>
                      ))}
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Your Name</label>
                      <input 
                        required 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors" 
                        placeholder="John Doe" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Your Review</label>
                      <textarea 
                        required 
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors resize-none" 
                        placeholder="Tell us about your experience..." 
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={rating === 0 || !name || !content}
                      className="w-full bg-gold hover:bg-gold-light text-background font-medium rounded-lg h-12 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Rating
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
