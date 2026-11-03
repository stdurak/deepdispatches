import { motion, type Variants } from 'framer-motion';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export default function IndoPacificDossier({ article }: { article: any }) {
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

      {/* HERO COVER VIDEO */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-12">
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#081630] aspect-video flex items-center justify-center">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            poster="/indopacific-hero-poster.jpg" 
            className="w-full h-full object-cover opacity-70"
          >
            <source src="/indopacific-hero.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#051124] via-transparent to-transparent opacity-80 pointer-events-none"></div>

          <div className="absolute bottom-0 inset-x-0 z-20 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
            <span className="text-xs font-mono text-slate-300">
              The atmospheric conversation between the Indian and Pacific Oceans.
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-black/80 px-2.5 py-1 rounded border border-slate-700 shrink-0">
              Video by <a href="https://pixabay.com/users/doktorkleinmusic-5871510/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=382760" target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline">Norberto Navarro Valiente</a> / Pixabay
            </span>
          </div>
        </div>
      </div>

      {/* INTRO TEXT */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
        className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12"
      >
        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#CCFF00] first-letter:mr-3 first-letter:float-left">
          For 400 years, the Indian and Pacific Oceans maintained a synchronized atmospheric conversation. Now, human emissions are breaking the connection — and destroying our ability to predict the climate.
        </p>
        <p>
          For centuries, the Indian and Pacific Oceans have maintained a synchronized atmospheric "conversation" that serves as a primary heartbeat for the global climate. Scientists call this inter-basin coupling.
        </p>
        <p>
          The primary bridge for this communication is the Pacific Walker Circulation (PWC) — a massive loop of moving air that rises over the Maritime Continent and sinks over the eastern Pacific. Typically, when the PWC weakens, it triggers a predictable chain reaction: air descends over the Maritime Continent, suppressing cloud cover and enhancing surface heat fluxes into the Indian Ocean, causing it to warm.
        </p>
        <p>
          However, a landmark study from the Woods Hole Oceanographic Institution (WHOI) reveals that this long-standing marriage is failing. The two oceans are "decoupling," and the Indian Ocean is increasingly acting as a rebellious independent agent.
        </p>
      </motion.div>

      {/* SECTION I: TIME CAPSULES */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
        className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-16"
      >
        <h2 className="text-2xl font-bold text-white">Nature’s Time Capsules Reveal a 400-Year Bond</h2>
        <p>
          To determine if the current breakdown is truly unprecedented, WHOI researchers had to look beyond the brief window of modern satellite data. They synthesized "paleoclimate archives" — natural records including corals, tree rings, and stalagmites — to reconstruct Indo-Pacific climate modes back to 1631.
        </p>
        <p>
          By analyzing chemical signatures like oxygen isotopes and tree-ring widths, they established a baseline for the Pre-industrial Era (1630–1800 CE). The data confirmed that for most of the last four centuries, the Indian and Pacific Oceans were tightly linked. This 400-year perspective was vital for defining the statistical boundaries of "normal" behavior, proving that the modern shift is far from a natural fluke.
        </p>
      </motion.div>

      {/* FIGURE 1: PALEO ARCHIVES */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
        className="max-w-5xl mx-auto px-4 md:px-6 my-10"
      >
        <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl relative overflow-hidden group">
          <img src="/paleo-archives.jpg" alt="Paleoclimate Archives" className="w-full h-auto max-h-[500px] object-cover rounded-xl border border-slate-700/50" />
          <div className="mt-4 px-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">Fig 01 · Natural Climate Archives</span>
            <span className="text-[10px] font-mono text-slate-500 text-right sm:text-left max-w-lg leading-tight">
              Photo by Jimmy Tandjoeng / Getty Images
            </span>
          </div>
        </div>
      </motion.div>

      {/* QUOTE 1 */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="max-w-4xl mx-auto px-6 my-12">
        <div className="p-8 bg-[#081630] border-l-4 border-[#CCFF00] rounded-r-2xl text-slate-100 font-serif text-lg md:text-xl italic leading-relaxed shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/5 rounded-full blur-2xl pointer-events-none"></div>
          "With climate models and paleo-records, we are now able to say with more confidence that the recent changes we are seeing are really quite exceptional."
          <span className="block text-xs font-sans font-bold text-[#CCFF00] mt-4 not-italic tracking-wider uppercase">— Lead author Shawn Wang</span>
        </div>
      </motion.div>

      {/* SECTION II: VOLCANOES */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
        className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-16"
      >
        <h2 className="text-2xl font-bold text-white">The Volcanic Party Crashers of the 19th Century</h2>
        <p>
          The first major disruption found in the records occurred between 1810 and 1850. This era was defined by a series of massive volcanic stratospheric sulfur injections (VSSI) from tropical volcanoes, including the catastrophic 1815 eruption of Mount Tambora.
        </p>
        <p>
          The study found that these eruptions temporarily "blindfolded" the Indian Ocean. While a weakening PWC should have caused the Indian Ocean to warm, the cooling effect of volcanic aerosols was not spatially uniform. Stronger cooling signals in the western basins generated westerly wind anomalies and atmospheric Kelvin waves that overwhelmed the Pacific's influence. This disruption pushed the relationship outside normal confidence intervals, marking a historical period where the Indian Ocean's response was driven by volcanic forcing rather than Pacific teleconnections.
        </p>
      </motion.div>

      {/* FIGURE 2: VOLCANO */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
        className="max-w-5xl mx-auto px-4 md:px-6 my-10"
      >
        <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl relative overflow-hidden group">
          <img src="/volcano-tambora.jpg" alt="Volcanic Eruption" className="w-full h-auto max-h-[500px] object-cover rounded-xl border border-slate-700/50" />
          <div className="mt-4 px-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">Fig 02 · Volcanic Forcing</span>
            <span className="text-[10px] font-mono text-slate-500 text-right sm:text-left max-w-lg leading-tight">
              Photo by Buzz Anderson / Unsplash
            </span>
          </div>
        </div>
      </motion.div>

      {/* QUOTE 2 */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="max-w-4xl mx-auto px-6 my-12">
        <div className="p-8 bg-[#081630] border-l-4 border-[#CCFF00] rounded-r-2xl text-slate-100 font-serif text-lg md:text-xl italic leading-relaxed shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/5 rounded-full blur-2xl pointer-events-none"></div>
          "This is one of the first studies to examine the breakdown in the connection between the Pacific and Indian oceans using evidence from past climates, modern observations, and climate models."
          <span className="block text-xs font-sans font-bold text-[#CCFF00] mt-4 not-italic tracking-wider uppercase">— Co-author Caroline Ummenhofer</span>
        </div>
      </motion.div>

      {/* SECTION III: REBELLIOUS HEAT RESERVOIR & MODERN BREAKUP */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
        className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-16"
      >
        <h2 className="text-2xl font-bold text-white">The Modern Breakup is Unprecedented</h2>
        <p>
          The central player in this decoupling is the Indian Ocean Basin Mode (IOBM). While the Indian Ocean usually mirrors the Pacific, it is also a massive heat reservoir capable of independent behavior through local air-sea interactions and Kelvin waves.
        </p>
        <p>
          The contrast between 19th-century volcanic disruptions and the modern era is stark. While volcanoes caused a temporary "blindfold," human-caused greenhouse gases are fundamentally rewriting the relationship. The Indian Ocean is now warming by approximately 0.1°C per decade due to greenhouse gas emissions. 
        </p>
        <p>
          Historically, the PWC and IOBM shared a negative correlation. Today, the relationship has reversed to a positive correlation, a shift that is statistically exceptional even compared to the most intense volcanic epochs of the last millennium.
        </p>
      </motion.div>

      {/* FIGURE 3: OCEAN DECOUPLING */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
        className="max-w-5xl mx-auto px-4 md:px-6 my-10"
      >
        <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl relative overflow-hidden group">
          <img src="/ocean-decoupling.jpg" alt="Ocean Decoupling" className="w-full h-auto max-h-[500px] object-cover rounded-xl border border-slate-700/50" />
          <div className="mt-4 px-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">Fig 03 · The Decoupling</span>
            <span className="text-[10px] font-mono text-slate-500 text-right sm:text-left max-w-lg leading-tight">
              Photo by Caroline Ummenhofer / ©Woods Hole Oceanographic Institution
            </span>
          </div>
        </div>
      </motion.div>

      {/* QUOTE 3 */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="max-w-4xl mx-auto px-6 my-12">
        <div className="p-8 bg-[#081630] border-l-4 border-[#CCFF00] rounded-r-2xl text-slate-100 font-serif text-lg md:text-xl italic leading-relaxed shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/5 rounded-full blur-2xl pointer-events-none"></div>
          "The Indian Ocean is a huge heat reservoir, and it can decouple from what the Pacific Ocean is doing. The results of this study underscore the independent behavior of the Indian Ocean."
          <span className="block text-xs font-sans font-bold text-[#CCFF00] mt-4 not-italic tracking-wider uppercase">— Co-author Delia Oppo</span>
        </div>
      </motion.div>

      {/* CONCLUSION & REFERENCES */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
        className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12 mb-16 border-t border-slate-800/80 pt-8"
      >
        <h2 className="text-2xl font-bold text-white">Why Predictability is the Real Casualty</h2>
        <p>
          The stakes of this research extend far beyond academic interest; the decoupling of these oceans represents a crisis for climate risk management. The stable interaction between the Pacific and Indian basins has long been the "secret sauce" for near-term and seasonal predictability.
        </p>
        <p>
          Meteorologists rely on these inter-basin connections to forecast rainfall patterns, droughts, and floods across Africa, Asia, and Australia. If the Indian Ocean continues to act independently of the Pacific, our ability to forecast regional water availability months in advance will severely degrade. When the "rules" of the atmospheric conversation change, the predictability we have relied upon for survival effectively vanishes.
        </p>
        <p>
          We are now entering an era where the primary drivers of regional weather are decoupling. As the two oceans stop talking, we are forced to navigate a future of increased volatility.
        </p>

        {/* REFERENCES */}
        <div className="border-t border-slate-800 pt-8 mt-10 space-y-4 text-xs font-mono text-slate-400">
          <h4 className="text-[#CCFF00] uppercase tracking-widest text-[11px] font-bold">
            // ACADEMIC REFERENCES &amp; METHODOLOGY
          </h4>
          <ul className="space-y-3 list-disc list-inside leading-relaxed">
            <li>
              Wang, S., Oppo, D. W., &amp; Ummenhofer, C. C. (2026). "Coupling of Pacific and Indian Ocean variability disrupted by 19th century volcanism." <em>Nature Communications</em>, 17, 8572. <a href="https://doi.org/10.1038/s41467-026-76705-y" target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline ml-1">[DOI ↗]</a>
            </li>
            <li>
              Woods Hole Oceanographic Institution (WHOI). (2026). <em>"Volcanic eruptions and a warming climate have disrupted close connections between the Indian and Pacific Oceans."</em> WHOI Press Room. <a href="https://www.whoi.edu/press-room/news-release/volcanicoceans/" target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline ml-1">[Press Release ↗]</a>
            </li>
          </ul>
        </div>
      </motion.div>
    </>
  );
}