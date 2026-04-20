import { useState, useEffect } from 'react';
import { Clock, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ride {
  name: string;
  time: number;
  status: string;
  distance: string;
}

const initialRides: Ride[] = [
  { name: 'Quantum Coaster', time: 15, status: 'green', distance: '0.2 mi' },
  { name: 'Nebula Splash', time: 45, status: 'yellow', distance: '0.5 mi' },
  { name: 'Galaxy Express', time: 90, status: 'red', distance: '0.8 mi' },
  { name: 'Starship Simulator', time: 5, status: 'green', distance: '0.1 mi' },
];

const RideWaitTimes: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>(initialRides);
  const [showingAll, setShowingAll] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRides(current => 
        current.map(ride => {
          // Randomly fluctuate time between -5 and +5
          const fluctuation = Math.floor(Math.random() * 11) - 5;
          const newTime = Math.max(5, ride.time + fluctuation);
          
          let newStatus = 'green';
          if (newTime > 30) newStatus = 'yellow';
          if (newTime > 60) newStatus = 'red';

          return { ...ride, time: newTime, status: newStatus };
        })
      );
    }, 4000); // update every 4 seconds for demo purposes
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section aria-labelledby="rides-title" className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 id="rides-title" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={20} color="var(--accent-color)" aria-hidden="true" /> Ride Wait Times
        </h2>
        <motion.span 
          key={rides[0].time} // Cause brief flash when times update
          initial={{ opacity: 0.5, color: '#3b82f6' }}
          animate={{ opacity: 1, color: 'var(--text-muted)' }}
          style={{ fontSize: '0.875rem' }}
        >
          Live Updates
        </motion.span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
        <AnimatePresence>
          {rides.slice(0, showingAll ? rides.length : 3).map((ride) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              key={ride.name} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.75rem',
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                border: '1px solid var(--panel-border)'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{ride.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <Navigation size={14} /> {ride.distance} away
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} aria-live="polite">
                <motion.div 
                  key={ride.time}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className={`status-badge status-${ride.status}`}
                  aria-label={`${ride.time} minutes wait`}
                >
                  {ride.time} MIN
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <button 
        onClick={() => setShowingAll(!showingAll)}
        style={{ 
          marginTop: 'auto',
          padding: '0.75rem', 
          backgroundColor: showingAll ? 'transparent' : 'var(--accent-color)', 
          color: showingAll ? 'var(--text-main)' : 'white', 
          border: showingAll ? '1px solid var(--panel-border)' : 'none', 
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          backgroundImage: showingAll ? 'none' : 'var(--accent-gradient)'
        }}
        aria-expanded={showingAll}
      >
        {showingAll ? 'Show Les Attractions' : 'View All Attractions'}
      </button>
    </section>
  );
}

export default RideWaitTimes;
