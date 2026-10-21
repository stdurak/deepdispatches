import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Link } from 'react-router-dom';
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
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#051124] text-slate-100 font-sans selection:bg-[#CCFF00] selection:text-black relative overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dispatch/:id" element={<DispatchPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// --- ANA SAYFA ---
function HomePage() {
  const [submitted, setSubmitted] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const navigate = useNavigate();

  const sortedDispatches = [...DISPATCHES].sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === 'popular') return b.views - a.views;
    return 0;
  });

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#051124]/85 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
            <span className="font-bold tracking-widest text-sm text-slate-200">DEEP DISPATCHES</span>
          </Link>
          <span className="text-xs text-slate-500 uppercase tracking-widest border border-slate-800 rounded-full px-3 py-1 hidden sm:inline-block">
            Independent Media
          </span>
        </div>
      </header>

      <div className="absolute top-0 left-0 w-full h-[650px] overflow-hidden pointer-events-none z-0">
        <video autoPlay loop muted playsInline ref={(el) => { if (el) el.muted = true; }} className="w-full h-full object-cover opacity-65 scale-105 brightness-125">
          <source src="/bubble.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/25 via-[#051124]/50 to-[#051124]"></div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-24 relative z-10">
        <section className="text-center space-y-6 pt-12 pb-8 max-w-3xl mx-auto">
          <div className="inline-block px-3.5 py-1 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-full text-xs text-[#CCFF00] font-mono tracking-wider uppercase mb-2 shadow-xl">
            Dispatch #000 · Platform Launch
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-2xl">
            Far Below The <span className="text-[#CCFF00]">Surface Noise.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 font-light leading-relaxed drop-shadow-md max-w-2xl mx-auto">
            No social algorithms. Timeless, interactive, and deeply researched ecological investigations delivered directly to your inbox.
          </p>

          <div className="pt-4 max-w-md mx-auto">
            {submitted ? (
              <div className="p-4 bg-[#081630]/90 border border-[#CCFF00]/40 rounded-lg text-[#CCFF00] text-sm font-mono backdrop-blur-md">
                ✓ Subscription request received. Welcome to Deep Dispatches.
              </div>
            ) : (
              <div className="space-y-3">
                <form action="https://app.beehiiv.com/subscribe" method="POST" target="beehiiv-target" onSubmit={() => setSubmitted(true)} className="flex flex-col sm:flex-row gap-3">
                  <input type="hidden" name="publication_id" value="pub_2383c5ca-1813-4b13-b35f-6b498cd01829" />
                  <input type="email" name="email" required placeholder="Enter your email..." className="flex-1 px-4 py-3 bg-[#051124]/90 backdrop-blur-md border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00] transition-colors shadow-inner" />
                  <button type="submit" className="px-6 py-3 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xl">Subscribe</button>
                </form>
                <iframe name="beehiiv-target" className="hidden" title="beehiiv-form-target"></iframe>
              </div>
            )}
            <p className="text-xs text-slate-400 mt-3 font-medium">No spam. Unsubscribe anytime in one click.</p>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <h2 className="text-xs font-mono text-[#CCFF00] tracking-widest uppercase">// INVESTIGATION STREAM</h2>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 mr-1">Sort by:</span>
              {['latest', 'popular', 'oldest'].map((option) => (
                <button key={option} onClick={() => setSortBy(option as SortOption)} className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${sortBy === option ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-semibold' : 'bg-[#081630] text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'}`}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {sortedDispatches.map((dispatch) => (
              <article key={dispatch.id} onClick={() => navigate(`/dispatch/${dispatch.id}`)} className="group bg-[#081630]/50 hover:bg-[#081630] border border-slate-800/80 hover:border-[#CCFF00]/40 rounded-2xl p-8 md:p-10 transition-all duration-300 cursor-pointer relative overflow-hidden shadow-lg backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/5 rounded-full blur-2xl group-hover:bg-[#CCFF00]/10 transition-colors pointer-events-none"></div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#CCFF00] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]"></span>
                    <span>{dispatch.number}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{dispatch.category}</span>
                  </div>
                  <span>{dispatch.readTime}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#CCFF00] transition-colors leading-tight">{dispatch.title}</h3>
                <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed mb-6">{dispatch.summary}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                  <span className="text-xs text-slate-500 font-mono">{dispatch.status}</span>
                  <span className="text-xs font-semibold text-[#CCFF00] group-hover:translate-x-1 transition-transform flex items-center gap-1">Read Investigation →</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 relative z-10 bg-[#051124]">
        <p>© {new Date().getFullYear()} DEEP DISPATCHES. All rights reserved.</p>
      </footer>
    </>
  );
}

// --- MAKALE SAYFASI (Dinamik URL ile Paylaşılabilir) ---
function DispatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  // Makale içi state'ler (Eski kodundan taşındı)
  const [selectedEcotype, setSelectedEcotype] = useState<'resident' | 'transient'>('resident');
  const [activeAudioSrc, setActiveAudioSrc] = useState<string | null>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [paradigmMode, setParadigmMode] = useState<'myth' | 'reality'>('reality');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedArticle = DISPATCHES.find(d => d.id === id);
  const currentStage = TIMELINE_STAGES[activeStageIndex];

  const expectedAudioSrc = selectedEcotype === 'resident' ? '/resident-chirp.mp3' : '/transient-click.mp3';
  const isExpectedPlaying = activeAudioSrc === expectedAudioSrc;

  const togglePlayAudio = (src: string) => {
    if (activeAudioSrc === src) {
      if (audioRef.current) audioRef.current.pause();
      setActiveAudioSrc(null);
    } else {
      setActiveAudioSrc(src);
      if (audioRef.current) {
        audioRef.current.src = src;
        audioRef.current.play().catch(err => console.log('Audio prevented:', err));
      }
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  if (!selectedArticle) return <div className="text-center py-20 text-white">Makale bulunamadı. <Link to="/" className="text-[#CCFF00] underline">Ana sayfaya dön</Link></div>;

  return (
    <>
      <audio ref={audioRef} onEnded={() => setActiveAudioSrc(null)} className="hidden" />
      
      <header className="sticky top-0 z-50 bg-[#051124]/85 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
            <span className="font-bold tracking-widest text-sm text-slate-200">DEEP DISPATCHES</span>
          </Link>
          <div className="flex gap-4">
            <button onClick={copyLink} className="text-xs text-black bg-[#CCFF00] hover:bg-[#b8e600] px-4 py-2 rounded-lg font-mono font-bold transition-all">
              {copied ? '✓ Link Kopyalandı' : '🔗 Bu Makaleyi Paylaş'}
            </button>
            <button onClick={() => navigate('/')} className="text-xs text-[#CCFF00] hover:underline font-mono cursor-pointer">
              ← Geri Dön
            </button>
          </div>
        </div>
      </header>

      {id === 'dossier-002' ? (
        <PosidoniaDossier />
      ) : id === 'dossier-003' ? (
        <main className="max-w-3xl mx-auto px-6 py-32 relative z-10 text-center space-y-6">
          <span className="text-xs font-mono text-amber-400 tracking-widest uppercase">{selectedArticle.number} · IN DEVELOPMENT</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{selectedArticle.title}</h1>
          <p className="text-lg text-slate-400 font-light italic">{selectedArticle.subtitle}</p>
          <p className="text-sm text-slate-500 font-light max-w-xl mx-auto pt-4">This dispatch is still in the field. Sign up on the home page to be notified.</p>
        </main>
      ) : (
        <main className="py-16 space-y-16 relative z-10">
          
          {/* ARTICLE HEADER */}
          <div className="max-w-3xl mx-auto px-6 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-[#CCFF00]">
              <span>{selectedArticle.number}</span>
              <span>·</span>
              <span>{selectedArticle.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{selectedArticle.title}</h1>
            <p className="text-lg text-[#CCFF00]/90 font-light italic">{selectedArticle.subtitle}</p>
            <div className="text-xs text-slate-500 font-mono pt-2 border-b border-slate-800/80 pb-6 flex items-center gap-4">
              <span>Reading Time: {selectedArticle.readTime}</span>
              <span>·</span>
              <span>Status: {selectedArticle.status}</span>
            </div>
          </div>

          {/* HERO COVER PHOTO */}
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#081630] min-h-[500px] md:min-h-[680px] flex items-center justify-center">
              <img src="/orca-cover.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110 pointer-events-none" />
              <img src="/orca-cover.jpg" alt="Southern Resident Orca" className="relative z-10 max-h-[620px] md:max-h-[720px] w-auto max-w-full object-contain mx-auto my-auto shadow-2xl py-4" />
            </div>
          </div>

          {/* INTRO */}
          <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#CCFF00] first-letter:mr-3 first-letter:float-left">
              For centuries, human philosophy and Western science rested on a comfortable dogma: that culture, language, and abstract thought were exclusive domains of <em>Homo sapiens</em>. Animals had instincts; humans had intellect.
            </p>
            <p>
              However, deep beneath the surface waters of the world&apos;s oceans, marine biologists and neuroscientists are encountering a reality that shatters our anthropocentric pedestal. Orcas (<em>Orcinus orca</em>) do not merely possess high intelligence—they live inside ancient, non-human cultures shaped by dialect, specialized diets, and multi-generational knowledge systems.
            </p>
          </div>

          {/* SCROLLYTELLING 1 */}
          <section className="max-w-6xl mx-auto px-4 md:px-6 my-12">
            <div className="bg-[#081630]/90 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-6 shadow-2xl backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#CCFF00] tracking-widest uppercase block mb-1">// SCROLLYTELLING MODULE 01</span>
                  <h3 className="text-xl font-bold text-white">Acoustic-Spatial Ecotype Mapping</h3>
                </div>
                <div className="flex items-center gap-2 bg-[#051124] p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
                  <button onClick={() => { setSelectedEcotype('resident'); togglePlayAudio('/resident-chirp.mp3'); }} className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${selectedEcotype === 'resident' ? 'bg-[#CCFF00] text-black font-semibold' : 'text-slate-400 hover:text-white'}`}>Resident</button>
                  <button onClick={() => { setSelectedEcotype('transient'); togglePlayAudio('/transient-click.mp3'); }} className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${selectedEcotype === 'transient' ? 'bg-[#CCFF00] text-black font-semibold' : 'text-slate-400 hover:text-white'}`}>Transient</button>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-[#051124] group">
                <img src="/orca-map.svg" alt="Map" className="w-full h-auto object-cover min-h-[350px]" />
              </div>
              <div className="bg-[#051124]/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse"></span>
                    <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-wider">{selectedEcotype === 'resident' ? 'Southern Resident Ecotype' : "Bigg's Transient Ecotype"}</span>
                  </div>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">{selectedEcotype === 'resident' ? 'Resident pods rely heavily on highly complex, vocal dialects to coordinate salmon hunts.' : 'Transient pods hunt marine mammals with acute underwater hearing. They maintain silence for stealth.'}</p>
                </div>
                <button onClick={() => togglePlayAudio(expectedAudioSrc)} className={`shrink-0 px-6 py-3 rounded-xl border text-xs font-mono flex items-center gap-3 transition-all cursor-pointer ${isExpectedPlaying ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-bold' : 'bg-[#081630] text-[#CCFF00] border-[#CCFF00]/40 hover:border-[#CCFF00]'}`}>
                  <span>{isExpectedPlaying ? '▌▌ PAUSE' : '▶ PLAY HYDROPHONE'}</span>
                </button>
              </div>
            </div>
          </section>

          {/* SCROLLYTELLING 2 */}
          <section className="max-w-6xl mx-auto px-4 md:px-6 my-16">
            <div className="bg-[#081630]/90 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="space-y-4 border-b border-slate-800 pb-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] font-mono text-[#CCFF00] tracking-widest uppercase">// SCROLLYTELLING MODULE 02</span>
                  <div className="flex items-center gap-2 bg-[#051124] px-3 py-1 rounded-full border border-slate-800 text-[11px] font-mono">
                    <button onClick={() => setParadigmMode('reality')} className={`cursor-pointer ${paradigmMode === 'reality' ? 'text-[#CCFF00] font-bold' : 'text-slate-400'}`}>Darwinian Tree</button>
                    <span className="text-slate-700">|</span>
                    <button onClick={() => setParadigmMode('myth')} className={`cursor-pointer ${paradigmMode === 'myth' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>Scala Natura Myth</button>
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-white">Deep-Time Cartography of Intelligence</h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed max-w-2xl">{paradigmMode === 'reality' ? 'Intelligence is not a ladder. It is a continuous evolutionary tree.' : 'The myth of "Scala Natura" viewed life as a linear ladder.'}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                {TIMELINE_STAGES.map((stage, idx) => (
                  <button key={stage.id} onClick={() => setActiveStageIndex(idx)} className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${activeStageIndex === idx ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-bold scale-[1.02]' : 'bg-[#051124]/80 text-slate-400 border-slate-800 hover:text-white'}`}>
                    <span className="text-[9px] font-mono block opacity-75 mb-1">STEP 0{idx + 1}</span>
                    <span className="text-xs font-semibold leading-tight line-clamp-2">{stage.title}</span>
                  </button>
                ))}
              </div>

              <div className="bg-[#051124] border border-slate-800/90 rounded-2xl p-6 md:p-8 space-y-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-wider block">{currentStage.tag}</span>
                    <h4 className="text-xl md:text-2xl font-bold text-white mt-1">{currentStage.title}</h4>
                  </div>
                </div>
                <p className="text-base text-slate-300 font-light leading-relaxed">{currentStage.description}</p>
                <div className="p-4 bg-[#081630] border-l-2 border-[#CCFF00] rounded-r-xl text-xs font-mono text-slate-200">
                  <span className="text-[#CCFF00] font-bold mr-2">// TAKEAWAY:</span>{currentStage.highlight}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-xs font-mono">
                  <button onClick={() => setActiveStageIndex(Math.max(0, activeStageIndex - 1))} disabled={activeStageIndex === 0} className="px-4 py-2 rounded-lg border border-slate-800 text-slate-400 disabled:opacity-30 cursor-pointer">← Previous</button>
                  <span className="text-slate-500">Epoch {activeStageIndex + 1} of {TIMELINE_STAGES.length}</span>
                  <button onClick={() => setActiveStageIndex(Math.min(TIMELINE_STAGES.length - 1, activeStageIndex + 1))} disabled={activeStageIndex === TIMELINE_STAGES.length - 1} className="px-4 py-2 rounded-lg border border-[#CCFF00]/40 text-[#CCFF00] disabled:opacity-30 cursor-pointer">Next →</button>
                </div>
              </div>
            </div>
          </section>

          {/* ESSAY & REFERENCES */}
          <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-12 text-base md:text-lg">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">01. Culture Drives Biological Evolution</h2>
              <p>In evolutionary biology, the standard model assumes genetic mutations dictate behavioral shifts. In orcas, this paradigm is flipped. Cultural traditions dictate genetics.</p>
            </div>
            <div className="border-t border-slate-800 pt-10 mt-12 space-y-4 text-xs font-mono text-slate-400">
              <h4 className="text-[#CCFF00] uppercase tracking-widest text-[11px] font-bold">// ACADEMIC REFERENCES</h4>
              <ul className="space-y-3 list-disc list-inside leading-relaxed text-slate-400">
                <li>Foote, A. D., et al. (2016). Genome-wide signatures of culture-driven divergence in killer whales.</li>
                <li>Brent, L. J., et al. (2015). Ecological knowledge runs deep in grandmother killer whales.</li>
              </ul>
            </div>
          </div>

        </main>
      )}

      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 relative z-10 bg-[#051124]">
        <p>© {new Date().getFullYear()} DEEP DISPATCHES. All rights reserved.</p>
      </footer>
    </>
  );
}