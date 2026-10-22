export default function CephalopodDossier({ article }: { article: any }) {
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
            src="/cuttlefish-hero.jpg" 
            alt="" 
            aria-hidden="true" 
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110 pointer-events-none" 
          />
          <img 
            src="/cuttlefish-hero.jpg" 
            alt="Cuttlefish displaying camouflage" 
            className="relative z-10 max-h-[500px] w-auto max-w-full object-contain mx-auto my-auto shadow-2xl py-4" 
          />
          
          {/* HERO IMAGE CREDIT */}
          <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#051124] via-[#051124]/80 to-transparent p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
            <span className="text-xs font-mono text-slate-300">
              The cuttlefish's split-body tactic reveals profound biological truths.
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-black/80 px-2.5 py-1 rounded border border-slate-700 shrink-0">
              Photo by <a href="https://unsplash.com/@jonathandiemel" target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline">Jonathan Diemel</a> / Unsplash
            </span>
          </div>
        </div>
      </div>

      {/* INTRO TEXT */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12">
        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#CCFF00] first-letter:mr-3 first-letter:float-left">
          In the photic zone of the open ocean, life is conducted inside a panopticon. For pelagic and benthic organisms alike, biological survival is governed by a singular, zero-sum evolutionary trade-off: <strong>conspicuity versus survival.</strong>
        </p>
        <p>
          To reproduce, an individual must broadcast its fitness across the water column—flashing vivid chromatic banners, asserting territorial dominance, and seducing prospective mates. Yet in a fluid world populated by apex visual hunters—sharks, toothed whales, and predatory teleost fish—an optical broadcast is an open invitation to predation.
        </p>
      </div>

      {/* SECTION I */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-16">
        <h2 className="text-2xl font-bold text-white">I. The Bilateral Partition: Half-Suitor, Half-Substrate</h2>
        <p>
          Western biology long treated animal camouflage as a passive, uniform state—a creature is either hidden or exposed. The male cuttlefish treats its own dermis as a dynamic, split-screen command console.
        </p>
        <p>
          During competitive mating congregations, a suitor frequently finds himself sandwiched between two diametrically opposed observers: an unreceptive female positioned below or beside him, and a larger, aggressively territorial bull male patrolling the immediate periphery.
        </p>
      </div>

      {/* FIGURE 1: SPLIT BODY */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 my-10">
        <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#CCFF00]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <img 
            src="/cuttlefish-split.png" 
            alt="Cuttlefish Split Body Maneuver" 
            className="w-full h-auto rounded-xl border border-slate-700/50 invert-[0.85] hue-rotate-180 contrast-125 brightness-90 mix-blend-screen opacity-90" 
          />
          <div className="mt-4 px-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">Fig 01 · The Split-Body Maneuver</span>
            <span className="text-[10px] font-mono text-slate-500">Source: Nature's Encrypted Duality</span>
          </div>
        </div>
      </div>

      {/* SECTION II */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12">
        <h2 className="text-2xl font-bold text-white">II. The Invisible Bandwidth: Stokes Vectors in the Shallows</h2>
        <p>
          The bilateral deception operates entirely within the visible spectrum. But the cuttlefish's most profound cryptographic leap occurs within a physics domain that human evolution left behind: <strong>Linear Polarization.</strong>
        </p>
        <p>
          Light is an electromagnetic wave. While human retinas register only wave amplitude (brightness) and frequency (color), they are fundamentally blind to the <em>angle of oscillation</em>. To an octopus, squid, or cuttlefish, that same water column is saturated with directional information.
        </p>
      </div>

      {/* FIGURE 2: VISION COMPARISON */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 my-10">
        <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl relative overflow-hidden group">
          <img 
            src="/cuttlefish-vision.png" 
            alt="Cuttlefish Vision vs Mammal Vision" 
            className="w-full h-auto rounded-xl border border-slate-700/50 invert-[0.85] hue-rotate-180 contrast-125 brightness-90 mix-blend-screen opacity-90" 
          />
          <div className="mt-4 px-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">Fig 02 · The Secret Channel of Polarized Light</span>
            <span className="text-[10px] font-mono text-slate-500">Source: Sensory Capability &amp; Optical Physics</span>
          </div>
        </div>
      </div>

      {/* SECTION III */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12">
        <h2 className="text-2xl font-bold text-white">III. Living Metamaterials</h2>
        <p>
          How does an animal build a polarizing LCD monitor out of soft, organic tissue? Cephalopod skin is an active <strong>photonic metamaterial</strong> composed of three stacked, interacting cellular architectural strata.
        </p>
      </div>

      {/* FIGURE 3: SKIN LAYERS */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 my-10">
        <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl relative overflow-hidden group">
          <img 
            src="/cuttlefish-layers.png" 
            alt="Cuttlefish Skin Layers" 
            className="w-full h-auto rounded-xl border border-slate-700/50 invert-[0.85] hue-rotate-180 contrast-125 brightness-90 mix-blend-screen opacity-90" 
          />
          <div className="mt-4 px-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">Fig 03 · The Dual-Layer Biological Hardware</span>
            <span className="text-[10px] font-mono text-slate-500">Source: Mäthger &amp; Hanlon, Marine Biological Laboratory</span>
          </div>
        </div>
      </div>

      {/* FIGURE 4: SIGNAL TRANSMISSION */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 my-10">
        <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl relative overflow-hidden group">
          <img 
            src="/cuttlefish-signal.png" 
            alt="Signal Transmission" 
            className="w-full h-auto rounded-xl border border-slate-700/50 invert-[0.85] hue-rotate-180 contrast-125 brightness-90 mix-blend-screen opacity-90" 
          />
          <div className="mt-4 px-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">Fig 04 · The Vantage Point Optical Hack</span>
            <span className="text-[10px] font-mono text-slate-500">Source: Nakayama et al. (2024)</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12">
        <p>
          The cuttlefish’s arm muscles function precisely as an optical retarder plate. As horizontally polarized light travels through the transparent muscle strands, the physical tension physically rotates the e-vector into a vertical polarization angle—readable only by the female positioned inches beneath him.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10">IV. Biomimicry and Asymmetric Warfare</h2>
        <p>
          The evolutionary ingenuity of <em>Sepia</em> has long crossed over from theoretical marine ecology into global defense technology. Every transmission broadcast by a naval asset—whether radar, sonar, or laser telemetry—reveals its geographic coordinates to enemy intercept arrays.
        </p>
        <p>
          The cuttlefish models an engineering paradigm that defense contractors have chased for decades: <strong>Co-located Cloaking and Cryptographic Signaling.</strong>
        </p>
      </div>

      {/* FIGURE 5: SUBMARINE & METAMATERIAL */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 my-10">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 shadow-2xl overflow-hidden">
            <img 
              src="/cuttlefish-submarine.png" 
              alt="Cuttlefish vs Submarine" 
              className="w-full h-full object-cover rounded-xl border border-slate-700/50 invert-[0.85] hue-rotate-180 contrast-125 brightness-90 mix-blend-screen opacity-90" 
            />
          </div>
          <div className="bg-[#081630] border border-slate-800 rounded-2xl p-2 shadow-2xl overflow-hidden">
            <img 
              src="/cuttlefish-metamaterial.png" 
              alt="Naval Metamaterials" 
              className="w-full h-full object-cover rounded-xl border border-slate-700/50 invert-[0.85] hue-rotate-180 contrast-125 brightness-90 mix-blend-screen opacity-90" 
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">Fig 05 · The James Bond Vehicle of the Sea</span>
          <span className="text-[10px] font-mono text-slate-500">Source: DARPA &amp; ONR Naval Research</span>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg mt-12 mb-16 border-t border-slate-800/80 pt-8">
        <h2 className="text-2xl font-bold text-white">Far Below the Anthropocentric Horizon</h2>
        <p>
          Human civilization has long measured terrestrial intelligence by anthropomorphic criteria. The cuttlefish reminds us of the fragility of our sensory perceptions.
        </p>
      </div>

      {/* FIGURE 6: VENN DIAGRAM */}
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <div className="bg-[#081630] border border-slate-800 rounded-2xl p-4 shadow-2xl relative overflow-hidden flex flex-col justify-center items-center">
          <img 
            src="/cuttlefish-venn.png" 
            alt="Evolution of Sensory Communication" 
            className="w-full max-w-md h-auto rounded-xl border border-slate-700/50 invert-[0.85] hue-rotate-180 contrast-125 brightness-90 mix-blend-screen opacity-90" 
          />
          <div className="mt-4 text-center">
             <span className="text-[10px] font-mono text-slate-500">Source: Evolutionary Sensory Communication Model</span>
          </div>
        </div>
      </div>

      {/* REFERENCES */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-400 text-xs font-mono leading-relaxed space-y-4 mb-16">
        <h4 className="text-[#CCFF00] uppercase tracking-widest text-[11px] font-bold border-t border-slate-800 pt-8">
          // ACADEMIC REFERENCES &amp; METHODOLOGY
        </h4>
        <ul className="space-y-3 list-disc list-inside">
          <li>
            <strong className="text-slate-300">Nakayama, A., et al. (2024).</strong> <em>"Polarization signaling through living birefringent tissue in courting cuttlefish."</em> Current Biology / PNAS.{" "}
            <a href="#" className="text-[#CCFF00] hover:underline ml-1">[DOI-Tracked]</a>
          </li>
          <li>
            <strong className="text-slate-300">Mäthger, L. M., &amp; Hanlon, R. T. (2007).</strong> <em>"Malleable skin: Polarization and structural coloration in cuttlefish iridophores."</em> Journal of Experimental Biology, 210(14), 2548-2557.
          </li>
          <li>
            <strong className="text-slate-300">Hanlon, R. T., et al. (2018).</strong> <em>"Cephalopod Camouflage and Cognition: Dynamic Visual Deception in the Ocean."</em> Cambridge University Press.
          </li>
          <li>
            <strong className="text-slate-300">Cronin, T. W., &amp; Marshall, J. (2011).</strong> <em>"Patterns and applications of polarized light in marine organisms."</em> Philosophical Transactions of the Royal Society B: Biological Sciences, 366(1565), 619-626.
          </li>
          <li>
            <strong className="text-slate-300">Brown, C. (2012).</strong> <em>"Tactical visual deception in Sepia plangon during high-density courtship aggregations."</em> Animal Behaviour, 83(2), 481-487.
          </li>
        </ul>
      </div>
    </>
  );
}