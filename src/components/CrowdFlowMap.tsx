import { useState, useEffect } from 'react';
import { Map, Activity, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const CrowdFlowMap: React.FC = () => {
  const [view, setView] = useState<'heat' | 'full'>('heat');
  const [positions, setPositions] = useState({
    green: { x: 20, y: 30, scale: 1 },
    red: { x: 70, y: 50, scale: 1.2 },
    yellow: { x: 40, y: 80, scale: 1.15 }
  });

  useEffect(() => {
    // Simulate crowd nodes wandering slightly and expanding/contracting
    const interval = setInterval(() => {
      setPositions(prev => ({
        green: { x: prev.green.x + (Math.random() * 4 - 2), y: prev.green.y + (Math.random() * 4 - 2), scale: 1 + Math.random() * 0.2 },
        red: { x: Math.min(90, Math.max(50, prev.red.x + (Math.random() * 6 - 3))), y: prev.red.y + (Math.random() * 6 - 3), scale: 1.1 + Math.random() * 0.3 },
        yellow: { x: prev.yellow.x + (Math.random() * 5 - 2.5), y: prev.yellow.y + (Math.random() * 5 - 2.5), scale: 1 + Math.random() * 0.2 }
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section aria-labelledby="map-title" className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 id="map-title" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Map size={20} color="#8b5cf6" aria-hidden="true" /> Live Crowd Flow
        </h2>
        <motion.div 
          key={positions.red.scale}
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#10b981' }}
        >
          <Activity size={14} /> Normal Traffic
        </motion.div>
      </div>
      
      <div style={{ 
        flex: 1, 
        minHeight: '200px', 
        borderRadius: '12px', 
        border: '1px solid var(--panel-border)',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1e293b',
        backgroundImage: view === 'heat' ? 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(239, 68, 68, 0.2) 0%, transparent 30%)' : 'none',
      }}>
        {/* Decorative Grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
        
        {view === 'heat' ? (
          <>
            {/* Animated Pulsing Regions */}
            <motion.div 
              animate={{ 
                left: `${positions.green.x}%`, top: `${positions.green.y}%`, 
                scale: positions.green.scale, opacity: 0.6 
              }}
              transition={{ duration: 3 }}
              style={{
                position: 'absolute',
                width: '60px', height: '60px',
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                borderRadius: '50%',
                filter: 'blur(10px)',
                transform: 'translate(-50%, -50%)'
              }}
            />
            
            <motion.div 
              animate={{ 
                left: `${positions.red.x}%`, top: `${positions.red.y}%`, 
                scale: positions.red.scale, opacity: 0.8 
              }}
              transition={{ duration: 3 }}
              style={{
                position: 'absolute',
                width: '80px', height: '80px',
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                borderRadius: '50%',
                filter: 'blur(15px)',
                transform: 'translate(-50%, -50%)'
              }}
            />
    
            <motion.div 
              animate={{ 
                left: `${positions.yellow.x}%`, top: `${positions.yellow.y}%`, 
                scale: positions.yellow.scale, opacity: 0.7
              }}
              transition={{ duration: 3 }}
              style={{
                position: 'absolute',
                width: '50px', height: '50px',
                backgroundColor: 'rgba(245, 158, 11, 0.5)',
                borderRadius: '50%',
                filter: 'blur(10px)',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
             <Zap size={32} style={{ opacity: 0.5, marginRight: '8px' }} /> Satellite view active
          </div>
        )}

        {/* Map Overlays/Pins */}
        <div style={{ position: 'absolute', top: '35%', left: '25%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px' }}>
          Sector A
        </div>
        <div style={{ position: 'absolute', top: '55%', right: '15%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px' }}>
          Food Court
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button 
          onClick={() => setView('heat')}
          style={{ 
            padding: '0.5rem', 
            backgroundColor: view === 'heat' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)', 
            border: view === 'heat' ? '1px solid #8b5cf6' : '1px solid var(--panel-border)', 
            borderRadius: '8px',
            color: view === 'heat' ? '#c4b5fd' : 'white',
            fontSize: '0.875rem',
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
            cursor: 'pointer'
          }}
          aria-pressed={view === 'heat'}
        >
          <Users size={14} aria-hidden="true" /> Heat Map
        </button>
        <button 
          onClick={() => setView('full')}
          style={{ 
            padding: '0.5rem', 
            backgroundColor: view === 'full' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)', 
            border: view === 'full' ? '1px solid #3b82f6' : '1px solid var(--panel-border)', 
            borderRadius: '8px',
            color: view === 'full' ? '#93c5fd' : 'white',
            fontSize: '0.875rem',
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
            cursor: 'pointer'
          }}
          aria-pressed={view === 'full'}
        >
          <Map size={14} aria-hidden="true" /> Full Map
        </button>
      </div>
    </section>
  );
}

export default CrowdFlowMap;
