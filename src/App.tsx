import { useState } from 'react';
import RideWaitTimes from './components/RideWaitTimes';
import DiningCard from './components/DiningCard';
import CrowdFlowMap from './components/CrowdFlowMap';
import ShowsCard from './components/ShowsCard';
import RestroomsCard from './components/RestroomsCard';
import { motion } from 'framer-motion';
import { Compass, User, Bell } from 'lucide-react';

function App() {
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <div className="app-container">
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '40px', height: '40px', 
            borderRadius: '12px', background: 'var(--accent-gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Compass color="white" size={24} />
          </div>
          <div>
            <h1 className="text-gradient" style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>OmniPark</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Galactic Sector • Peak Hours</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={() => setHasNotification(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', position: 'relative' }}
            aria-label={hasNotification ? "Notifications (unread messages)" : "Notifications (read)"}
          >
            <Bell size={24} aria-hidden="true" />
            {hasNotification && (
              <span style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', backgroundColor: 'var(--status-red)', borderRadius: '50%' }} aria-hidden="true"></span>
            )}
          </button>
          <div 
            role="button"
            tabIndex={0}
            aria-label="User Profile and Settings"
            style={{ 
              width: '36px', height: '36px', 
              borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }} 
            onClick={() => alert('Profile and Settings Demo')}
            onKeyDown={(e) => e.key === 'Enter' && alert('Profile and Settings Demo')}
          >
            <User size={20} aria-hidden="true" />
          </div>
        </div>
      </header>

      <main>
        {/* Left Column (or full width on mobile) */}
        <div style={{ gridColumn: 'span 12' }}>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600 }}
          >
            Good Afternoon, Zoe <span role="img" aria-label="wave">👋</span>
          </motion.h2>
        </div>

        {/* Main Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', gridColumn: 'span 12' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', gridRow: 'span 2' }}>
            <RideWaitTimes />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <CrowdFlowMap />
            <ShowsCard />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <DiningCard />
            <RestroomsCard />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
