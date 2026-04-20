import { useState, useEffect } from 'react';
import { Sparkles, Calendar, BellRing } from 'lucide-react';
import { motion } from 'framer-motion';

const ShowsCard: React.FC = () => {
  const [shows, setShows] = useState([
    { name: 'Galactic Parade', time: '2:00 PM', minutesLeft: 15, notified: false },
    { name: 'Starlight Fireworks', time: '9:00 PM', minutesLeft: 420, notified: false },
  ]);

  useEffect(() => {
    // Tick down every minute (simulated as every 2 seconds for demo)
    const interval = setInterval(() => {
      setShows(current => 
        current.map(show => ({
          ...show,
          minutesLeft: Math.max(0, show.minutesLeft - 1)
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleNotify = (index: number) => {
    setShows(current => {
      const next = [...current];
      next[index].notified = !next[index].notified;
      return next;
    });
  };

  return (
    <section aria-labelledby="shows-title" className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 id="shows-title" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={20} color="#ec4899" aria-hidden="true" /> Shows & Events
        </h2>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
        {shows.map((show, i) => (
          <motion.div 
            layout
            key={show.name}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '0.75rem',
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderRadius: '8px',
              borderLeft: '3px solid #ec4899'
            }}
          >
            <div>
              <h3 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {show.name}
                {show.notified && <BellRing size={14} color="#ec4899" />}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Calendar size={12} /> {show.time}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <motion.div 
                key={show.minutesLeft}
                initial={{ scale: 1.1 }} animate={{ scale: 1 }}
                style={{ fontSize: '0.875rem', fontWeight: 'bold', color: show.minutesLeft < 10 ? '#f87171' : '#ec4899' }}
              >
                {show.minutesLeft === 0 ? 'Starting Now' : `In ${show.minutesLeft}m`}
              </motion.div>
              <button 
                onClick={() => toggleNotify(i)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                title="Remind me"
                aria-label={show.notified ? `Remove reminder for ${show.name}` : `Set reminder for ${show.name}`}
                aria-pressed={show.notified}
              >
                <BellRing size={18} color={show.notified ? "#ec4899" : "var(--text-muted)"} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ShowsCard;
