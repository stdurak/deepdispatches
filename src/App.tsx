import { useState } from 'react';

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#030914] text-slate-100 font-sans selection:bg-[#CCFF00] selection:text-black">
      {/* HEADER */}
      <header className="border-b border-slate-800/80 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
          <span className="font-bold tracking-widest text-sm text-slate-200">DEEP DISPATCHES</span>
        </div>
        <span className="text-xs text-slate-500 uppercase tracking-widest border border-slate-800 rounded-full px-3 py-1">
          Independent Media
        </span>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-6 pt-4">
          <div className="inline-block px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-[#CCFF00] font-mono tracking-wider uppercase mb-2">
            Dispatch #000 · Platform Launch
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Far Below The <span className="text-[#CCFF00]">Surface Noise.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            No social algorithms. Timeless, interactive, and deeply researched ecological investigations delivered directly to your inbox.
          </p>

          {/* SLEEK FORM WITH INLINE SUCCESS */}
          <div className="pt-4 max-w-md mx-auto">
            {submitted ? (
              <div className="p-4 bg-[#081225] border border-[#CCFF00]/40 rounded-lg text-[#CCFF00] text-sm font-mono">
                ✓ Abonelik talebiniz alındı. Lütfen e-postanızı kontrol edin!
              </div>
            ) : (
              <>
                <form 
                  action="https://app.beehiiv.com/subscribe" 
                  method="POST" 
                  target="beehiiv-target"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input type="hidden" name="publication_id" value="pub_2383c5ca-1813-4b13-b35f-6b498cd01829" />
                  
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="E-posta adresinizi yazın..."
                    className="flex-1 px-4 py-3 bg-[#081225] border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Abone Ol
                  </button>
                </form>
                <iframe name="beehiiv-target" className="hidden" title="beehiiv-form-target" />
              </>
            )}
            <p className="text-xs text-slate-500 mt-3">Spam yok. İstediğiniz zaman tek tıkla ayrılabilirsiniz.</p>
          </div>
        </section>

        {/* DOSSIER #001 PREVIEW */}
        <section className="bg-[#081225]/60 border border-slate-800/80 rounded-2xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#CCFF00]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 text-xs font-mono text-[#CCFF00] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]"></span>
            <span>DOSSIER #001 · UPCOMING</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Silent Giants: Mapping the Mediterranean Dusky Grouper
          </h2>
          
          <p className="text-slate-400 leading-relaxed mb-6 font-light">
            Akdeniz'in kıyı ekosistemini ve orfoz popülasyonunu şekillendiren derin deniz verileri. İnteraktif derinlik haritaları ve saha araştırmalarıyla yakında yayında.
          </p>

          <div className="inline-flex items-center text-xs text-slate-400 border border-slate-700/60 rounded-md px-3 py-1.5 bg-slate-900/50">
            <span>Yayın Tarihi: Çok Yakında</span>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="border-t border-slate-800/80 pt-16 space-y-10">
          <div className="max-w-3xl">
            <h3 className="text-xs font-mono text-[#CCFF00] tracking-widest uppercase mb-4">
              // THE MANIFESTO
            </h3>
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              Welcome to <strong className="text-white font-semibold">Deep Dispatches</strong>, a platform created far below the surface noise. Here, I bridge the gap between Deep Ecology, Marine Mysteries, and the critical worlds of Ecological Finance and Geo-Political Journeys.
            </p>
            <p className="text-base text-slate-400 font-light leading-relaxed mt-4">
              Moving beyond static reporting, I craft visually immersive scrollytelling experiences. Through interactive mapping, dynamic data, and cinematic narratives, I don't just tell these stories—I give you the depth to explore them. Don't miss the horizon.
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
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} DEEP DISPATCHES. All rights reserved.</p>
      </footer>
    </div>
  );
}