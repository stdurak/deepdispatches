import { useState } from 'react';

type ColonyKey = 'jason' | 'snowhill' | 'atka';

interface ColonyTelemetry {
  id: ColonyKey;
  name: string;
  region: string;
  mpaCoverage: number;
  unprotectedExposure: number;
  fishingOverlapNote: string;
  datasetSpan: string;
  statusAlert: string;
}

const COLONY_DATA: Record<ColonyKey, ColonyTelemetry> = {
  jason: {
    id: 'jason',
    name: 'Jason Peninsula',
    region: 'Western Weddell Sea',
    mpaCoverage: 15,
    unprotectedExposure: 85,
    fishingOverlapNote: '>60% of February–March spent directly inside active krill & toothfish fishing grounds',
    datasetSpan: '2023–2024 Satellite Tagging (First-ever juvenile track)',
    statusAlert: 'CRITICAL EXPOSURE · HIGHEST INDUSTRIAL COLLISION'
  },
  snowhill: {
    id: 'snowhill',
    name: 'Snow Hill Island',
    region: 'Northwestern Weddell Sea',
    mpaCoverage: 21,
    unprotectedExposure: 79,
    fishingOverlapNote: 'Direct northward trajectory into commercial krill trawling corridors toward South Georgia',
    datasetSpan: '2023–2024 Satellite Tagging (First-ever juvenile track)',
    statusAlert: 'HIGH EXPOSURE · CORRIDOR INTERSECTION'
  },
  atka: {
    id: 'atka',
    name: 'Atka Bay',
    region: 'Eastern Weddell Sea',
    mpaCoverage: 32,
    unprotectedExposure: 68,
    fishingOverlapNote: '68% of first year spent outside proposed reserve boundaries across >1,500 km loop',
    datasetSpan: '3-Year Historical Telemetry Baseline',
    statusAlert: 'MODERATE EXPOSURE · OFFSHORE DRIFT'
  }
};

