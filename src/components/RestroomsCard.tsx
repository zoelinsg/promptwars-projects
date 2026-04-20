import { useState, useEffect } from 'react';
import { Droplet, Navigation, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RestroomsCard: React.FC = () => {
  const [available, setAvailable] = useState(true);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    // Randomly toggle restroom availability occasionally
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setAvailable(prev => !prev);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section aria-labelledby="restrooms-title" className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 id="restrooms-title" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Droplet size={20} color="#3b82f6" aria-hidden="true" /> Restrooms
        </h2>
        <motion.span 
          key={available ? 'yes' : 'no'}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ fontSize: '0.875rem', color: available ? 'var(--status-green)' : 'var(--status-red)' }}
        >
          {available ? 'Available' : 'Full / Cleaning'}
        </motion.span>
      </div>
      
      <div aria-live="polite" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {!navigating ? (
            <motion.div 
              key="status"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ 
                width: '60px', height: '60px', 
                borderRadius: '50%', backgroundColor: available ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 0.5rem auto'
              }}>
                <Navigation size={24} color={available ? "#3b82f6" : "#ef4444"} />
              </div>
              <h3 style={{ fontSize: '1.1rem' }}>Sector B Restrooms</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>2 min walk</p>
            </motion.div>
          ) : (
            <motion.div 
              key="nav"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ 
                width: '60px', height: '60px', 
                borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 0.5rem auto'
              }}>
                <MapPin size={24} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.1rem' }}>Routing...</h3>
              <p style={{ fontSize: '0.875rem', color: '#10b981' }}>Follow the blue path</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button 
        onClick={() => {
          if (!available) {
             alert('Finding nearest alternative restroom...');
          }
          setNavigating(!navigating);
        }}
        style={{ 
          width: '100%',
          padding: '0.5rem', 
          backgroundColor: navigating ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
          color: 'var(--accent-color)', 
          border: '1px solid rgba(59, 130, 246, 0.3)', 
          borderRadius: '8px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        aria-expanded={navigating}
      >
        {navigating ? 'Cancel Route' : (available ? 'Find Route' : 'Find Alternative')}
      </button>
    </section>
  );
}

export default RestroomsCard;
