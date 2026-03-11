'use client';

import { useEffect, useState } from 'react';

const getNextFestival = () => {
  const now = new Date();
  const year = now.getMonth() > 7 ? now.getFullYear() + 1 : now.getFullYear();
  return new Date(year, 8, 7, 9, 0, 0);
};

export default function CountdownTimer() {
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const target = getNextFestival();
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) {
        setRemaining('Festival is live!');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setRemaining(`${days}d ${hours}h ${minutes}m`);
    };
    tick();
    const timer = setInterval(tick, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-card px-6 py-5">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Ganesh Chaturthi Countdown</p>
      <h3 className="text-2xl font-heading text-maroon mt-2">{remaining}</h3>
      <p className="text-sm text-maroon/70 mt-2">Reserve your murti before the rush begins.</p>
    </div>
  );
}