export default function PenguinDossier({ article }: { article?: any }) {
  const [selectedColony, setSelectedColony] = useState<ColonyKey>('jason');
  const activeColony = COLONY_DATA[selectedColony];

  return (
    <article className="-mt-16 pb-24 space-y-16 relative z-10">
      {/* FULL-BLEED HERO HEADER WITH VIDEO */}
      <div className="relative w-full min-h-[540px] md:min-h-[620px] flex items-end border-b border-slate-800/80 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/penguins/hero-poster.jpg"
          ref={(el) => {
            if (el) el.muted = true;
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-65 brightness-105 scale-105 pointer-events-none"
        >
          <source src="/penguins/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#051124] via-[#051124]/65 to-[#051124]/25 pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-16 w-full space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#CCFF00]">
            <span>{article?.number || 'DOSSIER #006'}</span>
            <span>·</span>
            <span>POLAR TELEMETRY &amp; MARINE GOVERNANCE</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-xl">
            Tracked Across the Southern Ocean: How Young Emperor Penguins Head Straight Into Industrial Fishing Zones
          </h1>

          <p className="text-lg md:text-xl text-[#CCFF00]/90 font-light italic leading-relaxed">
            Satellite telemetry of 48 juveniles reveals a 1,500-kilometer open-ocean migration highway—and a lethal blindspot in Antarctic marine protection.
          </p>

          <div className="pt-4 border-t border-slate-700/60 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
            <span>Reading Time: {article?.readTime || '9 min read'}</span>
            <span>·</span>
            <span>Status: {article?.status || 'FIELD TELEMETRY REPORT'}</span>
          </div>
        </div>
      </div>

      {/* INTRODUCTION */}
      <div className="max-w-3xl mx-auto px-6 prose prose-invert text-slate-300 font-light leading-relaxed space-y-6 text-base md:text-lg">
        <div className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest">
          // INTRODUCTION · THE MYSTERY OF THE FIRST YEAR AT SEA
        </div>
        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#CCFF00] first-letter:mr-3 first-letter:float-left">
          What happens when a five-month-old emperor penguin leaves the safety of its Antarctic colony for the very first time? Untested and inexperienced, these young birds plunge into the freezing waters of the Southern Ocean, stepping out into one of the planet&apos;s harshest environments without parental guidance.
        </p>
        <p>
          For years, this critical first year at sea remained an ecological black box. Now, a breakthrough study co-led by France&apos;s <strong>CNRS</strong>, the <strong>Centre Scientifique de Monaco</strong>, and the <strong>Woods Hole Oceanographic Institution (WHOI)</strong>—with funding support including WWF-Australia—has illuminated this perilous journey. Between December 2023 and January 2024, researchers fitted satellite tracking tags on 20 young penguins across Snow Hill Island and Jason Peninsula, combining these new datasets with three years of prior tracking from Atka Bay. Monitoring 48 juveniles in total across the Weddell Sea, the team uncovered remarkably predictable migration highways—and a troubling, direct collision with industrial fishing fleets.
        </p>
      </div>

      {/* SECTION 1: A TRIAL BY FIRE */}
      <section className="max-w-3xl mx-auto px-6 space-y-8 border-t border-slate-800/80 pt-12">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-start gap-3">
            <span className="text-[#CCFF00] font-mono text-base mt-1">01.</span>
            <span>A Trial by Fire: Only One-Third of Young Emperor Penguins Survive Their First Year</span>
          </h2>
          <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
            Departing into the open ocean presents juvenile emperor penguins with an unforgiving survival baseline: historically, only about one-third survive their first year to reach adulthood. Without adults to guide them, young birds must independently navigate freezing polar waters, evade predators, and secure prey in an unforgiving environment.
          </p>
          <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
            This stark mortality rate underscores why early-life ocean habitats require strict protection. Because two-thirds of young penguins perish during this initial transition, any additional pressure on their foraging grounds—whether from industrial competition or environmental disruption—can severely undercut the species&apos; ability to replenish its population over time.
          </p>
        </div>

        {/* IMAGE 1: JUVENILE CHICK */}
        <figure className="rounded-2xl overflow-hidden border border-slate-800 bg-[#081630] shadow-2xl">
          <img
            src="/penguins/juvenile-penguin-chick.jpg"
            alt="Five-month-old juvenile emperor penguin chick on Antarctic sea ice"
            className="w-full max-h-[560px] object-cover"
          />
          <figcaption className="p-4 bg-[#051124]/95 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono text-slate-400">
            <span>
              A five-month-old juvenile emperor penguin prior to entering the Southern Ocean—where two-thirds perish during their first year.
            </span>
            <span className="text-[#CCFF00] shrink-0">Photo: WWF-Australia</span>
          </figcaption>
        </figure>
      </section>

      {/* SECTION 2: PREDICTABLE NOMADS */}
      <section className="max-w-3xl mx-auto px-6 space-y-8 border-t border-slate-800/80 pt-12">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-start gap-3">
            <span className="text-[#CCFF00] font-mono text-base mt-1">02.</span>
            <span>Predictable Nomads: Penguins Travel over 1,500 Kilometers along an Identical Migration Highway</span>
          </h2>
          <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
            Despite navigating a vast ocean of changing ice, young emperor penguins do not wander aimlessly. The tracking data revealed that juveniles departing in March adhere to a surprisingly uniform trajectory: they travel north to the highly productive waters of the Polar Front region, shift south, and then move north again while tracking the seasonal expansion and melting of sea ice before returning toward the Antarctic continent.
          </p>
          <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
            Remarkably, this exact migration cycle occurred across all three studied colonies—including the western colonies of Snow Hill Island and Jason Peninsula, which were tracked for the first time—and remained consistent across different years despite journeys exceeding 1,500 kilometers.
          </p>

          <blockquote className="p-6 bg-[#081630] border-l-2 border-[#CCFF00] rounded-r-xl text-slate-200 font-serif italic my-6 space-y-2">
            <p>
              &quot;We were struck by the remarkable consistency of the penguins&apos; movements. Despite travelling more than 1,500 kilometres and spending an entire year at sea, penguins from different colonies and in different years showed very similar movement patterns.&quot;
            </p>
            <footer className="text-xs font-mono not-italic text-[#CCFF00]">
              — Émile Brisson-Curadeau, Post-Doctoral Researcher at CEFE &amp; Lead Author
            </footer>
          </blockquote>

          <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
            This high level of behavioral predictability offers marine scientists a clear framework. Because young penguins rely on the same ocean corridors year after year, conservationists can target specific geographical zones where marine protections will deliver lasting benefits.
          </p>
        </div>

        {/* IMAGE 2: WEDDELL SEA TELEMETRY TRACKS */}
        <figure className="rounded-2xl overflow-hidden border border-slate-800 bg-[#081630] shadow-2xl">
          <img
            src="/penguins/weddell-telemetry-tracks.jpg"
            alt="Satellite telemetry tracks of juvenile emperor penguins across the Weddell Sea"
            className="w-full h-auto object-contain bg-[#051124]"
          />
          <figcaption className="p-4 bg-[#051124]/95 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono text-slate-400">
            <span>
              <strong className="text-[#CCFF00]">// TELEMETRY LOG 01:</strong> Satellite tracks of 48 juveniles departing Snow Hill Island, Jason Peninsula, and Atka Bay across a &gt;1,500 km northward corridor toward South Georgia.
            </span>
            <span className="text-slate-300 shrink-0">Data: CNRS / WHOI</span>
          </figcaption>
        </figure>
      </section>

      {/* INTERACTIVE SCROLLYTELLING MODULE: COLONY TELEMETRY & MPA BLINDSPOT */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 my-8">
        <div className="bg-[#081630]/95 border border-slate-800 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-[10px] font-mono text-[#CCFF00] tracking-widest uppercase block mb-1">
                // INTERACTIVE TELEMETRY MODULE · COLONY EXPOSURE MATRIX
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Juvenile Time Inside Proposed Marine Protected Areas (MPAs)
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2 bg-[#051124] p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
              {(['jason', 'snowhill', 'atka'] as ColonyKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedColony(key)}
                  className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                    selectedColony === key
                      ? 'bg-[#CCFF00] text-black font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {COLONY_DATA[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* TELEMETRY DISPLAY */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[#051124] border border-slate-800/90 rounded-2xl p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-slate-400 block">{activeColony.region}</span>
                  <h4 className="text-2xl font-extrabold text-white">{activeColony.name} Colony</h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/40 text-red-400 text-[10px] font-mono font-bold">
                  {activeColony.statusAlert}
                </span>
              </div>

              {/* PROGRESS BAR VISUALIZATION */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#CCFF00]">Inside Proposed MPA: {activeColony.mpaCoverage}%</span>
                  <span className="text-amber-400">Unprotected Open Ocean: {activeColony.unprotectedExposure}%</span>
                </div>
                <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-800 flex">
                  <div
                    className="h-full bg-[#CCFF00] transition-all duration-500"
                    style={{ width: `${activeColony.mpaCoverage}%` }}
                  />
                  <div
                    className="h-full bg-amber-500/40 transition-all duration-500"
                    style={{ width: `${activeColony.unprotectedExposure}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-[#081630] border-l-2 border-amber-400 rounded-r-xl text-xs font-mono text-slate-200 space-y-1">
                <span className="text-amber-400 font-bold block">// FISHERY INTERSECTION TELEMETRY:</span>
                <p className="leading-relaxed">{activeColony.fishingOverlapNote}</p>
              </div>
            </div>

            <div className="bg-[#051124] border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between space-y-4 font-mono">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Total Cohort Tracked</span>
                <span className="text-3xl font-extrabold text-white">48 Juveniles</span>
                <span className="text-xs text-slate-400 block mt-1">Across 3 Weddell Sea Colonies</span>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <span className="text-[10px] text-slate-500 uppercase block">Dataset Provenance</span>
                <span className="text-xs text-[#CCFF00] block mt-1">{activeColony.datasetSpan}</span>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <span className="text-[10px] text-slate-500 uppercase block">Migration Scale</span>
                <span className="text-sm text-white font-bold block mt-1">&gt;1,500 km / Year</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DIRECT COLLISION */}
      <section className="max-w-3xl mx-auto px-6 space-y-8 border-t border-slate-800/80 pt-12">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-start gap-3">
            <span className="text-[#CCFF00] font-mono text-base mt-1">03.</span>
            <span>Direct Collision: Young Penguins Spend Up to 60% of Their Time in Industrial Fishing Zones</span>
          </h2>
          <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
            As juvenile penguins from Snow Hill Island and Jason Peninsula travel north toward the Antarctic Peninsula and South Georgia, their migration highways cross directly through active industrial fishing grounds.
          </p>
          <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
            While commercial fleets in these waters primarily target Antarctic krill—the penguin&apos;s primary food source—vessels also engage in trawling for mackerel icefish and longlining for Patagonian toothfish. The satellite data revealed that young penguins from the Jason Peninsula spent <strong>more than 60% of their time</strong> in recently fished zones during the crucial months of February and March.
          </p>
          <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
            This spatial overlap exposes vulnerable young hunters to severe compounding threats. Beyond facing direct competition for food at a time when they are struggling to survive, foraging in active fishing grounds elevates the risk of accidental bycatch in commercial gear.
          </p>
        </div>

        {/* IMAGE 3: KRILL FISHING VESSEL */}
        <figure className="rounded-2xl overflow-hidden border border-slate-800 bg-[#081630] shadow-2xl">
          <img
            src="/penguins/krill-fishing-vessel.jpg"
            alt="Industrial fishing trawler operating in Antarctic waters"
            className="w-full max-h-[520px] object-cover"
          />
          <figcaption className="p-4 bg-[#051124]/95 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono text-slate-400">
            <span>
              Industrial fishing vessel operating in Southern Ocean waters—foraging grounds where Jason Peninsula juveniles spend over 60% of their time in February and March.
            </span>
            <span className="text-[#CCFF00] shrink-0">Photo: WWF-Australia</span>
          </figcaption>
        </figure>
      </section>

      {/* SECTION 4: THE PROTECTION BLINDSPOT */}
      <section className="max-w-3xl mx-auto px-6 space-y-8 border-t border-slate-800/80 pt-12">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-start gap-3">
            <span className="text-[#CCFF00] font-mono text-base mt-1">04.</span>
            <span>The Protection Blindspot: Current Marine Reserves Protect Adults, But Leave Youth Unprotected</span>
          </h2>
          <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
            The study highlights a major flaw in current conservation planning: existing boundaries leave young penguins exposed. Traditional Marine Protected Areas (MPAs) in Antarctica are centered around terrestrial breeding colonies and adjacent coastal waters. While this design protects adult penguins during the breeding season, it leaves wide-ranging juveniles largely unprotected during their nomadic first year.
          </p>
          <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
            The tracking data showed that juvenile penguins from Atka Bay spent <strong>32%</strong> of their year within proposed MPAs, while those from Snow Hill Island spent <strong>21%</strong>, and juveniles from the Jason Peninsula spent a mere <strong>15%</strong>.
          </p>

          <blockquote className="p-6 bg-[#081630] border-l-2 border-[#CCFF00] rounded-r-xl text-slate-200 font-serif italic my-6 space-y-2">
            <p>
              &quot;Most marine protected areas in Antarctica are planned with penguin colonies in mind. They protect the areas around the colonies, which is critical for adult penguins, but they fail to cover the sea areas where juveniles spend their vulnerable early years. Our research shows these areas are predictable and used year after year, so their protection will remain relevant in the future.&quot;
            </p>
            <footer className="text-xs font-mono not-italic text-[#CCFF00]">
              — Daniel Zitterbart, Associate Scientist at WHOI &amp; Co-Lead Author
            </footer>
          </blockquote>

          <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
            Updating marine reserve proposals to include these offshore migration corridors is both feasible and urgent. Because juvenile migration routes remain consistent over time, expanding MPA boundaries to cover these high-use ocean corridors provides full lifecycle protection.
          </p>
        </div>

        {/* IMAGE 4: MPA & FISHING OVERLAP MAP */}
        <figure className="rounded-2xl overflow-hidden border border-slate-800 bg-[#081630] shadow-2xl">
          <img
            src="/penguins/mpa-fishing-overlap-map.jpg"
            alt="Map showing juvenile emperor penguin foraging ranges, fishing effort, and proposed MPA boundaries"
            className="w-full h-auto object-contain bg-[#051124]"
          />
          <figcaption className="p-4 bg-[#051124]/95 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono text-slate-400">
            <span>
              <strong className="text-[#CCFF00]">// SPATIAL OVERLAP 02:</strong> Juvenile foraging ranges (SH: green, JP: orange, AB: purple) vs. industrial fishing activity (black dots) and proposed CCAMLR MPA boundaries (black outlines).
            </span>
            <span className="text-slate-300 shrink-0">Data: Brisson-Curadeau et al.</span>
          </figcaption>
        </figure>
      </section>

      {/* SECTION 5: POLITICAL GRIDLOCK */}
      <section className="max-w-3xl mx-auto px-6 space-y-6 border-t border-slate-800/80 pt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-start gap-3">
          <span className="text-[#CCFF00] font-mono text-base mt-1">05.</span>
          <span>A Decade of Political Gridlock Amid Growing Endangered Status</span>
        </h2>
        <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
          These scientific insights come at a critical juncture for Antarctic conservation. The IUCN recently listed the emperor penguin as endangered, driven by projections that global populations could halve by the 2080s as climate change erodes essential sea ice habitats.
        </p>
        <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
          Despite this escalating threat, international governance remains paralyzed. A proposal to establish a <strong>2.2 million square kilometer MPA</strong> in the Weddell Sea—a habitat supporting roughly one-third of the world&apos;s emperor penguins—has languished for more than a decade due to a lack of consensus among member nations of the Commission for the Conservation of Antarctic Marine Living Resources (CCAMLR).
        </p>

        <blockquote className="p-6 bg-[#081630] border-l-2 border-[#CCFF00] rounded-r-xl text-slate-200 font-serif italic my-6 space-y-2">
          <p>
            &quot;It&apos;s time for CCAMLR to protect critical habitat in the Weddell Sea, which supports around one-third of the world&apos;s emperor penguins. Emperor penguins are already navigating one of the most challenging environments on Earth. We should be doing everything we can to ensure the places they depend on are protected as their Antarctic home changes around them.&quot;
          </p>
          <footer className="text-xs font-mono not-italic text-[#CCFF00]">
            — Emily Grilly, Oceans Conservation Manager at WWF-Australia
          </footer>
        </blockquote>

        <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
          Securing these vital ocean spaces is essential not just for a single species, but for the entire Southern Ocean ecosystem.
        </p>

        <blockquote className="p-6 bg-[#081630] border-l-2 border-[#CCFF00] rounded-r-xl text-slate-200 font-serif italic my-6 space-y-2">
          <p>
            &quot;The emperor penguin&apos;s foraging grounds are also vital for krill, fish, seals, whales and other seabirds. Protecting the habitat of this ecologically important species means protecting the entire food web and the unique biodiversity of the Southern Ocean, which ultimately sustains us too.&quot;
          </p>
          <footer className="text-xs font-mono not-italic text-[#CCFF00]">
            — Céline Le Bohec, Researcher at CEFE, CNRS &amp; Centre Scientifique de Monaco
          </footer>
        </blockquote>
      </section>

      {/* CONCLUSION */}
      <section className="max-w-3xl mx-auto px-6 space-y-6 border-t border-slate-800/80 pt-12">
        <div className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest">
          // CONCLUSION · GUARDING THE FUTURE OF THE SOUTHERN OCEAN
        </div>
        <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg">
          Safeguarding emperor penguins requires looking far beyond the coastal ice shelves where they hatch. Ensuring the survival of this iconic species depends on protecting the open-ocean corridors young birds navigate during their fragile first year, alongside implementing sustainable management of commercial fishing timing and intensity in key foraging areas.
        </p>
        <p className="text-slate-200 font-normal leading-relaxed text-base md:text-lg">
          As climate change alters Antarctic ice and industrial fishing continues in vital foraging grounds, will international governing bodies achieve the political consensus needed to protect these oceanic highways before key populations reach a point of no return?
        </p>

        {/* REFERENCES */}
        <div className="border-t border-slate-800 pt-10 mt-12 space-y-4 text-xs font-mono text-slate-400">
          <h4 className="text-[#CCFF00] uppercase tracking-widest text-[11px] font-bold">
            // RESEARCH SOURCES &amp; TELEMETRY PARTNERS
          </h4>
          <ul className="space-y-3 list-disc list-inside leading-relaxed text-slate-400">
            <li>
              <strong className="text-slate-300">Woods Hole Oceanographic Institution (WHOI), CNRS &amp; Centre Scientifique de Monaco.</strong> <em>Joint Polar Telemetry &amp; Juvenile Emperor Penguin Tracking Program (Weddell Sea Dataset, 2023–2024).</em>
            </li>
            <li>
              <strong className="text-slate-300">Brisson-Curadeau, É., Zitterbart, D., Le Bohec, C., et al.</strong> <em>Satellite telemetry of juvenile emperor penguins across Snow Hill Island, Jason Peninsula, and Atka Bay.</em>
            </li>
            <li>
              <strong className="text-slate-300">Commission for the Conservation of Antarctic Marine Living Resources (CCAMLR).</strong> <em>Weddell Sea Marine Protected Area (WSMPA) Spatial Planning &amp; Krill Fishery Management Data.</em>
            </li>
            <li>
              <strong className="text-slate-300">IUCN Red List of Threatened Species &amp; WWF-Australia.</strong> <em>Aptenodytes forsteri (Emperor Penguin) Population Trajectory &amp; Southern Ocean Habitat Conservation.</em>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}