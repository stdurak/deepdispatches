import { useState } from 'react';

export default function App() {
  const [audioPlaying, setAudioPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-[#030914] text-[#F8FAFC] font-sans selection:bg-[#CCFF00] selection:text-black">
      
      {/* 1. TOP NAVIGATION / SONAR BAR */}
      <header className="fixed top-0 w-full z-50 bg-[#030914]/80 backdrop-blur-md border-b border-slate-800/60 px-6 py-4 flex justify-between items-center text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse"></span>
          <span className="font-bold tracking-widest uppercase text-white">DEEP DISPATCHES</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-slate-400">
          <span>LAT: 35°09'N</span>
          <span>DEPTH: 000M</span>
          <button 
            onClick={() => setAudioPlaying(!audioPlaying)}
            className="border border-slate-700 hover:border-[#CCFF00] px-3 py-1 rounded transition-colors text-white"
          >
            {audioPlaying ? '🔊 AUDIO: ON' : '🔇 AMBIENT: OFF'}
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center pt-20">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute w-[500px] h-[500px] bg-[#00F5D4]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="font-mono text-[#CCFF00] text-sm tracking-widest uppercase mb-4">
          — Independent Visual Journalism Hub
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold max-w-4xl leading-tight mb-6 tracking-tight">
          Far Below <span className="text-[#CCFF00] italic">The Surface</span> Noise.
        </h1>
        
        <p className="text-slate-400 max-w-xl text-lg md:text-xl font-light leading-relaxed mb-10">
          No social algorithms. Timeless, interactive, and deeply researched ecological investigations.
        </p>

        <a 
          href="#manifesto" 
          className="font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-[#CCFF00] flex flex-col items-center gap-2 transition-colors"
        >
          <span>Descend Into The Field</span>
          <span className="text-base animate-bounce">↓</span>
        </a>
      </section>

      {/* 3. MANIFESTO SECTION */}
      <section id="manifesto" className="max-w-4xl mx-auto px-6 py-24 border-t border-slate-800/40">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 font-mono text-xs text-[#CCFF00] tracking-widest uppercase sticky top-24">
            [ 01 / MANIFESTO ]
          </div>
          <div className="md:col-span-8 space-y-6 text-slate-300 text-lg leading-relaxed font-light">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">
              Why Deep Dispatches?
            </h2>
            <p>
              Digital media has fractured into fleeting metrics and surface-level feeds. 
              <strong className="text-white font-normal"> Deep Dispatches</strong> steps away from the noise to reclaim depth, nuance, and permanence.
            </p>
            <p>
              Every dispatch is an independent ecological dossier—built with custom data visualizations, immersive soundscapes, and field photography.
            </p>
          </div>
        </div>
      </section>

      {/* 4. UPCOMING DOSSIER TEASER */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="border border-slate-800 bg-[#0A192F]/40 rounded-2xl p-8 relative overflow-hidden group hover:border-[#CCFF00]/50 transition-colors">
          <div className="absolute top-0 right-0 bg-[#CCFF00] text-black font-mono text-xs px-4 py-1 font-bold uppercase">
            Dossier #001 — In Development
          </div>
          
          <div className="font-mono text-xs text-[#00F5D4] mb-3">
            [ MEDITERRANEAN ECOLOGY SERIES ]
          </div>
          
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 group-hover:text-[#CCFF00] transition-colors">
            Silent Giants: Mapping the Mediterranean Dusky Grouper
          </h3>
          
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed mb-6">
            An interactive depth map and field investigation exploring habitat fragmentation, marine sanctuaries, and population shifts.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span>FORMAT: Interactive Map + Audio</span>
            <span>•</span>
            <span>STATUS: Coming Soon</span>
          </div>
        </div>
      </section>

      {/* 5. BEEHIIV NEWSLETTER EMBED SECTION */}
      <section className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-b from-slate-900/80 to-[#030914] border border-slate-800 rounded-2xl p-8 md:p-12 space-y-6">
          <div className="font-mono text-xs text-[#CCFF00] uppercase tracking-widest">
            Direct Channel
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">
            Receive New Dispatches Directly
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Bypass social media algorithms. Get notified via email whenever a new investigation is published.
          </p>
          
          {/* Form Alanı (Beehiiv Embed) */}
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 pt-4">
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              className="bg-[#030914] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CCFF00] flex-1 font-mono"
            />
            <button className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-mono font-bold text-xs uppercase px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/60 px-6 py-8 text-center font-mono text-xs text-slate-600">
        <p>© {new Date().getFullYear()} DEEP DISPATCHES. Independent Visual Journalism.</p>
      </footer>

    </div>
  );
}