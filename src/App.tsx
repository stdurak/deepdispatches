import { useState, useRef } from 'react';
import PosidoniaDossier from './components/PosidoniaDossier';

type SortOption = 'latest' | 'popular' | 'oldest';

const DISPATCHES = [
  {
    id: "dossier-001",
    number: "DOSSIER #001",
    status: "FEATURED DISPATCH",
    title: "Beyond Human Exceptionalism: 5 Mind-Bending Insights Into Orca Culture",
    subtitle: "What if intelligence isn't a ladder climbing toward humanity, but a vast, interconnected evolutionary tree?",
    readTime: "12 min read",
    category: "Marine Cognition & Ecotypes",
    date: "2026-10-01",
    views: 24500,
    summary: "Decades of groundbreaking research in neuroscience and marine biology are dismantling our assumptions about mind and social complexity. Explore how learned cultural traditions in orcas drive biological evolution.",
    excerpt: "In the coastal waters of the Pacific Northwest, distinct orca communities share overlapping ranges yet live in complete cultural isolation—separated by diet, vocal dialects, and multi-generational traditions."
  },
  {
    id: "dossier-002",
    number: "DOSSIER #002",
    status: "NEW DISPATCH",
    title: "The Posidonia Crisis: The Lungs of the Mediterranean",
    subtitle: "The Lungs of the Mediterranean, the Anoxic Carbon Vault, and the Lethal Illusion of Active Restoration.",
    readTime: "10 min read",
    category: "Deep Ecology & Blue Carbon",
    date: "2026-10-21",
    views: 18200,
    summary: "An unvarnished assessment of Mediterranean seagrass meadows: from ancient carbon vaults and natural seawalls to anchor chain scarring, sewage eutrophication, and management fallacies.",
    excerpt: "Beneath the surface noise, undisturbed Posidonia matte locks away blue carbon for millennia—acting as an irreplaceable biological shield against coastal erosion."
  },
  {
    id: "dossier-003",
    number: "DOSSIER #003",
    status: "IN DEVELOPMENT",
    title: "The Resilient Reefs: Red Sea Marine Sanctuaries",
    subtitle: "High salinity, thermal extremes, and the coral lineages surviving global marine heatwaves.",
    readTime: "8 min read",
    category: "Resilience & Oceanography",
    date: "2026-10-15",
    views: 8900,
    summary: "Field dispatches and diving transects exploring why Red Sea corals withstand temperatures that bleach global reefs.",
    excerpt: "Exploring the evolutionary mechanics of Gulf of Aqaba and Red Sea reefs as global warming refugia."
  }
];

