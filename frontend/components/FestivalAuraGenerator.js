'use client';

import { useMemo, useState } from 'react';

const colorSet = ['#8E0D3C', '#1D1842', '#EF3B33', '#FDA1A2'];
const blessings = [
  'Prosperity aura active',
  'Family harmony aura active',
  'Creative energy aura active',
  'Peaceful home aura active'
];

const intentions = ['Prosperity', 'Health', 'Wisdom', 'Success'];

const hashText = (value) => {
  return value.split('').reduce((accumulator, char, index) => {
    return accumulator + char.charCodeAt(0) * (index + 7);
  }, 0);
};

export default function FestivalAuraGenerator() {
  const [name, setName] = useState('Devotee');
  const [intention, setIntention] = useState(intentions[0]);
  const [seed, setSeed] = useState(108);

  const aura = useMemo(() => {
    const rotation = seed % 360;
    const first = colorSet[seed % colorSet.length];
    const second = colorSet[(seed + 1) % colorSet.length];
    const third = colorSet[(seed + 2) % colorSet.length];
    const message = blessings[seed % blessings.length];
    return {
      rotation,
      message,
      background: `conic-gradient(from ${rotation}deg, ${first}, ${second}, ${third}, #1D1842, ${first})`,
      glow: `radial-gradient(circle, ${third}66 20%, transparent 68%)`
    };
  }, [seed]);

  const generateAura = () => {
    const day = new Date().getDate();
    setSeed(hashText(`${name}${intention}${day}`));
  };

  return (
    <section className="glass-card p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Unique Feature</p>
          <h2 className="text-3xl font-heading text-maroon mt-2">Festival Aura Generator</h2>
          <p className="text-sm text-blackcurrant/80 mt-2">
            Personalize a live ceremonial aura and preview your blessing mood before booking a murti.
          </p>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-[1.15fr_0.85fr] gap-6 items-center">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-maroon font-semibold">Devotee Name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value || 'Devotee')}
              className="mt-1 w-full rounded-xl border border-maroon/20 bg-white/80 px-4 py-2 text-blackcurrant outline-none focus:ring-2 focus:ring-saffron/40"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm text-maroon font-semibold">Intention</label>
            <select
              value={intention}
              onChange={(event) => setIntention(event.target.value)}
              className="mt-1 w-full rounded-xl border border-maroon/20 bg-white/80 px-4 py-2 text-blackcurrant outline-none focus:ring-2 focus:ring-saffron/40"
            >
              {intentions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <button
            onClick={generateAura}
            className="rounded-full bg-maroon px-5 py-3 text-sm font-semibold text-white transition hover:bg-blackcurrant"
          >
            Generate My Aura
          </button>
          <p className="text-sm text-blackcurrant/75">{name}, {aura.message}</p>
        </div>

        <div className="relative mx-auto h-56 w-56">
          <div className="festival-aura-ring absolute inset-0 rounded-full" style={{ background: aura.background }} />
          <div className="festival-aura-glow absolute inset-5 rounded-full" style={{ background: aura.glow }} />
          <div className="absolute inset-12 rounded-full bg-white/90 border border-maroon/15 flex items-center justify-center text-center p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">{intention}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
