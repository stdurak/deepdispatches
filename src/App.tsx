import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { DISPATCHES, DISPATCH_COMPONENTS, StandardDossier } from './dispatches';

type SortOption = 'latest' | 'popular' | 'oldest';

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

  // API Bağlantısı için gerekli state'ler
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        const data = await response.json();
        alert(data.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const sortedDispatches = [...DISPATCHES].sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === 'popular') return (b.views || 0) - (a.views || 0);
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

        {/* HERO SECTION */}
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
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email..."
                  className="flex-1 px-4 py-3 bg-[#051124]/90 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#CCFF00]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#CCFF00] hover:bg-[#b8e600] disabled:opacity-50 text-black font-semibold rounded-lg cursor-pointer whitespace-nowrap transition-colors"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            <p className="text-xs text-slate-400 mt-3 font-medium">No spam. Unsubscribe anytime in one click.</p>
          </div>
        </motion.section>

        {/* INVESTIGATION STREAM */}
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

        {/* MANIFESTO SECTION */}
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
