import { useState } from 'react';

// --- ANATOMY INTERACTIVE DATA ---
interface AnatomyNode {
  id: string;
  tag: string;
  title: string;
  growthRate: string;
  depthRange: string;
  carbonRole: string;
  description: string;
  accent: string;
}

const ANATOMY_LAYERS: AnatomyNode[] = [
  {
    id: 'canopy',
    tag: 'SURFACE BUFFER',
    title: 'The Leaf Canopy',
    growthRate: 'Seasonal renewal',
    depthRange: '0 - 1.0 m from seabed',
    carbonRole: 'Daily Oxygen Production (14-20 L/m²)',
    description:
      'Reaching up to 1 meter in length, these dense ribbon leaves form a true submerged forest. Beyond active photosynthesis, the canopy dampens kinetic wave energy from storm surges, protecting coastlines from structural retreat.',
    accent: '#CCFF00'
  },
  {
    id: 'rhizomes',
    tag: 'STRUCTURAL NETWORK',
    title: 'The Rhizomes',
    growthRate: '1 - 6 cm / year',
    depthRange: 'Sub-surface horizon',
    carbonRole: 'Horizontal & Vertical Stabilization',
    description:
      'Expanding at an agonizingly slow pace, the interwoven horizontal and vertical rhizomes anchor the seabed. A single anchor scar dragged through this zone destroys growth that takes centuries of undisturbed biological activity to regenerate.',
    accent: '#00E5FF'
  },
  {
    id: 'matte',
    tag: 'MILLENNIAL VAULT',
    title: 'The Ancient Matte',
    growthRate: 'Millennia formation',
    depthRange: '> 1.0 m into bedrock sediment',
    carbonRole: 'Permanent Anoxic Carbon Sequestration',
    description:
      'A dense, cemented matrix of ancient roots and organic sediment. Lacking oxygen (anoxic), it permanently traps blue carbon without decomposing. In Cyprus waters alone, an estimated 19,000 Mg of carbon remains locked within undisturbed matte strata.',
    accent: '#FFB703'
  }
];

// --- BEACH PARADOX STEPS ---
const PARADOX_STEPS = [
  { step: '01', title: 'Tourism Aesthetic Mandate', desc: 'Resorts and municipalities demand leaf-free, clean white sand for beach tourism.' },
  { step: '02', title: 'Mechanical Banquette Stripping', desc: 'Heavy machinery scrapes away protective Posidonia leaf banquettes and native sediment.' },
  { step: '03', title: 'Winter Wave Exposure', desc: 'Deprived of their natural buffer, naked shorelines violently erode under winter storm swells.' },
  { step: '04', title: 'Artificial Sand Nourishment', desc: 'Municipalities dump truckloads of loose foreign sand directly over depleted shorelines.' },
  { step: '05', title: 'Seabed Smothering', desc: 'Loose sand washes offshore into living meadows, blocking sunlight and suffocating benthic shoots.' },
  { step: '06', title: 'Total Barrier Collapse', desc: 'Dead meadows lose wave-dampening power, triggering accelerated and irreversible beach erosion.' }
];

