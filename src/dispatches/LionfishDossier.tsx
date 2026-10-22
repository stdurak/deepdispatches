import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LionfishDossier({ article }: { article: any }) {
  return (
    <>
      {/* ARTICLE HEADER */}
      <div className="max-w-3xl mx-auto px-6 space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono text-[#CCFF00]">
          <span>{article.number}</span>
          <span>·</span>
          <span>{article.category}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-[#CCFF00]/90 font-light italic">
          {article.subtitle}
        </p>
        <div className="text-xs text-slate-500 font-mono pt-2 border-b border-slate-800/80 pb-6 flex items-center gap-4">
          <span>Reading Time: {article.readTime}</span>
          <span>·</span>
          <span>Status: {article.status}</span>
        </div>
      </div>

      {/* HERO COVER PHOTO */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-12">
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#081630] min-h-[400px] md:min-h-[500px] flex items-center justify-center">
          <img 
            src="/lionfish-hero.jpg" 
            alt="" 
            aria-hidden="true" 
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110 pointer-events-none" 
          />
          <img 
            src="/lionfish-hero.jpg" 
            alt="Lionfish in the Mediterranean" 
            className="relative z-10 max-h-[500px] w-auto max-w-full object-contain mx-auto my-auto shadow-2xl py-4" 
          />
          <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#051124] via-[#051124]/80 to-transparent p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
            <span className="text-xs font-mono text-slate-300">
              The invasive Lionfish (Pterois miles) in the Eastern Mediterranean.
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-black/80 px-2.5 py-1 rounded border border-slate-700 shrink-0">
              Photo: Deep Dispatches Archive
            </span>
          </div>
        </div>
      </div>

      {/* INTRO TEXT */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12">
        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#CCFF00] first-letter:mr-3 first-letter:float-left">
          Thirty years spent in newsrooms and on crisis desks teach you one fundamental truth: context changes everything. A narrative framed as an ecological catastrophe in one territory can be a story of peaceful coexistence in another.
        </p>
        <p>
          As an underwater journalist observing the rapid transformation of our oceans, I have watched the seabed change firsthand. Down beneath the surface, human activity is rewriting marine life, turning familiar waters into frontline battlegrounds and creating narrative "monsters" in the process.
        </p>
        <p>
          To understand this dynamic shift in our warming seas, we must look beyond sensational headlines. By examining the mechanics of marine migration, we uncover three counter-intuitive truths about how human engineering transformed a peaceful Red Sea resident into an invasive crisis.
        </p>
      </div>

      {/* SECTION I */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-16">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-[#CCFF00] font-mono text-sm">01.</span> Nature Has No Villains
        </h2>
        <p>
          In the coastal waters off Northern Cyprus, encountering a lionfish (<em>Pterois miles</em>) triggers immediate concern. In the Eastern Mediterranean, a single lionfish represents an ecological takeover—an unchecked predator vacuuming up native juvenile fish, dismantling reef biodiversity, and frustrating local fisheries. Observers routinely brand them as "monsters" and "invaders."
        </p>
      </div>

      {/* FIGURE 1: RED SEA CONTEXT */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 my-10">
        <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl relative overflow-hidden group">
          <img src="/redsea-context.jpg" alt="Red Sea Reef" className="w-full h-auto rounded-xl border border-slate-700/50" />
          <div className="mt-4 px-2 flex justify-between items-center">
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">Fig 01 · The Native Habitat</span>
            <span className="text-[10px] font-mono text-slate-500">Red Sea Ecosystem</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12">
        <p>
          Yet down at twenty-two meters in its native Red Sea, hovering beside soft coral walls, that very same creature behaves entirely differently. Tucked beneath an overhang, it sways gently with the surge as a tranquil, almost hesitant resident, moving with cautious elegance and hunting only at twilight.
        </p>
        <p>
          Why doesn't the lionfish overrun the Red Sea? Because its native habitat contains the unseen brakes of evolution. Large groupers and giant moray eels inhabit these reefs, knowing precisely how to maneuver around the lionfish's venomous spines to keep its population in check.
        </p>
      </div>

      {/* FIGURE 2: MORAY EEL */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 my-10">
        <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl relative overflow-hidden group">
          <img src="/moray-predator.jpg" alt="Giant Moray Eel" className="w-full h-auto rounded-xl border border-slate-700/50" />
          <div className="mt-4 px-2 flex justify-between items-center">
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">Fig 02 · The Natural Predator</span>
            <span className="text-[10px] font-mono text-slate-500">Giant Moray Eel</span>
          </div>
        </div>
      </div>

      {/* PULL QUOTE */}
      <div className="max-w-4xl mx-auto px-6 my-12">
        <div className="p-8 bg-[#081630] border-l-4 border-[#CCFF00] rounded-r-2xl text-slate-100 font-serif text-xl md:text-2xl italic leading-relaxed shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/5 rounded-full blur-2xl pointer-events-none"></div>
          "Nature doesn’t create villains. It creates balances. It is only when human engineering breaks the dam that a peaceful citizen becomes an unstoppable force."
        </div>
      </div>

      {/* SECTION II */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-[#CCFF00] font-mono text-sm">02.</span> The Mechanical Trojan Horse
        </h2>
        <p>
          The pathway for this ecological conveyor belt was established in 1869, when humanity cut a 193-kilometer trench through the desert to build the Suez Canal. Scientists call this influx the <strong>Lessepsian migration</strong>. For decades, natural barriers kept this doorway largely shut: cooler Mediterranean temperatures and the hypersaline Bitter Lakes created an invisible wall that Red Sea species could not cross.
        </p>
        <p>
          Today, that thermal wall has collapsed. This biological surge is driven by two distinct human factors: <strong>The Climate Crisis</strong> (which warms the Mediterranean 20% faster than the global average) and <strong>Global Maritime Trade</strong> (supertankers acting as mechanical Trojan Horses, discharging Red Sea ballast water directly into Mediterranean ports).
        </p>
      </div>

      {/* INTERACTIVE MAP */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 my-16">
        <div className="bg-[#081630] border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">The Broken Thermal Barrier</h3>
            <p className="text-sm text-slate-400">Drag the timeline to see how climate change dissolved the invisible wall protecting the Mediterranean.</p>
          </div>
          <SuezMigrationMap />
        </div>
      </div>

      {/* SECTION III */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-[#CCFF00] font-mono text-sm">03.</span> Adaptation Over Despair
        </h2>
        <p>
          Faced with an irreversible invasion, conservation efforts must shift away from unwinnable battles toward active ecosystem management. Because the Mediterranean lacks native predators equipped to handle invaders, human strategy must evolve—drawing inspiration from "The Florida Playbook."
        </p>
        <p>
          In coastal shallow waters, communities can step into the role of the missing apex predator. Following Florida's example, regional authorities can host <strong>"Lionfish Derbies"</strong>—competitive hunting tournaments. Building commercial culinary demand under the banner of "Eat the invaders" transforms a biological threat into a valuable fishery. 
        </p>
      </div>

      {/* FIGURE 3: CLOWNFISH / REEF LIFE */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 my-10">
        <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl relative overflow-hidden group">
          <img src="/redsea-reef.jpg" alt="Red Sea Reef Life" className="w-full h-auto rounded-xl border border-slate-700/50" />
          <div className="mt-4 px-2 flex justify-between items-center">
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">Fig 03 · The Ecosystem at Stake</span>
            <span className="text-[10px] font-mono text-slate-500">Native Biodiversity</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12">
        <p>
          However, recreational scuba diving is strictly capped at 40 meters. Lionfish routinely establish safe breeding populations at depths of 100 meters, far beyond the reach of human spear-fishers. To manage these deep-water reserves, specialized <strong>Remotely Operated Vehicles (ROVs)</strong> are now being deployed. These underwater drones are piloted from the surface and equipped with stunning mechanisms that zap and capture deep-water lionfish without harming surrounding reef structures.
        </p>
      </div>

      {/* CONCLUSION */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12 mb-16 border-t border-slate-800/80 pt-8">
        <h2 className="text-2xl font-bold text-white">A New Balance in the Blue</h2>
        <p>
          We cannot close the Suez Canal, nor can we freeze the Mediterranean back to its historic temperatures. The marine environment of twenty years ago has been permanently replaced by a dynamic, tropicalized hybrid ecosystem. 
        </p>
        <p>
          Success no longer lies in fighting an unwinnable war against migration, but in adapting our tools and management strategies to preserve functional ocean balance. As human engineering continues to rewrite the natural rules of marine life, will we step up to actively manage the altered oceans we created?
        </p>

        {/* REFERENCES */}
        <div className="border-t border-slate-800 pt-8 mt-10 space-y-4 text-xs font-mono text-slate-400">
          <h4 className="text-[#CCFF00] uppercase tracking-widest text-[11px] font-bold">
            // ACADEMIC REFERENCES &amp; METHODOLOGY
          </h4>
          <ul className="space-y-3 list-disc list-inside leading-relaxed">
            <li>Kletou, D., et al. (2016). "A lionfish (Pterois miles) invasion has begun in the Mediterranean Sea." <em>Marine Biodiversity Records.</em></li>
            <li>Albins, M. A., &amp; Hixon, M. A. (2008). "Invasive Indo-Pacific lionfish reduce recruitment of Atlantic coral-reef fishes." <em>Marine Ecology Progress Series.</em></li>
            <li>Galil, B. S., et al. (2015). "The Enlargement of the Suez Canal and the Introduction of Marine Alien Species into the Mediterranean." <em>Management of Biological Invasions.</em></li>
          </ul>
        </div>
      </div>
    </>
  );
}

// --- İNTERAKTİF SÜVEYŞ HARİTASI (GELİŞMİŞ VERSİYON) ---
function SuezMigrationMap() {
  const [year, setYear] = useState(1869);

  const getStatus = () => {
    if (year < 1900) return { 
      title: "The Barrier Holds (1869-1900)", 
      desc: "The Suez Canal opens, but the hypersaline Bitter Lakes create an impassable thermal and salinity barrier. Red Sea species cannot cross.", 
      color: "text-slate-400", 
      barrierOpacity: 1 
    };
    if (year < 1970) return { 
      title: "Cracks in the Wall (1900-1970)", 
      desc: "The canal is deepened. Salinity drops slightly, but the winter cold of the Mediterranean still kills tropical intruders.", 
      color: "text-amber-400", 
      barrierOpacity: 0.6 
    };
    if (year < 2015) return { 
      title: "The Collapse (1970-2015)", 
      desc: "The Aswan High Dam stops cold freshwater flows. The Mediterranean begins to warm rapidly. The thermal wall shatters.", 
      color: "text-orange-500", 
      barrierOpacity: 0.2 
    };
    return { 
      title: "The Alien Frontier (2015-Present)", 
      desc: "The Mediterranean is hotter than ever. Over 1,000 species migrate. Ships carrying ballast water accelerate the biological invasion.", 
      color: "text-[#CCFF00]", 
      barrierOpacity: 0 
    };
  };

  const status = getStatus();
  const progress = ((year - 1869) / (2024 - 1869)) * 100;

  return (
    <div className="space-y-8">
      {/* HARİTA */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-[#020813] to-[#051124] rounded-2xl border border-slate-800 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Arka Plan Izgarası */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#CCFF00_1px,transparent_1px),linear-gradient(to_bottom,#CCFF00_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <svg viewBox="0 0 1000 500" className="w-full h-full relative z-10">
          
          {/* Kara Kütleleri (Mısır/Afrika ve Arap Yarımadası) */}
          <path d="M0,0 L480,0 L450,250 L380,250 L350,500 L0,500 Z" fill="#0a1a35" stroke="#1e293b" strokeWidth="2" />
          <path d="M1000,0 L520,0 L480,250 L550,250 L650,500 L1000,500 Z" fill="#0a1a35" stroke="#1e293b" strokeWidth="2" />

          {/* Akdeniz ve Kızıldeniz Etiketleri */}
          <text x="200" y="120" fill="#1e3a5f" fontSize="28" fontWeight="900" fontFamily="monospace" letterSpacing="0.2em" opacity="0.6">MEDITERRANEAN</text>
          <text x="750" y="400" fill="#1e3a5f" fontSize="28" fontWeight="900" fontFamily="monospace" letterSpacing="0.2em" opacity="0.6">RED SEA</text>

          {/* Süveyş Kanalı Rotası */}
          <g>
            {/* Kanalın arka plan çizgisi */}
            <path d="M430,250 L500,250" stroke="#1e293b" strokeWidth="16" strokeLinecap="round" />
            {/* Kanalın neon çizgisi */}
            <path d="M430,250 L500,250" stroke="#CCFF00" strokeWidth="3" strokeLinecap="round" className="animate-pulse shadow-[0_0_10px_#CCFF00]" />
            <text x="465" y="230" fill="#64748b" fontSize="12" textAnchor="middle" fontFamily="monospace">SUEZ CANAL</text>
          </g>

          {/* Acı Göller (Termal Bariyer) */}
          <g style={{ opacity: status.barrierOpacity, transition: 'opacity 1s ease' }}>
            <circle cx="465" cy="250" r="30" fill="#ef4444" opacity="0.2" className="animate-ping" />
            <circle cx="465" cy="250" r="15" fill="#ef4444" opacity="0.6" className="shadow-[0_0_20px_#ef4444]" />
            <text x="465" y="285" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">BITTER LAKES</text>
          </g>

          {/* Kargo Gemisi Animasyonu (1900'den sonra) */}
          {year > 1900 && (
            <motion.g 
              initial={{ x: -100, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ duration: 1 }}
            >
              {/* Gemi Gövdesi */}
              <path d="M440,240 L490,240 L500,250 L440,250 Z" fill="#94a3b8" />
              <rect x="455" y="230" width="20" height="10" fill="#475569" rx="1" />
              <rect x="475" y="235" width="10" height="5" fill="#475569" rx="1" />
              <text x="465" y="275" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace" className="animate-pulse">CARGO</text>
            </motion.g>
          )}

          {/* İstilacı Balık Sürüsü (1970'ten sonra Kızıldeniz'den Akdeniz'e) */}
          {year > 1970 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
              {[...Array(12)].map((_, i) => (
                <motion.circle 
                  key={i}
                  cx={500 + Math.random() * 100} 
                  cy={250 + (Math.random() - 0.5) * 100} 
                  r="4" 
                  fill="#CCFF00" 
                  className="shadow-[0_0_10px_#CCFF00]"
                  animate={{ 
                    cx: [500, 430], 
                    cy: [250 + (Math.random() - 0.5) * 100, 250 + (Math.random() - 0.5) * 50], 
                    opacity: [1, 0] 
                  }} 
                  transition={{ 
                    duration: 1.5 + Math.random(), 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                    ease: "linear"
                  }} 
                />
              ))}
            </motion.g>
          )}
        </svg>

        {/* Dinamik Bilgi Kutusu (Haritanın üzerinde) */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md p-5 rounded-xl border border-slate-700/50 max-w-sm shadow-2xl z-20 pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
             <span className={`w-2 h-2 rounded-full ${status.color.replace('text-', 'bg-')} animate-pulse`}></span>
             <h4 className={`text-xs font-bold font-mono tracking-widest uppercase ${status.color}`}>{status.title}</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-light">{status.desc}</p>
        </div>
      </div>

      {/* ZAMAN ÇUBUĞU (KONTROL) */}
      <div className="bg-[#081630] p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-mono text-slate-500">1869</span>
          <div className="text-center bg-[#051124] border border-slate-700 px-4 py-1.5 rounded-full">
            <span className="text-sm font-mono text-[#CCFF00] font-bold">{year}</span>
          </div>
          <span className="text-xs font-mono text-slate-500">2024</span>
        </div>
        
        {/* Slider */}
        <div className="relative w-full h-2 bg-slate-800 rounded-full">
           <div 
             className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-[#CCFF00] rounded-full"
             style={{ width: `${progress}%` }}
           ></div>
           <input 
             type="range" 
             min="1869" 
             max="2024" 
             value={year} 
             onChange={(e) => setYear(parseInt(e.target.value))}
             className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
           />
           {/* Slider Topuzu (Thumb) */}
           <div 
             className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-[#CCFF00] border-4 border-[#051124] rounded-full shadow-[0_0_15px_#CCFF00] pointer-events-none transition-transform"
             style={{ left: `calc(${progress}% - 12px)` }}
           ></div>
        </div>
        
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-4 uppercase tracking-widest">
          <span>Opening</span>
          <span>Thermal Collapse</span>
          <span>Current Era</span>
        </div>
      </div>
    </div>
  );
}