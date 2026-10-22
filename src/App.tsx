import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { DISPATCHES, DISPATCH_COMPONENTS } from './dispatches';

type SortOption = 'latest' | 'popular' | 'oldest';

// HATA ÇÖZÜMÜ: fadeUpVariant değişkenine ': Variants' tipi atandı
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
          <Link to="/" className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
            <span className="font-bold tracking-widest text-sm text-slate-200">DEEP DISPATCHES</span>
          </Link>
          <span className="text-xs text-slate-500 uppercase tracking-widest border border-slate-800 rounded-full px-3 py-1 hidden sm:inline-block">Independent Media</span>
        </div>
      </header>

      <div className="absolute top-0 left-0 w-full h-[650px] overflow-hidden pointer-events-none z-0">
        <video autoPlay loop muted playsInline ref={(el) => { if (el) el.muted = true; }} className="w-full h-full object-cover opacity-65 scale-105 brightness-125">
          <source src="/bubble.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/25 via-[#051124]/50 to-[#051124]"></div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-24 relative z-10">
        
        {/* HERO SECTION (Animasyonlu) */}
        <motion.section 
          initial="hidden" 
          animate="visible" 
          variants={fadeUpVariant}
          className="text-center space-y-6 pt-12 pb-8 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-2xl">
            Far Below The <span className="text-[#CCFF00]">Surface Noise.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 font-light max-w-2xl mx-auto">No social algorithms. Timeless, interactive, and deeply researched ecological investigations.</p>

          <div className="pt-4 max-w-md mx-auto">
            {submitted ? (
              <div className="p-4 bg-[#081630]/90 border border-[#CCFF00]/40 rounded-lg text-[#CCFF00] text-sm font-mono">✓ Subscription received.</div>
            ) : (
              <form action="https://app.beehiiv.com/subscribe" method="POST" target="beehiiv-target" onSubmit={() => setSubmitted(true)} className="flex flex-col sm:flex-row gap-3">
                <input type="hidden" name="publication_id" value="pub_2383c5ca-1813-4b13-b35f-6b498cd01829" />
                <input type="email" name="email" required placeholder="Enter your email..." className="flex-1 px-4 py-3 bg-[#051124]/90 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#CCFF00]" />
                <button type="submit" className="px-6 py-3 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-semibold rounded-lg cursor-pointer">Subscribe</button>
              </form>
            )}
          </div>
        </motion.section>

        {/* INVESTIGATION STREAM (Animasyonlu) */}
        <section className="space-y-8">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="flex items-center justify-between border-b border-slate-800/80 pb-4"
          >
            <h2 className="text-xs font-mono text-[#CCFF00] tracking-widest uppercase">// INVESTIGATION STREAM</h2>
            <div className="flex gap-2 text-xs font-mono">
              {['latest', 'popular', 'oldest'].map(option => (
                <button key={option} onClick={() => setSortBy(option as SortOption)} className={`px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${sortBy === option ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-semibold' : 'bg-[#081630] text-slate-400 border-slate-800 hover:border-slate-600'}`}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="space-y-8">
            {sortedDispatches.map((dispatch, index) => (
              <motion.article 
                key={dispatch.id} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
                }}
                onClick={() => navigate(`/dispatch/${dispatch.id}`)} 
                className="group bg-[#081630]/50 hover:bg-[#081630] border border-slate-800/80 hover:border-[#CCFF00]/40 rounded-2xl p-8 md:p-10 transition-all duration-300 cursor-pointer relative overflow-hidden shadow-lg backdrop-blur-sm hover:-translate-y-1"
              >
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#CCFF00] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]"></span>
                    <span>{dispatch.number}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{dispatch.category}</span>
                  </div>
                  <span>{dispatch.readTime}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#CCFF00] leading-tight transition-colors">{dispatch.title}</h3>
                <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed mb-6">{dispatch.summary}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                  <span className="text-xs text-slate-500 font-mono">{dispatch.status}</span>
                  <span className="text-xs font-semibold text-[#CCFF00] group-hover:translate-x-1 transition-transform">Read Investigation →</span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* MANIFESTO SECTION (Animasyonlu) */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="border-t border-slate-800/80 pt-16 space-y-10"
        >
          <div className="max-w-3xl">
            <h3 className="text-xs font-mono text-[#CCFF00] tracking-widest uppercase mb-4">// THE MANIFESTO</h3>
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              Welcome to <strong className="text-white font-semibold">Deep Dispatches</strong>, a platform created far below the surface noise. Here, I bridge the gap between Deep Ecology, Marine Mysteries, and the critical worlds of Ecological Finance and Geo-Political Journeys.
            </p>
            <p className="text-base text-slate-400 font-light leading-relaxed mt-4">
              Moving beyond static reporting, I craft visually immersive scrollytelling experiences. Through interactive mapping, dynamic data, and cinematic narratives, I don&apos;t just tell these stories—I give you the depth to explore them. Don&apos;t miss the horizon.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-4 border-t border-slate-800/40">
            <div>
              <h4 className="text-sm font-semibold text-[#CCFF00] tracking-wider uppercase mb-2">01. Independent</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Pure journalism uninfluenced by advertisers, algorithms, or clickbait metrics.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#CCFF00] tracking-wider uppercase mb-2">02. Immersive</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Interactive scrollytelling, dynamic maps, and data visualizations instead of quick news bites.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#CCFF00] tracking-wider uppercase mb-2">03. Timeless</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Deep investigative dossiers built to hold lasting intellectual and ecological value for years.</p>
            </div>
          </div>
        </motion.section>

        {/* THE INVESTIGATOR SECTION (Animasyonlu) */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="border-t border-slate-800/80 pt-16 space-y-6"
        >
          <h3 className="text-xs font-mono text-[#CCFF00] tracking-widest uppercase">// THE INVESTIGATOR</h3>
          
          <div className="bg-[#081630]/60 border border-slate-800/80 rounded-2xl p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row gap-8 items-start backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#CCFF00]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 relative rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 bg-slate-900">
              <img src="/profile.jpg" alt="The Investigator" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081630] via-transparent to-transparent"></div>
            </div>

            <div className="space-y-6 flex-1">
              <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed">
                When people ask what I do for a living, the answer has changed many times over the years: camera operator, field correspondent, Editor-in-Chief, logistics manager, diving instructor... But deep down, I have always been one thing: <span className="text-[#CCFF00] font-normal">a journalist.</span>
              </p>
              <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
                I spent decades inside major media networks and independent platforms—including <strong className="text-slate-200">CNN, NTV, ATV, Medyascope, and Reportare</strong>—navigating the high-pressure world of newsrooms. But chasing social media algorithms and being a &apos;content creator&apos; left me exhausted.
              </p>
              <div className="pt-4 flex flex-wrap gap-3 text-xs font-mono text-slate-500">
                <span className="px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full">Journalism &amp; Broadcast</span>
                <span className="px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full">Scuba Diving Instructor</span>
                <span className="px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full">Deep Ecology</span>
              </div>
            </div>
          </div>
        </motion.section>

      </main>

      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 bg-[#051124] mt-24">
        <p>© {new Date().getFullYear()} DEEP DISPATCHES. All rights reserved.</p>
      </footer>
    </>
  );
}

// --- MAKALE SAYFASI ---
function DispatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const article = DISPATCHES.find(d => d.id === id);
  const DossierComponent = id ? DISPATCH_COMPONENTS[id] : null;

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!article) return <div className="text-center py-20 text-white">Dispatch not found. <Link to="/" className="text-[#CCFF00] underline">Return to Home</Link></div>;

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#051124]/85 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
            <span className="font-bold tracking-widest text-sm text-slate-200">DEEP DISPATCHES</span>
          </Link>
          <div className="flex gap-4">
            <button onClick={copyLink} className="text-xs text-black bg-[#CCFF00] hover:bg-[#b8e600] px-4 py-2 rounded-lg font-mono font-bold transition-all">
              {copied ? '✓ Link Copied' : '🔗 Share this Dispatch'}
            </button>
            <button onClick={() => navigate('/')} className="text-xs text-[#CCFF00] hover:underline font-mono">← Back to All Dispatches</button>
          </div>
        </div>
      </header>

      <main className="py-16 relative z-10">
        {DossierComponent ? (
          <DossierComponent article={article} />
        ) : (
          <div className="max-w-3xl mx-auto px-6 py-32 text-center space-y-6">
            <span className="text-xs font-mono text-amber-400 tracking-widest uppercase">{article.number} · IN DEVELOPMENT</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">{article.title}</h1>
            <p className="text-lg text-slate-400 italic">{article.subtitle}</p>
            <p className="text-sm text-slate-500">This dispatch is currently in development.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 bg-[#051124]">
        <p>© {new Date().getFullYear()} DEEP DISPATCHES. All rights reserved.</p>
      </footer>
    </>
  );
}