export default function PosidoniaDossier() {
  const [activeLayer, setActiveLayer] = useState<string>('canopy');
  const [activeParadoxStep, setActiveParadoxStep] = useState<number>(0);

  const selectedLayer = ANATOMY_LAYERS.find((l) => l.id === activeLayer)!;

  return (
    <article className="min-h-screen bg-[#051124] text-slate-200 font-sans selection:bg-[#CCFF00] selection:text-black">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center border-b border-white/10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
        >
          <source src="/posidonia/hero.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#051124] via-[#051124]/40 to-[#051124]/80"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/10 text-[#CCFF00] font-mono text-xs tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse"></span>
            // DOSSIER #002 · EASTERN MEDITERRANEAN FIELD DISPATCH
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight uppercase">
            The Posidonia Crisis
          </h1>

          <p className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
            The Lungs of the Mediterranean, the Anoxic Carbon Vault, and the Lethal Illusion of Active Restoration.
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-6 text-xs font-mono text-slate-400">
            <span>LOCATION: KYRENIA / NORTHERN CYPRUS</span>
            <span>•</span>
            <span>SPECIES: POSIDONIA OCEANICA</span>
            <span>•</span>
            <span className="text-[#CCFF00]">STATUS: CRITICAL CONSERVATION</span>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-slate-500 uppercase animate-bounce">
          ↓ SCROLL TO ACCESS ARCHIVE
        </div>
      </section>

      {/* 2. TELEMETRY HUD / NUMERICAL OVERVIEW */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl border border-white/10 bg-[#081630]/90 backdrop-blur-md shadow-2xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Daily O2 Output</span>
            <div className="text-2xl md:text-3xl font-bold text-[#CCFF00] font-mono">14-20 L</div>
            <p className="text-[11px] text-slate-400">Generated per m² daily</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Historical CO2 Absorption</span>
            <div className="text-2xl md:text-3xl font-bold text-white font-mono">11-42%</div>
            <p className="text-[11px] text-slate-400">Of regional emissions since Ind. Rev.</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Anchoring Pressure</span>
            <div className="text-2xl md:text-3xl font-bold text-[#FF7A00] font-mono">179,000+</div>
            <p className="text-[11px] text-slate-400">Boats anchoring over beds yearly</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Cyprus Carbon Vault</span>
            <div className="text-2xl md:text-3xl font-bold text-[#00E5FF] font-mono">19,000 Mg</div>
            <p className="text-[11px] text-slate-400">Carbon permanently trapped in matte</p>
          </div>
        </div>
      </section>

      {/* 3. MAIN INVESTIGATIVE BODY */}
      <main className="max-w-4xl mx-auto px-6 py-20 space-y-24">

        {/* SECTION 01: THE INVISIBLE ENGINE */}
        <section className="space-y-6">
          <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">// 01 · THE INVISIBLE ENGINE</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Far Below The Surface Noise: An Evolutionary Masterpiece
          </h2>
          <p className="text-slate-300 leading-relaxed text-base md:text-lg">
            Take four deep breaths. Three of them were made possible by marine life. Yet, when society gazes upon the Mediterranean, human eyes fixate solely on the sunlit surface—wholly unaware of the ancient biological machinery labouring below.
          </p>
          <p className="text-slate-300 leading-relaxed text-base md:text-lg">
            Often dismissed by beachgoers as unseemly "seaweed", <em className="text-white">Posidonia oceanica</em> is not an alga. It is an evolutionary wonder: a terrestrial flowering plant (phanerogam) that returned to the sea millions of years ago. It possesses true root structures, underground rhizomes, strap-like leaves, flowers, and buoyant olive-shaped fruits.
          </p>

          {/* DUAL FIELD PHOTO SHOWCASE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                <img src="/posidonia/posidonia2.jpg" alt="Posidonia Canopy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 font-mono text-[10px] text-[#CCFF00]">FIG 1.1: CANOPY FOLIAGE</span>
              </div>
              <p className="text-xs font-mono text-slate-400">Dense leaf canopy producing up to 20 liters of oxygen per square meter daily.</p>
            </div>
            <div className="space-y-2">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                <img src="/posidonia/posidonia1.jpg" alt="Biodiversity Nursery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 font-mono text-[10px] text-[#00E5FF]">FIG 1.2: NURSERY ZONE</span>
              </div>
              <p className="text-xs font-mono text-slate-400">Hosting 20-25% of Mediterranean marine life, serving as an essential nursery.</p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MODULE: ANATOMY TELEMETRY */}
        <section className="p-8 rounded-xl border border-white/10 bg-[#081630]/70 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 font-mono text-xs">
            <span className="text-[#CCFF00] tracking-widest uppercase">// BLUEPRINT TELEMETRY: SEABED STRATIGRAPHY</span>
            <span className="text-slate-400">VERTICAL HORIZON EXPLORER</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Selectors */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {ANATOMY_LAYERS.map((layer) => {
                const active = layer.id === activeLayer;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 font-mono ${
                      active
                        ? 'border-[#CCFF00] bg-[#CCFF00]/10 shadow-[0_0_20px_rgba(204,255,0,0.15)] text-white'
                        : 'border-white/10 bg-[#051124] hover:border-white/30 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{layer.title}</span>
                      <span className="text-[10px] opacity-70">{layer.depthRange}</span>
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.accent }}></span>
                      {layer.tag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Readout Display */}
            <div className="lg:col-span-7 p-6 rounded-lg border border-white/10 bg-[#051124] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#CCFF00]">RATE: {selectedLayer.growthRate}</span>
                <span className="text-slate-500">{selectedLayer.depthRange}</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{selectedLayer.title}</h3>
              <div className="text-xs font-mono text-[#00E5FF] pb-2 border-b border-white/5">
                ROLE: {selectedLayer.carbonRole}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedLayer.description}</p>
            </div>
          </div>
        </section>

        {/* SECTION 02: THE MATRIX OF DECLINE */}
        <section className="space-y-6">
          <span className="font-mono text-xs text-[#FF7A00] tracking-widest uppercase">// 02 · THE ANCHORING & SEWAGE MATRIX</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            The Triple Threat: Mechanical Shearing, Eutrophication & Invasion
          </h2>
          <p className="text-slate-300 leading-relaxed text-base md:text-lg">
            Over the past five decades, the Mediterranean basin has witnessed an alarming 34% contraction of its seagrass beds. When leisure vessels anchor, dragging heavy chains sweep the sea bottom like lawnmower blades, shaving off slow-growing matte that takes millennia to anchor.
          </p>
          <p className="text-slate-300 leading-relaxed text-base md:text-lg">
            Simultaneously, unregulated building booms in coastal sectors like Kyrenia and Iskele overburden municipal sewer networks, disgorging raw wastewater into the bay. This influx triggers rampant epiphyte blooms that coat leaves, cutting off vital solar radiation until meadows choke and die in the shadows.
          </p>

          {/* FIELD EVIDENCE IMAGES: LIONFISH & EPIPHYTES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 group">
                <img src="/posidonia/posidonia4.jpg" alt="Invasive Lionfish" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-[#FF4D4D]">
                  INVASIVE: PTEROIS MILES
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Lessepsian migrants cross via Suez, colonizing degraded meadows under seawater warming pressure.
              </p>
            </div>
            <div className="space-y-2">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 group">
                <img src="/posidonia/posidonia7.jpg" alt="Epiphyte Smothering" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-[#FFB703]">
                  MACRO: EPIPHYTE BLOOM
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Nutrient pollution covers leaf blades with epiphytes, starving native Posidonia shoots of sunlight.
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MODULE: THE CLEAN BEACH PARADOX */}
        <section className="p-8 rounded-xl border border-white/10 bg-[#081630]/70 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 font-mono text-xs">
            <span className="text-[#FF4D4D] tracking-widest uppercase">// SYSTEM FAILURE: THE CLEAN BEACH PARADOX</span>
            <span className="text-slate-400">VICIOUS ANTHROPOGENIC CYCLE</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {PARADOX_STEPS.map((item, idx) => (
              <button
                key={item.step}
                onClick={() => setActiveParadoxStep(idx)}
                className={`p-3 rounded border text-left font-mono transition-all duration-300 ${
                  activeParadoxStep === idx
                    ? 'border-[#FF4D4D] bg-[#FF4D4D]/15 text-white'
                    : 'border-white/10 bg-[#051124] text-slate-400 hover:border-white/20'
                }`}
              >
                <span className="text-xs font-bold text-[#FF4D4D] block">{item.step}</span>
                <span className="text-[11px] font-semibold leading-tight line-clamp-2 mt-1">{item.title}</span>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-lg border border-[#FF4D4D]/30 bg-[#051124] flex items-center justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#FF4D4D]">STEP {PARADOX_STEPS[activeParadoxStep].step} ANALYSIS:</span>
              <h4 className="text-lg font-bold text-white">{PARADOX_STEPS[activeParadoxStep].title}</h4>
              <p className="text-sm text-slate-300 max-w-2xl">{PARADOX_STEPS[activeParadoxStep].desc}</p>
            </div>
            <div className="hidden md:block font-mono text-4xl text-[#FF4D4D]/30 font-bold">
              #{PARADOX_STEPS[activeParadoxStep].step}
            </div>
          </div>
        </section>

        {/* SECTION 03: MANAGEMENT FALLACIES & PASSIVE BLUEPRINT */}
        <section className="space-y-6">
          <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">// 03 · THE PASSIVE PROTECTION MANDATE</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            The Transplantation Myth vs. Aggressive Protection
          </h2>
          <p className="text-slate-300 leading-relaxed text-base md:text-lg">
            In Environmental Impact Assessments, developers routinely propose "transplantation"—uprooting seagrass to build marinas and replanting elsewhere. Decadal monitoring confirms this is an ecological illusion: long-term survival rates hover at a dismal 30-40%, and replanting shoots cannot reconstruct the millennia-old matte.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-6 rounded-lg border border-red-500/20 bg-red-950/10 space-y-3">
              <h4 className="font-mono text-xs text-red-400 uppercase tracking-widest">The Active Illusion</h4>
              <p className="text-sm text-slate-300">
                Costly artificial replanting used to greenwash coastal development. Mechanically damages donor beds with negligible ecosystem recovery.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-[#CCFF00]/20 bg-[#CCFF00]/5 space-y-3">
              <h4 className="font-mono text-xs text-[#CCFF00] uppercase tracking-widest">The Passive Reality</h4>
              <p className="text-sm text-slate-300">
                Absolute bans on anchoring in sensitive meadows, fixed eco-mooring buoy arrays (e.g. Kaş, Göcek), and mandatory sewer infrastructure moratoriums.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL FIELD FOOTAGE SHOWCASE */}
        <section className="space-y-4 pt-8">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
            <img src="/posidonia/posidonia3.jpg" alt="Living Forest" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-[#CCFF00] tracking-widest uppercase">FIELD OBSERVATION RECORD</span>
                <p className="text-sm md:text-base text-white font-semibold">An intact Posidonia oceanica climax meadow waving beneath the swells.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER DISPATCH SIGN OFF */}
      <footer className="border-t border-white/10 bg-[#030b18] py-12 text-center text-xs font-mono text-slate-500 space-y-3">
        <p>DEEP DISPATCHES · INVESTIGATIVE DOSSIER #002 · KYRENIA FIELD LOG</p>
        <p className="text-[#CCFF00]">"Far Below The Surface Noise."</p>
      </footer>

    </article>
  );
}