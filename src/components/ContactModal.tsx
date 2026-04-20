import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { useData } from '../lib/DataContext';

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const { addAppointment, appointments } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !phone || !date || !time) return;

    const isBooked = appointments.some(apt => apt.date === date && apt.time === time && apt.status !== 'completed');
    if (isBooked) {
      setError('Appointment already booked at that time, please choose other date or time');
      return;
    }

    addAppointment({ name, phone, date, time });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setPhone('');
      setDate('');
      setTime('');
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
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-medium mb-2">Request Sent</h3>
                  <p className="text-muted-foreground">Our agent will contact you shortly.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-serif font-medium mb-2">Book an Appointment</h3>
                  <p className="text-muted-foreground mb-6 text-sm">Schedule a private viewing with our luxury property experts.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Name</label>
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
                      <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors" 
                        placeholder="+91 98765 43210" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Preferred Date</label>
                        <input 
                          required 
                          type="date" 
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Preferred Time</label>
                        <input 
                          required 
                          type="time" 
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors" 
                        />
                      </div>
                    </div>
                    {error && (
                      <div className="p-3 bg-destructive/20 border border-destructive/50 rounded-lg text-destructive text-sm">
                        {error}
                      </div>
                    )}
                    <Button type="submit" disabled={!name || !phone || !date || !time} className="w-full bg-gold hover:bg-gold-light text-background font-medium rounded-lg h-12 mt-4 transition-all disabled:opacity-50">
                      Confirm Appointment
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
