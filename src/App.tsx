export default function App() {
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

          {/* BEEHIIV EMBED FORM */}
          <div className="pt-6 max-w-md mx-auto w-full">
            <iframe 
              src="https://embeds.beehiiv.com/95e99d49-c678-493b-8bd6-bdcc10c32896?s=true" 
              data-test-id="beehiiv-embed" 
              height="52" 
              frameBorder="0" 
              scrolling="no" 
              style={{ margin: '0', borderRadius: '0px', backgroundColor: 'transparent', width: '100%' }}
            ></iframe>
            <p className="text-xs text-slate-500 mt-4 text-center">
              Spam yok. İstediğiniz zaman tek tıkla ayrılabilirsiniz.
            </p>
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
        <section className="border-t border-slate-800/80 pt-16 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-[#CCFF00] tracking-wider uppercase mb-2">01. Bağımsız</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Reklam verenlerin veya tıklama kaygılarının yönlendirmediği, saf odaklı gazetecilik.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#CCFF00] tracking-wider uppercase mb-2">02. Derinlikli</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Yüzeysel haber akışı yerine veri odaklı, görsel ve derinlemesine araştırma dosyaları.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#CCFF00] tracking-wider uppercase mb-2">03. Zamansız</h3>
            <p className="text-xs text-slate-400 leading-relaxed">24 saatlik gündem tüketiciliği değil; yıllar sonra da değerini koruyan kalıcı içerik.</p>
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