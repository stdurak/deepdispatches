import { useState, useRef, useEffect } from 'react';
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

// --- MAKALE SAYFASI (Dinamik URL) ---
function DispatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const selectedArticle = DISPATCHES.find(d => d.id === id);

  // Paylaşım fonksiyonu
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
      <header className="sticky top-0 z-50 bg-[#051124]/85 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
            <span className="font-bold tracking-widest text-sm text-slate-200">DEEP DISPATCHES</span>
          </Link>
          <button onClick={() => navigate('/')} className="text-xs text-[#CCFF00] hover:underline font-mono cursor-pointer">
            ← Back to All Dispatches
          </button>
        </div>
      </header>

      <main className="py-16 relative z-10">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs font-mono text-[#CCFF00]">
              <span>{selectedArticle.number}</span>
              <span>·</span>
              <span>{selectedArticle.category}</span>
            </div>
            
            {/* PAYLAŞ BUTONU */}
            <button onClick={copyLink} className="px-4 py-2 bg-[#081630] hover:bg-[#CCFF00] hover:text-black text-[#CCFF00] border border-[#CCFF00]/40 rounded-lg text-xs font-mono transition-colors">
              {copied ? '✓ Link Kopyalandı' : '🔗 Linki Paylaş'}
            </button>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{selectedArticle.title}</h1>
          <p className="text-lg text-[#CCFF00]/90 font-light italic">{selectedArticle.subtitle}</p>
          
          {id === 'dossier-001' && (
            <div className="pt-8 text-slate-300">
              <p>Buraya orca makalesinin içeriği gelecek (yer kaplamaması için kısa kesildi, eski kodundaki aynı içeriği buraya taşıyabilirsin).</p>
            </div>
          )}

          {id === 'dossier-002' && <PosidoniaDossier />}

          {id === 'dossier-003' && (
            <div className="py-20 text-center space-y-4 border-t border-slate-800 mt-8">
              <h2 className="text-2xl font-bold text-amber-400">IN DEVELOPMENT</h2>
              <p className="text-slate-400">This dispatch is currently in the field. Sign up on the home page to be notified.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 relative z-10 bg-[#051124]">
        <p>© {new Date().getFullYear()} DEEP DISPATCHES. All rights reserved.</p>
      </footer>
    </>
  );
}