const TIMELINE_STAGES = [
  {
    id: "epoch-01",
    tag: "1 BILLION YEARS AGO",
    title: "The Molecular Mind & Universal Currency",
    subtitle: "Single-celled decision making without a central brain",
    description: "Brain-like decision making operates at a molecular level in E. coli bacteria. The exact same electrochemical principles—voltage-gated ion movement across membranes—power both single cells and modern human neurons.",
    highlight: "Information Loop: Acquire (Detect Toxins/Sugars) → Process & Analyze → Act (Swim Toward/Away)",
    statLabel: "Shared Biology",
    statValue: "100% Conserved Ion Channels"
  },
  {
    id: "epoch-02",
    tag: "600-550 MILLION YEARS AGO",
    title: "Nerve Nets & The Cephalization Blueprint",
    subtitle: "From decentralized radial nets to centralized anterior brains",
    description: "In organisms like jellyfish, decentralized nerve nets evolved the 'action potential'—a digital electrical pulse. Later bilaterians centralized these nerves into anterior ganglia, creating the anatomical blueprint for every central nervous system on Earth today.",
    highlight: "Cephalization: Structural reorganization of nerve cords into an anterior brain.",
    statLabel: "Neural Impulse",
    statValue: "Digital Spike Transmission"
  },
  {
    id: "epoch-03",
    tag: "DEEP-TIME PARALLEL PEAKS",
    title: "Cephalization Scaling: Human vs. Orca Neuroanatomy",
    subtitle: "Scaling changes processing capacity, not fundamental biology",
    description: "Decades of neurobiology reveal no qualitatively unique brain property in humans. The Orca brain (~5,000g, EQ 4-5) possesses the most convoluted cortical gyrification on Earth, with massive elaboration in insular and limbic regions.",
    highlight: "Cortical Folding: Orca brains feature higher surface wrinkling and limbic complexity than human brains.",
    statLabel: "Orca Brain Mass",
    statValue: "~5,000 Grams"
  },
  {
    id: "epoch-04",
    tag: "CULTURE AS EVOLUTIONARY FORCE",
    title: "When Behavior Shapes Biology",
    subtitle: "How non-human traditions create genetic divergence",
    description: "When information processing scales, it generates culture. Orcas exhibit extreme dietary conservatism, distinct vocal dialects, and post-reproductive matriarchal leadership that store ancestral knowledge for generations.",
    highlight: "The Grandmother Effect: Post-menopausal matriarchs guide pods through ecological crisis.",
    statLabel: "Cultural Isolation",
    statValue: "700,000+ Years"
  },
  {
    id: "epoch-05",
    tag: "THE BIG FIVE DOMAINS",
    title: "Dismantling Human Exceptionalism",
    subtitle: "Ubiquitous cognitive traits across the tree of life",
    description: "The central question of astrobiology and philosophy has already been answered on Earth: Self-awareness, tool use, culture, numerical logic, and symbolic communication are deeply conserved properties across species.",
    highlight: "We do not sit atop a ladder; we are simply one young leaf on an ancient, intelligent tree.",
    statLabel: "Cognitive Domains",
    statValue: "5 Shared Arenas"
  }
];

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [selectedEcotype, setSelectedEcotype] = useState<'resident' | 'transient'>('resident');
  const [activeAudioSrc, setActiveAudioSrc] = useState<string | null>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [paradigmMode, setParadigmMode] = useState<'myth' | 'reality'>('reality');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedArticle = DISPATCHES.find(d => d.id === activeArticleId);
  const currentStage = TIMELINE_STAGES[activeStageIndex];

  const togglePlayAudio = (src: string) => {
    if (activeAudioSrc === src) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setActiveAudioSrc(null);
    } else {
      setActiveAudioSrc(src);
      if (audioRef.current) {
        audioRef.current.src = src;
        audioRef.current.play().catch(err => console.log('Audio playback prevented:', err));
      }
    }
  };

  const sortedDispatches = [...DISPATCHES].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortBy === 'popular') {
      return b.views - a.views;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#051124] text-slate-100 font-sans selection:bg-[#CCFF00] selection:text-black relative overflow-x-hidden">
      
      {/* HIDDEN AUDIO ENGINE */}
      <audio ref={audioRef} onEnded={() => setActiveAudioSrc(null)} className="hidden" />

      {/* FULL-BLEED BACKGROUND VIDEO FOR HOME FEED */}
      {!activeArticleId && (
        <div className="absolute top-0 left-0 w-full h-[650px] overflow-hidden pointer-events-none z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            ref={(el) => { if (el) el.muted = true; }}
            className="w-full h-full object-cover opacity-35 scale-105"
          >
            <source src="/bubble.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/40 via-[#051124]/60 to-[#051124]"></div>
        </div>
      )}

      {/* FIXED NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#051124]/85 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveArticleId(null)}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
            <span className="font-bold tracking-widest text-sm text-slate-200">DEEP DISPATCHES</span>
          </div>
          
          <div className="flex items-center gap-4">
            {activeArticleId && (
              <button 
                onClick={() => setActiveArticleId(null)}
                className="text-xs text-[#CCFF00] hover:underline font-mono cursor-pointer"
              >
                ← Back to All Dispatches
              </button>
            )}
            <span className="text-xs text-slate-500 uppercase tracking-widest border border-slate-800 rounded-full px-3 py-1 hidden sm:inline-block">
              Independent Media
            </span>
          </div>
        </div>
      </header>

      {/* DYNAMIC ARTICLE VIEW ROUTING */}
      {activeArticleId === 'dossier-002' ? (
        <PosidoniaDossier />
      ) : activeArticleId === 'dossier-001' ? (
        <main className="py-16 space-y-16 relative z-10">
          
          {/* ARTICLE HEADER */}
          <div className="max-w-3xl mx-auto px-6 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-[#CCFF00]">
              <span>{selectedArticle?.number}</span>
              <span>·</span>
              <span>{selectedArticle?.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {selectedArticle?.title}
            </h1>
            <p className="text-lg text-[#CCFF00]/90 font-light italic">
              {selectedArticle?.subtitle}
            </p>
            <div className="text-xs text-slate-500 font-mono pt-2 border-b border-slate-800/80 pb-6 flex items-center gap-4">
              <span>Reading Time: {selectedArticle?.readTime}</span>
              <span>·</span>
              <span>Status: {selectedArticle?.status}</span>
            </div>
          </div>

          {/* HERO COVER PHOTO */}
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#081630] min-h-[500px] md:min-h-[680px] flex items-center justify-center">
              <img 
                src="/orca-cover.jpg" 
                alt="" 
                aria-hidden="true" 
                className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110 pointer-events-none"
              />
              <img 
                src="/orca-cover.jpg" 
                alt="Southern Resident Orca surfacing in Salish Sea waters" 
                className="relative z-10 max-h-[620px] md:max-h-[720px] w-auto max-w-full object-contain mx-auto my-auto shadow-2xl py-4"
              />
              <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#051124] via-[#051124]/80 to-transparent p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                <span className="text-xs font-mono text-slate-300">
                  Southern Resident Orca surfacing in Salish Sea waters.
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-black/80 px-2.5 py-1 rounded border border-slate-700 shrink-0">
                  Photo by <a href="https://unsplash.com/@tomasmalik" target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline">Tomas Malik</a> / Unsplash
                </span>
              </div>
            </div>
          </div>

          {/* INTRO TEXT */}
          <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#CCFF00] first-letter:mr-3 first-letter:float-left">
              For centuries, human philosophy and Western science rested on a comfortable dogma: that culture, language, and abstract thought were exclusive domains of <em>Homo sapiens</em>. Animals had instincts; humans had intellect.
            </p>
            <p>
              However, deep beneath the surface waters of the world&apos;s oceans, marine biologists and neuroscientists are encountering a reality that shatters our anthropocentric pedestal. Orcas (<em>Orcinus orca</em>) do not merely possess high intelligence—they live inside ancient, non-human cultures shaped by dialect, specialized diets, and multi-generational knowledge systems.
            </p>
          </div>

          {/* SCROLLYTELLING COMPONENT 1 */}
          <section className="max-w-6xl mx-auto px-4 md:px-6 my-12">
            <div className="bg-[#081630]/90 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-6 shadow-2xl backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#CCFF00] tracking-widest uppercase block mb-1">
                    // SCROLLYTELLING MODULE 01
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Acoustic-Spatial Ecotype Mapping
                  </h3>
                </div>

                <div className="flex items-center gap-2 bg-[#051124] p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => {
                      setSelectedEcotype('resident');
                      togglePlayAudio('/resident-chirp.mp3');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      selectedEcotype === 'resident'
                        ? 'bg-[#CCFF00] text-black font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Resident (Inland)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEcotype('transient');
                      togglePlayAudio('/transient-click.mp3');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      selectedEcotype === 'transient'
                        ? 'bg-[#CCFF00] text-black font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Transient (Offshore)
                  </button>
                </div>
              </div>

              {/* MAP */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-[#051124] group">
                <img 
                  src="/orca-map.svg" 
                  alt="Pacific Northwest Orca Migration Map" 
                  className="w-full h-auto object-cover min-h-[350px]"
                />

                <button 
                  onClick={() => {
                    setSelectedEcotype('resident');
                    togglePlayAudio('/resident-chirp.mp3');
                  }}
                  className={`absolute top-[48%] right-[22%] sm:right-[24%] p-3 rounded-full transition-all cursor-pointer group/pin ${
                    selectedEcotype === 'resident' ? 'scale-125 z-20' : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <span className="absolute inset-0 rounded-full bg-[#CCFF00]/30 animate-ping"></span>
                  <span className="relative flex items-center justify-center w-5 h-5 bg-[#CCFF00] text-black rounded-full text-[10px] font-bold shadow-lg">
                    1
                  </span>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block bg-black/90 text-[#CCFF00] text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap border border-[#CCFF00]/40">
                    Salish Sea Pods (Listen Chirps &amp; Dialects)
                  </span>
                </button>

                <button 
                  onClick={() => {
                    setSelectedEcotype('transient');
                    togglePlayAudio('/transient-click.mp3');
                  }}
                  className={`absolute top-[42%] left-[32%] sm:left-[35%] p-3 rounded-full transition-all cursor-pointer group/pin ${
                    selectedEcotype === 'transient' ? 'scale-125 z-20' : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <span className="absolute inset-0 rounded-full bg-slate-400/30 animate-ping"></span>
                  <span className="relative flex items-center justify-center w-5 h-5 bg-slate-200 text-black rounded-full text-[10px] font-bold shadow-lg">
                    2
                  </span>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block bg-black/90 text-white text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap border border-slate-700">
                    Outer Coast Hunters (Listen Sonar Clicks)
                  </span>
                </button>
              </div>

              {/* ACOUSTIC PANEL */}
              <div className="bg-[#051124]/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse"></span>
                    <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-wider">
                      {selectedEcotype === 'resident' ? 'Southern Resident Ecotype (SRKW)' : "Bigg's Transient Ecotype"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {selectedEcotype === 'resident' 
                      ? 'Resident pods rely heavily on highly complex, vocal dialects to coordinate salmon hunts in murky coastal waters. Salmon are deaf to high-frequency orca calls.' 
                      : 'Transient pods hunt marine mammals (seals, porpoises) with acute underwater hearing. They maintain near-total acoustic silence to execute stealth strikes.'}
                  </p>
                </div>

                <button
                  onClick={() => togglePlayAudio(selectedEcotype === 'resident' ? '/resident-chirp.mp3' : '/transient-click.mp3')}
                  className={`shrink-0 px-6 py-3 rounded-xl border text-xs font-mono flex items-center gap-3 transition-all cursor-pointer ${
                    activeAudioSrc
                      ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-bold shadow-lg shadow-[#CCFF00]/20'
                      : 'bg-[#081630] text-[#CCFF00] border-[#CCFF00]/40 hover:border-[#CCFF00]'
                  }`}
                >
                  <span>{activeAudioSrc ? '▌▌ PAUSE HYDROPHONE' : '▶ PLAY HYDROPHONE SAMPLE'}</span>
                  {activeAudioSrc && (
                    <span className="flex gap-1 items-end h-3">
                      <span className="w-0.5 h-full bg-black animate-bounce"></span>
                      <span className="w-0.5 h-2/3 bg-black animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-0.5 h-1/2 bg-black animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  )}
                </button>
              </div>

              {/* ORCASOUND */}
              <div className="bg-[#051124] border border-[#CCFF00]/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <div>
                    <span className="text-xs font-mono text-red-400 font-bold block uppercase tracking-wider">
                      ● LIVE FROM SALISH SEA · ORCASOUND TELEMETRY
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Listen live to open hydrophones deployed across Haro Strait and Port Townsend.
                    </p>
                  </div>
                </div>

                <a 
                  href="https://www.orcasound.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="shrink-0 px-4 py-2 bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2"
                >
                  <span>CONNECT TO LIVE STREAM ↗</span>
                </a>
              </div>

            </div>
          </section>

          {/* SCROLLYTELLING COMPONENT 2 */}
          <section className="max-w-6xl mx-auto px-4 md:px-6 my-16">
            <div className="bg-[#081630]/90 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#CCFF00]/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-4 border-b border-slate-800 pb-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] font-mono text-[#CCFF00] tracking-widest uppercase">
                    // SCROLLYTELLING MODULE 02 · THE CONTINUOUS MIND
                  </span>
                  <div className="flex items-center gap-2 bg-[#051124] px-3 py-1 rounded-full border border-slate-800 text-[11px] font-mono">
                    <span className="text-slate-500">Paradigm:</span>
                    <button 
                      onClick={() => setParadigmMode('reality')}
                      className={`cursor-pointer ${paradigmMode === 'reality' ? 'text-[#CCFF00] font-bold' : 'text-slate-400'}`}
                    >
                      Darwinian Tree
                    </button>
                    <span className="text-slate-700">|</span>
                    <button 
                      onClick={() => setParadigmMode('myth')}
                      className={`cursor-pointer ${paradigmMode === 'myth' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                    >
                      Scala Natura Myth
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  Deep-Time Cartography of Intelligence
                </h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
                  {paradigmMode === 'reality'
                    ? 'Intelligence is not a binary human trait or a ladder. It is a biological mechanism for survival—a continuous evolutionary tree spanning from single cells to ocean giants.'
                    : 'The ancient myth of "Scala Natura" viewed life as a linear ladder climbing toward human perfection. Modern neurobiology dismantles this hierarchy.'}
                </p>
              </div>

              {/* TIMELINE VISUAL */}
              <div className="bg-[#051124] border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 min-h-[220px]">
                {paradigmMode === 'reality' ? (
                  <div className="w-full flex flex-col md:flex-row items-center justify-around gap-6">
                    <div className="shrink-0 relative w-48 h-48 flex items-center justify-center">
                      <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#CCFF00] fill-none opacity-90 animate-pulse">
                        <circle cx="100" cy="100" r="90" className="stroke-slate-800" strokeWidth="1" strokeDasharray="4 4" />
                        <circle cx="100" cy="100" r="60" className="stroke-slate-800" strokeWidth="1" strokeDasharray="4 4" />
                        <path strokeWidth="1.5" d="M100 100 L100 20 M100 100 L170 100 M100 100 L100 180 M100 100 L30 100 M100 100 L150 150 M100 100 L50 50 M100 100 L150 50 M100 100 L50 150" />
                        <circle cx="100" cy="20" r="4" className="fill-[#CCFF00]" />
                        <circle cx="170" cy="100" r="4" className="fill-[#CCFF00]" />
                        <circle cx="30" cy="100" r="4" className="fill-[#CCFF00]" />
                        <circle cx="150" cy="150" r="4" className="fill-[#CCFF00]" />
                        <circle cx="50" cy="50" r="4" className="fill-[#CCFF00]" />
                        <circle cx="100" cy="100" r="6" className="fill-white" />
                      </svg>
                      <span className="absolute text-[10px] font-mono text-[#CCFF00] bg-[#051124] px-2 py-0.5 rounded border border-[#CCFF00]/40">
                        Radial Tree Of Life
                      </span>
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#CCFF00]">
                        <span className="w-2 h-2 rounded-full bg-[#CCFF00]"></span>
                        <span>THE REALITY: DARWINIAN BIOLOGICAL CONTINUUM</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                        <div className="p-3 bg-[#081630] border border-slate-800 rounded-xl">
                          <strong className="text-white block mb-1">Geometry:</strong>
                          <span>Radial &amp; Branching multidimensional network</span>
                        </div>
                        <div className="p-3 bg-[#081630] border border-slate-800 rounded-xl">
                          <strong className="text-white block mb-1">Teleology:</strong>
                          <span>No end goal, purely adaptive survival mechanisms</span>
                        </div>
                        <div className="p-3 bg-[#081630] border border-slate-800 rounded-xl sm:col-span-2">
                          <strong className="text-white block mb-1">Human Status:</strong>
                          <span>Embedded within a shared, deeply conserved biological continuum</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex flex-col md:flex-row items-center justify-around gap-6">
                    <div className="shrink-0 relative w-48 h-48 flex items-center justify-center">
                      <svg viewBox="0 0 100 200" className="w-24 h-full stroke-amber-500 fill-none" strokeWidth="2">
                        <line x1="30" y1="20" x2="30" y2="180" />
                        <line x1="70" y1="20" x2="70" y2="180" />
                        <line x1="30" y1="40" x2="70" y2="40" />
                        <line x1="30" y1="70" x2="70" y2="70" />
                        <line x1="30" y1="100" x2="70" y2="100" />
                        <line x1="30" y1="130" x2="70" y2="130" />
                        <line x1="30" y1="160" x2="70" y2="160" />
                        <line x1="15" y1="20" x2="85" y2="180" className="stroke-red-500" strokeWidth="3" />
                        <line x1="85" y1="20" x2="15" y2="180" className="stroke-red-500" strokeWidth="3" />
                      </svg>
                      <span className="absolute text-[10px] font-mono text-amber-400 bg-[#051124] px-2 py-0.5 rounded border border-amber-500/40">
                        DISMANTLED MYTH
                      </span>
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        <span>THE MYTH: SCALA NATURA (LINEAR LADDER)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                        <div className="p-3 bg-[#081630] border border-slate-800 rounded-xl">
                          <strong className="text-amber-400 block mb-1">Geometry:</strong>
                          <span>Linear &amp; Vertical hierarchy (Climbing ladder)</span>
                        </div>
                        <div className="p-3 bg-[#081630] border border-slate-800 rounded-xl">
                          <strong className="text-amber-400 block mb-1">Teleology:</strong>
                          <span>Goal-directed towards human perfection</span>
                        </div>
                        <div className="p-3 bg-[#081630] border border-slate-800 rounded-xl sm:col-span-2">
                          <strong className="text-amber-400 block mb-1">Human Status:</strong>
                          <span>Flawed assumption of separate superiority (Sui generis)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* TIMELINE NAV */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                {TIMELINE_STAGES.map((stage, idx) => (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      activeStageIndex === idx
                        ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-bold shadow-lg shadow-[#CCFF00]/10 scale-102'
                        : 'bg-[#051124]/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="text-[9px] font-mono block opacity-75 mb-1">STEP 0{idx + 1}</span>
                    <span className="text-xs font-semibold leading-tight line-clamp-2">{stage.title}</span>
                  </button>
                ))}
              </div>

              {/* STAGE DISPLAY */}
              <div className="bg-[#051124] border border-slate-800/90 rounded-2xl p-6 md:p-8 space-y-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-wider block">
                      {currentStage.tag}
                    </span>
                    <h4 className="text-xl md:text-2xl font-bold text-white mt-1">
                      {currentStage.title}
                    </h4>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">{currentStage.statLabel}</span>
                    <span className="text-sm font-mono text-[#CCFF00] font-bold">{currentStage.statValue}</span>
                  </div>
                </div>

                <p className="text-base text-slate-300 font-light leading-relaxed">
                  {currentStage.description}
                </p>

                {activeStageIndex === 0 && (
                  <div className="p-4 bg-[#081630] border border-slate-800 rounded-xl space-y-3">
                    <span className="text-[10px] font-mono text-[#CCFF00] tracking-widest uppercase block">
                      // INFORMATION PROCESSING LOOP
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs font-mono">
                      <div className="p-2 bg-[#051124] rounded border border-[#CCFF00]/30 text-[#CCFF00]">
                        1. Acquire
                        <span className="block text-[9px] text-slate-400 mt-0.5">Detect Inputs</span>
                      </div>
                      <div className="p-2 bg-[#051124] rounded border border-[#CCFF00]/30 text-[#CCFF00]">
                        2. Process &amp; Store
                        <span className="block text-[9px] text-slate-400 mt-0.5">Integrate Signals</span>
                      </div>
                      <div className="p-2 bg-[#051124] rounded border border-[#CCFF00]/30 text-[#CCFF00]">
                        3. Analyze
                        <span className="block text-[9px] text-slate-400 mt-0.5">Reach Threshold</span>
                      </div>
                      <div className="p-2 bg-[#051124] rounded border border-[#CCFF00]/30 text-[#CCFF00]">
                        4. Act
                        <span className="block text-[9px] text-slate-400 mt-0.5">Adaptive Behavior</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-[#081630] border-l-2 border-[#CCFF00] rounded-r-xl text-xs font-mono text-slate-200">
                  <span className="text-[#CCFF00] font-bold mr-2">// KEY ARCHITECTURAL TAKEAWAY:</span>
                  {currentStage.highlight}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-xs font-mono">
                  <button
                    onClick={() => setActiveStageIndex(Math.max(0, activeStageIndex - 1))}
                    disabled={activeStageIndex === 0}
                    className="px-4 py-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    ← Previous Epoch
                  </button>

                  <span className="text-slate-500">
                    Epoch {activeStageIndex + 1} of {TIMELINE_STAGES.length}
                  </span>

                  <button
                    onClick={() => setActiveStageIndex(Math.min(TIMELINE_STAGES.length - 1, activeStageIndex + 1))}
                    disabled={activeStageIndex === TIMELINE_STAGES.length - 1}
                    className="px-4 py-2 rounded-lg border border-[#CCFF00]/40 text-[#CCFF00] hover:bg-[#CCFF00]/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next Epoch →
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* FIGMA INFOGRAPHIC */}
          <section className="max-w-5xl mx-auto px-4 md:px-6 my-16 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono text-[#CCFF00] tracking-widest uppercase">
                // INFOGRAPHIC · NEUROANATOMICAL COMPARISON
              </span>
              <span className="text-xs font-mono text-slate-500">Figma Vector Render</span>
            </div>
            <div className="bg-[#081630] border border-slate-800 rounded-2xl p-4 overflow-hidden shadow-2xl">
              <img 
                src="/human-orca.svg" 
                alt="Human vs Orca Brain Structure Comparison" 
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </section>

          {/* ESSAY DETAILED INSIGHTS */}
          <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-12 text-base md:text-lg">
            
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#CCFF00] font-mono text-sm">01.</span> Culture Drives Biological Evolution
              </h2>
              <p>
                In evolutionary biology, the standard model assumes genetic mutations dictate behavioral shifts. In orcas, this paradigm is flipped. <strong>Cultural traditions dictate genetics.</strong>
              </p>
              <p>
                As mapped in the telemetry asset above, Resident and Transient communities share overlapping geographic zones in the Salish Sea, yet they have not interbred for over 700,000 years. They do not share a common language, nor do they eat the same prey. Residents hunt Chinook salmon; Transients hunt seals and porpoises. Their distinct culture created a biological wall stronger than any mountain range.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-800/80 pt-8">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#CCFF00] font-mono text-sm">02.</span> Dialects as Non-Physical Borders
              </h2>
              <p>
                Every matriarchal family pod possesses its own distinct acoustic signature. A mother passes down vocal dialects to her offspring, creating acoustic sub-cultures within pods that allow orcas to identify family members across miles of dark ocean.
              </p>
              <div className="p-6 bg-[#081630] border-l-2 border-[#CCFF00] rounded-r-lg text-slate-200 font-serif italic my-6">
                &quot;An orca pod doesn&apos;t just navigate using echolocation; they navigate using shared ancestral soundscapes.&quot;
              </div>
            </div>

          {/* INSIGHT 3 WITH POD FAMILY PHOTO */}
            <div className="space-y-6 border-t border-slate-800/80 pt-8">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-[#CCFF00] font-mono text-sm">03.</span> The Matriarchal Hard-Drive
              </h2>
              <p>
                Orcas are one of only six species on Earth—alongside humans—where females undergo menopause. Post-reproductive female orcas live for decades beyond their fertile years. 
              </p>
              
              <div className="my-6 relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-[#081630]">
                <img 
                  src="/orca-pod-family.jpg" 
                  alt="Orca family pod swimming together in Salish Sea" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-sm p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] font-mono text-slate-300">
                  <span>Matriarchal pod navigating coastal fjord waters together.</span>
                  <span className="shrink-0">Photo by <a href="https://unsplash.com/@gabrieltovar" target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline">Gabriel Tovar</a> / Unsplash</span>
                </div>
              </div>

              <p>
                Why? Because they serve as the living, walking historical archives of the pod. During severe salmon scarcity, pods led by elderly grandmothers have significantly higher survival rates. They remember migration routes and environmental cycles from half a century prior.
              </p>
            </div>