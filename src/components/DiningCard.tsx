import { useState, useEffect } from 'react';
import { Utensils, Coffee, Pizza, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const DiningCard: React.FC = () => {
  const [venues, setVenues] = useState([
    { name: 'Cosmic Burger Hub', queue: 10, type: 'Fast Food', load: 30, icon: <Pizza size={18} /> },
    { name: 'Nebula Coffee', queue: 5, type: 'Cafe', load: 15, icon: <Coffee size={18} /> },
    { name: 'Starlight Dining Room', queue: 45, type: 'Dine-in', load: 95, icon: <Utensils size={18} /> },
  ]);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVenues(current => 
        current.map(v => {
          const loadChange = Math.floor(Math.random() * 10) - 4;
          const newLoad = Math.max(5, Math.min(100, v.load + loadChange));
          // Queue vaguely correlates with load
          const newQueue = Math.max(1, Math.floor(newLoad / 2));
          return { ...v, load: newLoad, queue: newQueue };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section aria-labelledby="dining-title" className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 id="dining-title" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Utensils size={20} color="#f59e0b" aria-hidden="true" /> Dining & Food
        </h2>
        <motion.span 
          key={venues[0].load}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}
        >
          Live Tracking
        </motion.span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}>
        {venues.map((venue) => (
          <motion.div layout key={venue.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ padding: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  {venue.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem' }}>{venue.name}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{venue.type}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <motion.span 
                  key={venue.queue}
                  initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}
                  style={{ fontSize: '0.875rem', fontWeight: 'bold' }}
                >
                  {venue.queue} min wait
                </motion.span>
              </div>
            </div>
            
            <div 
              role="progressbar" 
              aria-valuenow={venue.load} 
              aria-valuemin={0} 
              aria-valuemax={100} 
              aria-label={`${venue.name} capacity load`}
              style={{ height: '6px', width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}
            >
              <motion.div 
                animate={{ width: `${venue.load}%`, backgroundColor: venue.load < 50 ? '#34d399' : venue.load < 80 ? '#fbbf24' : '#f87171' }}
                transition={{ duration: 1 }}
                style={{ height: '100%', borderRadius: '3px' }} 
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      <button 
        onClick={() => { setOrdered(true); setTimeout(() => setOrdered(false), 3000); }}
        style={{ 
          marginTop: 'auto',
          padding: '0.75rem', 
          backgroundColor: ordered ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)', 
          color: ordered ? '#34d399' : 'white', 
          border: ordered ? '1px solid #10b981' : '1px solid var(--panel-border)', 
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
        }}
        aria-live="polite"
      >
        {ordered ? <><CheckCircle2 size={18} aria-hidden="true" /> Order Placed!</> : 'Order Mobile Pickup'}
      </button>
    </section>
  );
}

export default DiningCard;
