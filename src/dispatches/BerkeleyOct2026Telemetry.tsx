import { useState, useMemo, useEffect } from 'react';
import {
  Thermometer,
  Waves,
  TrendingUp,
  Globe,
  Info,
  ExternalLink,
  SlidersHorizontal,
  Play,
  Pause,
  RotateCw,
  Compass,
} from 'lucide-react';

// ============================================================================
// DEEP DISPATCHES // BERKELEY EARTH OCTOBER 2026 INTERACTIVE TELEMETRY
// Self-contained interactive data visualizations & climate brief
// ============================================================================

const DOMAIN_METRICS = [
  {
    id: 'global',
    label: 'Global Combined',
    anomalyC: 1.80,
    uncertaintyC: 0.12,
    anomalyF: 3.25,
    rankNote: '#1 Warmest single month out of 2,122 months since 1850 (+0.12°C vs Oct 2023)',
    accent: '#CCFF00',
    summary:
      'Surpassed every prior month in the 176-year Berkeley Earth record, setting a new anomaly high across both October and all calendar months.',
  },
  {
    id: 'ocean',
    label: 'Global Ocean (ERA5/HadSST4)',
    anomalyC: 1.34,
    uncertaintyC: 0.10,
    anomalyF: 2.42,
    rankNote: '#1 Warmest October ocean surface (+0.14°C margin vs Oct 2023) · #3 ocean month overall',
    accent: '#38BDF8',
    summary:
      'Marine heat was the decisive engine pushing the planetary total into uncharted territory, with bias-corrected ERA5 extending HadSST4 lag.',
  },
  {
    id: 'land',
    label: 'Global Land',
    anomalyC: 2.35,
    uncertaintyC: 0.14,
    anomalyF: 4.24,
    rankNote: '#3 Warmest October on land (behind Oct 2023 & Oct 2024), tracking near long-term trend',
    accent: '#FB923C',
    summary:
      'Exceptionally high terrestrial warmth remained closer to its expected secular trend than the ocean anomaly surge.',
  },
];

const REGIONAL_RECORDS = [
  {
    id: 'kuwait',
    region: 'Kuwait (Persian Gulf)',
    lon: 47.75,
    lat: 29.38,
    marginC: 1.14,
    unitLabel: '+1.14°C vs prior Oct record',
    context: 'One of four Gulf states posting extreme October record margins alongside UAE, Bahrain, and Qatar.',
    color: '#FF4D6D',
  },
  {
    id: 'vietnam',
    region: 'Vietnam (Northern Heatwave)',
    lon: 105.85,
    lat: 21.03,
    marginC: 0.94,
    unitLabel: '+0.94°C (±0.17°C unc.)',
    context: 'First widespread October heatwave in northern Vietnam since 1991 (38.3°C at Yen Chau), amid wider SE Asian heat records.',
    color: '#CCFF00',
  },
  {
    id: 'france',
    region: 'France (12-Mo Moving Avg)',
    lon: 2.35,
    lat: 46.60,
    marginC: 0.81,
    unitLabel: '+0.81°C record margin',
    context: 'Nov 2025–Oct 2026 12-month moving average shattered a national record series stretching back to 1751.',
    color: '#38BDF8',
  },
  {
    id: 'uae',
    region: 'United Arab Emirates',
    lon: 54.37,
    lat: 24.45,
    marginC: 0.72,
    unitLabel: '+0.72°C vs prior Oct record',
    context: 'Part of a broad Persian Gulf thermal surge during October 2026.',
    color: '#FBBF24',
  },
  {
    id: 'bahrain',
    region: 'Bahrain',
    lon: 50.56,
    lat: 26.22,
    marginC: 0.66,
    unitLabel: '+0.66°C vs prior Oct record',
    context: 'Highlighted among regional national October mean temperature records across 45 countries.',
    color: '#A78BFA',
  },
];

const RANKING_PROBABILITIES = [
  { label: '1st (Warmest Year on Record)', prob: 97, display: '~97%', color: '#CCFF00' },
  { label: '2nd Warmest Year', prob: 3, display: '~3%', color: '#38BDF8' },
  { label: '3rd Warmest or Lower', prob: 1, display: '<1%', color: '#94A3B8' },
];

// Illustrative monthly trajectory showing Oct 2026 spike + lagged 2027 Super El Nino response
const TRAJECTORY_SERIES = [
  { m: 'Jan 26', globalAnom: 1.48, nino34: 0.3, lagPulse: 0.2 },
  { m: 'Feb 26', globalAnom: 1.51, nino34: 0.6, lagPulse: 0.3 },
  { m: 'Mar 26', globalAnom: 1.49, nino34: 1.0, lagPulse: 0.4 },
  { m: 'Apr 26', globalAnom: 1.52, nino34: 1.4, lagPulse: 0.6 },
  { m: 'May 26', globalAnom: 1.54, nino34: 1.8, lagPulse: 0.8 },
  { m: 'Jun 26', globalAnom: 1.56, nino34: 2.2, lagPulse: 1.0 },
  { m: 'Jul 26', globalAnom: 1.58, nino34: 2.6, lagPulse: 1.2 },
  { m: 'Aug 26', globalAnom: 1.57, nino34: 2.9, lagPulse: 1.4 },
  { m: 'Sep 26', globalAnom: 1.62, nino34: 3.1, lagPulse: 1.6 },
  { m: 'Oct 26*', globalAnom: 1.80, nino34: 3.21, lagPulse: 1.9 },
  { m: 'Dec 26 (Proj)', globalAnom: 1.72, nino34: 3.95, lagPulse: 2.3 },
  { m: 'Q1–Q2 27 (Lag)', globalAnom: 1.86, nino34: 2.4, lagPulse: 3.1 },
];

// Simplified world continent/island polygons [lon, lat] for hero map backdrop
const HERO_WORLD_CONTINENTS = [
  {
    id: 'north-america',
    coords: [
      [-168, 66],
      [-140, 70],
      [-95, 72],
      [-60, 62],
      [-55, 47],
      [-76, 35],
      [-82, 25],
      [-97, 26],
      [-105, 19],
      [-84, 10],
      [-78, 8],
      [-92, 15],
      [-110, 24],
      [-124, 48],
      [-165, 55],
    ],
  },
  {
    id: 'south-america',
    coords: [
      [-80, 10],
      [-50, 2],
      [-35, -6],
      [-38, -14],
      [-48, -28],
      [-58, -38],
      [-68, -55],
      [-75, -52],
      [-72, -32],
      [-77, -12],
      [-81, -4],
    ],
  },
  {
    id: 'greenland',
    coords: [
      [-54, 60],
      [-20, 72],
      [-25, 82],
      [-55, 82],
      [-70, 76],
    ],
  },
  {
    id: 'europe',
    coords: [
      [-10, 36],
      [-9, 43],
      [2, 49],
      [6, 54],
      [12, 58],
      [28, 60],
      [30, 70],
      [58, 69],
      [60, 52],
      [40, 44],
      [28, 41],
      [23, 37],
      [14, 38],
      [3, 42],
    ],
  },
  {
    id: 'africa',
    coords: [
      [-17, 15],
      [-13, 28],
      [10, 37],
      [32, 31],
      [43, 12],
      [51, 11],
      [40, -10],
      [35, -24],
      [18, -34],
      [12, -18],
      [9, 4],
      [-8, 5],
    ],
  },
  {
    id: 'asia',
    coords: [
      [60, 52],
      [60, 69],
      [105, 76],
      [170, 66],
      [162, 54],
      [142, 46],
      [131, 42],
      [121, 31],
      [108, 16],
      [103, 2],
      [98, 16],
      [88, 22],
      [72, 20],
      [62, 25],
      [50, 29],
      [35, 30],
      [36, 37],
      [40, 44],
    ],
  },
  {
    id: 'australia',
    coords: [
      [114, -22],
      [130, -12],
      [142, -11],
      [153, -28],
      [148, -38],
      [135, -35],
      [115, -34],
    ],
  },
];

function projectWorldPoint(lon: number, lat: number, width = 1200, height = 320) {
  const x = ((lon + 180) / 360) * width;
  const clampedLat = Math.max(-68, Math.min(82, lat));
  const y = ((82 - clampedLat) / 150) * height;
  return { x, y };
}

function buildWorldPath(coords: number[][], width = 1200, height = 320) {
  return coords
    .map((coord: number[], idx: number) => {
      const lon = coord[0];
      const lat = coord[1];
      const { x, y } = projectWorldPoint(lon, lat, width, height);
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

// Rotated world projection for the Regional Record Margins globe/map view
function wrapLon180(lon: number) {
  let d = ((lon + 180) % 360 + 360) % 360 - 180;
  return d;
}

function projectRotatedWorldPoint(lon: number, lat: number, centerLon = 35, centerLat = 26, width = 720, height = 360) {
  const rad = Math.PI / 180;
  const latRad = lat * rad;
  const centerLatRad = centerLat * rad;
  const dLonRad = wrapLon180(lon - centerLon) * rad;

  // Orthographic / azimuthal-style projection with visible hemisphere check
  const cosC =
    Math.sin(centerLatRad) * Math.sin(latRad) +
    Math.cos(centerLatRad) * Math.cos(latRad) * Math.cos(dLonRad);

  const visible = cosC >= -0.05;
  const x = width * 0.5 + Math.cos(latRad) * Math.sin(dLonRad) * (width * 0.44);
  const y =
    height * 0.5 -
    (Math.cos(centerLatRad) * Math.sin(latRad) -
      Math.sin(centerLatRad) * Math.cos(latRad) * Math.cos(dLonRad)) *
      (height * 0.44);

  return { x, y, visible };
}

function buildRotatedWorldPath(coords: number[][], centerLon: number, centerLat: number, width = 720, height = 360) {
  const segments = [];
  let current = [];

  for (const [lon, lat] of coords) {
    const pt = projectRotatedWorldPoint(lon, lat, centerLon, centerLat, width, height);
    if (pt.visible) {
      current.push(`${current.length === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`);
    } else if (current.length > 0) {
      segments.push(current.join(' '));
      current = [];
    }
  }

  if (current.length > 0) {
    segments.push(current.join(' '));
  }

  return segments.join(' ');
}

const SOURCE_URL =
  'https://berkeleyearth.org/october-2026-temperature-update/?mc_cid=0fccf56f33&mc_eid=25b331b663';

export default function BerkeleyOct2026Telemetry() {
  const [selectedDomain, setSelectedDomain] = useState('global');
  const [ninoPeakTarget, setNinoPeakTarget] = useState(3.95);
  const [atmosphericLagMonths, setAtmosphericLagMonths] = useState(4);
  const [activeTakeaway, setActiveTakeaway] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(true);
  const [heroPhase, setHeroPhase] = useState(0);

  // State for rotatable world map in Regional Record Margins
  const [selectedRegionId, setSelectedRegionId] = useState(REGIONAL_RECORDS[0].id);
  const [globeCenterLon, setGlobeCenterLon] = useState(36);
  const [globeCenterLat, setGlobeCenterLat] = useState(28);
  const [autoSpinGlobe, setAutoSpinGlobe] = useState(false);

  useEffect(() => {
    if (!autoSpinGlobe) return;
    let rafId = 0;
    let lastTime = performance.now();

    const spin = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      setGlobeCenterLon((prev) => wrapLon180(prev + dt * 16));
      rafId = requestAnimationFrame(spin);
    };

    rafId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(rafId);
  }, [autoSpinGlobe]);

  // Hero animation phase loop
  useEffect(() => {
    if (!heroPlaying) return;
    let rafId = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      setHeroPhase((prev) => (prev + dt * 0.4) % 1);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [heroPlaying]);

  const handleSelectRegion = (rec: typeof REGIONAL_RECORDS[0]) => {
    setSelectedRegionId(rec.id);
    setAutoSpinGlobe(false);
    setGlobeCenterLon(rec.lon);
    setGlobeCenterLat(Math.max(-35, Math.min(55, rec.lat)));
  };

  const activeRegion = useMemo(
    () => REGIONAL_RECORDS.find((r) => r.id === selectedRegionId) || REGIONAL_RECORDS[0],
    [selectedRegionId]
  );

  const activeMetric = useMemo(
    () => DOMAIN_METRICS.find((m) => m.id === selectedDomain) || DOMAIN_METRICS[0],
    [selectedDomain]
  );

  // Compute an interactive 2027 lagged warmth estimate based on user's Super El Nino peak & lag sliders
  const projected2027Warmth = useMemo(() => {
    const base2026Ytd = 1.546;
    const elNinoBoost = Math.max(0, (ninoPeakTarget - 2.0) * 0.14);
    const lagAmplification = 0.04 + (atmosphericLagMonths - 2) * 0.025;
    const est = base2026Ytd + elNinoBoost + lagAmplification;
    return Number(est.toFixed(2));
  }, [ninoPeakTarget, atmosphericLagMonths]);

  // SVG chart dimensions & coordinate helpers
  const chartW = 760;
  const chartH = 260;
  const padL = 44;
  const padR = 24;
  const padT = 24;
  const padB = 34;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const adjustedSeries = useMemo(() => {
    const scaleRatio = ninoPeakTarget / 3.95;
    return TRAJECTORY_SERIES.map((pt, idx: number) => {
      const scaledNino =
        idx === 10
          ? Number(ninoPeakTarget.toFixed(2))
          : Number((pt.nino34 * scaleRatio).toFixed(2));
      const laggedWarmth =
        idx >= 9
          ? Number(
              (
                pt.globalAnom +
                (scaleRatio - 1) * 0.16 +
                (atmosphericLagMonths - 4) * 0.03 * ((idx - 8) / 3)
              ).toFixed(2)
            )
          : pt.globalAnom;
      return {
        ...pt,
        scaledNino,
        laggedWarmth,
      };
    });
  }, [ninoPeakTarget, atmosphericLagMonths]);

  const toX = (idx: number) =>
    padL + (idx / Math.max(1, adjustedSeries.length - 1)) * plotW;
  const toYTemp = (val: number) => {
    const minV = 1.2;
    const maxV = 2.1;
    const clamped = Math.max(minV, Math.min(maxV, val));
    return padT + plotH - ((clamped - minV) / (maxV - minV)) * plotH;
  };
  const toYNino = (val: number) => {
    const minV = 0;
    const maxV = 4.4;
    const clamped = Math.max(minV, Math.min(maxV, val));
    return padT + plotH - ((clamped - minV) / (maxV - minV)) * plotH;
  };

  const globalLinePath = useMemo(() => {
    return adjustedSeries
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toYTemp(d.laggedWarmth).toFixed(1)}`)
      .join(' ');
  }, [adjustedSeries]);

  const ninoLinePath = useMemo(() => {
    return adjustedSeries
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toYNino(d.scaledNino).toFixed(1)}`)
      .join(' ');
  }, [adjustedSeries]);

  const takeaways = [
    {
      num: '01',
      title: 'Warmest Single Month Since 1850',
      stat: '+1.80 ± 0.12°C',
      body: 'Surpassed every prior month across 2,122 recorded months (+3.25 ± 0.22°F vs 1850–1900; ~0.12°C above the Oct 2023 record).',
    },
    {
      num: '02',
      title: 'Oceans Unlocked the Record',
      stat: '+1.34 ± 0.10°C Ocean',
      body: 'Global ocean anomalies set an all-time October record by +0.14°C while land (+2.35°C) ranked 3rd for October and tracked closer to trend.',
    },
    {
      num: '03',
      title: 'Super El Niño & Delayed Lag',
      stat: '~4.0°C Peak Plume',
      body: 'October Niño 3.4 hit 3.21°C (mid-Oct daily ~3.5°C) with >83% chance of strong-to-very-strong El Niño into early 2027; global peak warmth lags by months.',
    },
    {
      num: '04',
      title: 'Extreme Regional Margins',
      stat: '45 Countries · 14.4% Earth',
      body: '14.4% of Earth saw its warmest October; 45 countries set October records, including Vietnam (+0.94°C), Kuwait (+1.14°C), and France (+0.81°C 12-mo).',
    },
    {
      num: '05',
      title: '2026 ~97% Likely #1 — 2027 Looms',
      stat: '1.546°C Jan–Oct Mean',
      body: 'Projected 2026 annual range is 1.55–1.64°C (>99% above 1.5°C). Historical Super El Niños (1997/98, 2015/16) warn that 2027 could be even warmer.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#051124] text-slate-100 font-sans selection:bg-[#CCFF00] selection:text-[#051124]">
      {/* Top Telemetry Bar */}
      <header className="sticky top-0 z-30 bg-[#051124]/90 backdrop-blur-md border-b border-slate-800/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-widest text-white">
                  DEEP DISPATCHES
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/35">
                  CLIMATE TELEMETRY · OCT 2026
                </span>
              </div>
              <p className="font-mono text-[11px] text-slate-400 hidden sm:block">
                BERKELEY EARTH MONTHLY ANALYSIS &amp; SUPER EL NIÑO LAG MODEL
              </p>
            </div>
          </div>

          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-2 rounded-xl bg-[#081630] hover:bg-slate-800 text-[#CCFF00] border border-slate-700/80 transition-colors"
          >
            <span>Berkeley Earth Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        {/* Hero Video-Style Animated Telemetry Banner */}
        <section className="relative overflow-hidden bg-[#081630] border border-slate-800/90 rounded-2xl shadow-2xl">
          <div className="relative h-[310px] sm:h-[390px] w-full">
            <svg
              viewBox="0 0 1200 320"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full block"
              aria-label="Animated thermal anomaly and Super El Nino hero visualization with world map backdrop"
            >
              <defs>
                <linearGradient id="heroOceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#040d1c" />
                  <stop offset="52%" stopColor="#0b2347" />
                  <stop offset="100%" stopColor="#26142e" />
                </linearGradient>
                <radialGradient id="heroWarmCore" cx="24%" cy="56%" r="48%">
                  <stop offset="0%" stopColor="#FF4D6D" stopOpacity="0.45" />
                  <stop offset="48%" stopColor="#CCFF00" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#051124" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="oceanHeatDriverGlow" cx="56%" cy="58%" r="46%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.28" />
                  <stop offset="55%" stopColor="#0284C7" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#051124" stopOpacity="0" />
                </radialGradient>
                <filter id="heroPulseGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <pattern id="heroTelemetryGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path
                    d="M 48 0 L 0 0 0 48"
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.08)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>

              <rect width="1200" height="320" fill="url(#heroOceanGrad)" />
              <rect width="1200" height="320" fill="url(#heroTelemetryGrid)" />

              {/* Prominent World Map Backdrop (Equirectangular Lon/Lat Projection) */}
              <g pointerEvents="none">
                {[-30, 0, 30, 60].map((lat) => {
                  const y = projectWorldPoint(0, lat).y;
                  return (
                    <line
                      key={`lat-${lat}`}
                      x1={0}
                      y1={y}
                      x2={1200}
                      y2={y}
                      stroke={lat === 0 ? 'rgba(204, 255, 0, 0.28)' : 'rgba(148, 163, 184, 0.14)'}
                      strokeDasharray={lat === 0 ? '7 4' : '2 4'}
                      strokeWidth={lat === 0 ? '1.1' : '0.9'}
                    />
                  );
                })}
                {[-120, -60, 0, 60, 120].map((lon) => {
                  const x = projectWorldPoint(lon, 0).x;
                  return (
                    <line
                      key={`lon-${lon}`}
                      x1={x}
                      y1={0}
                      x2={x}
                      y2={320}
                      stroke="rgba(148, 163, 184, 0.13)"
                      strokeDasharray="2 4"
                      strokeWidth="0.9"
                    />
                  );
                })}

                {HERO_WORLD_CONTINENTS.map((land) => (
                  <path
                    key={land.id}
                    d={`${buildWorldPath(land.coords)} Z`}
                    fill="#122c52"
                    fillOpacity="0.92"
                    stroke="#7DD3FC"
                    strokeOpacity="0.58"
                    strokeWidth="1.35"
                  />
                ))}

                {/* Nino 3.4 Pacific Focus Zone on World Map */}
                {(() => {
                  const ninoPos = projectWorldPoint(-145, 0);
                  const oceanCorePos = projectWorldPoint(-25, -18);
                  return (
                    <g>
                      <ellipse
                        cx={oceanCorePos.x}
                        cy={oceanCorePos.y}
                        rx="190"
                        ry="52"
                        fill="#38BDF8"
                        fillOpacity="0.14"
                        stroke="#38BDF8"
                        strokeOpacity="0.55"
                        strokeWidth="1.2"
                        strokeDasharray="5 4"
                      />
                      <text
                        x={oceanCorePos.x}
                        y={oceanCorePos.y + 66}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="700"
                        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                        fill="#7DD3FC"
                      >
                        OCEAN HEAT DRIVER (+1.34°C OCT RECORD · +0.14°C MARGIN)
                      </text>
                      <circle
                        cx={ninoPos.x}
                        cy={ninoPos.y}
                        r="30"
                        fill="#FF4D6D"
                        fillOpacity="0.24"
                        stroke="#FF4D6D"
                        strokeOpacity="0.8"
                        strokeWidth="1.4"
                        strokeDasharray="3 3"
                      />
                      <text
                        x={ninoPos.x}
                        y={ninoPos.y - 36}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="700"
                        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                        fill="#FF4D6D"
                      >
                        NIÑO 3.4 SURGE (+3.21°C)
                      </text>
                    </g>
                  );
                })()}
              </g>

              <rect width="1200" height="320" fill="url(#oceanHeatDriverGlow)" />
              <rect width="1200" height="320" fill="url(#heroWarmCore)" />

              {/* Animated Thermal Wave Ripples emanating from Equatorial Pacific */}
              {[0, 1, 2, 3].map((ring) => {
                const progress = (heroPhase + ring * 0.25) % 1;
                const origin = projectWorldPoint(-145, 0);
                const rx = 35 + progress * 520;
                const ry = 20 + progress * 135;
                const opacity = Math.max(0, (1 - progress) * 0.52);
                return (
                  <ellipse
                    key={ring}
                    cx={origin.x}
                    cy={origin.y}
                    rx={rx}
                    ry={ry}
                    fill="none"
                    stroke={ring % 2 === 0 ? '#CCFF00' : '#FF4D6D'}
                    strokeWidth="1.7"
                    strokeOpacity={opacity}
                  />
                );
              })}

              {/* Continuous Flowing Thermal Streamlines */}
              <g filter="url(#heroPulseGlow)">
                {[0, 1, 2, 3, 4].map((lane) => {
                  const yBase = 62 + lane * 46;
                  const waveShift = heroPhase * Math.PI * 2;
                  const d = Array.from({ length: 25 }, (_, i) => {
                    const x = (i / 24) * 1200;
                    const env = Math.sin((i / 24) * Math.PI);
                    const y =
                      yBase +
                      Math.sin(i * 0.55 + waveShift + lane * 0.7) * (10 + env * 15) +
                      Math.cos(i * 0.25 - waveShift) * 4.5;
                    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                  }).join(' ');

                  const strokeColor =
                    lane === 1 ? '#CCFF00' : lane === 2 ? '#FF4D6D' : '#38BDF8';

                  return (
                    <path
                      key={lane}
                      d={d}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={lane === 1 || lane === 2 ? '2.4' : '1.4'}
                      strokeOpacity={lane === 1 || lane === 2 ? '0.82' : '0.42'}
                    />
                  );
                })}
              </g>

              {/* Moving Telemetry Pulse Marker along Oct 2026 -> 2027 Surge */}
              {(() => {
                const startPt = projectWorldPoint(-145, 0);
                const oceanRelayPt = projectWorldPoint(-30, -14);
                const endPt = projectWorldPoint(95, 22);
                const pulseX = startPt.x + heroPhase * (endPt.x - startPt.x);
                const pulseY =
                  startPt.y +
                  heroPhase * (endPt.y - startPt.y) -
                  Math.sin(heroPhase * Math.PI) * 46;
                return (
                  <g filter="url(#heroPulseGlow)">
                    <path
                      d={`M ${startPt.x.toFixed(1)} ${startPt.y.toFixed(1)} Q ${oceanRelayPt.x.toFixed(1)} ${(oceanRelayPt.y + 24).toFixed(1)} ${endPt.x.toFixed(1)} ${endPt.y.toFixed(1)}`}
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="1.8"
                      strokeDasharray="6 5"
                      strokeOpacity="0.65"
                    />
                    <circle
                      cx={oceanRelayPt.x}
                      cy={oceanRelayPt.y}
                      r={10 + Math.sin(heroPhase * Math.PI * 2) * 3}
                      fill="#38BDF8"
                      fillOpacity="0.24"
                      stroke="#38BDF8"
                      strokeWidth="1.4"
                    />
                    <circle
                      cx={pulseX}
                      cy={pulseY}
                      r="18"
                      fill="#CCFF00"
                      fillOpacity="0.24"
                    />
                    <circle
                      cx={pulseX}
                      cy={pulseY}
                      r="6"
                      fill="#CCFF00"
                    />
                  </g>
                );
              })()}
            </svg>

            {/* Dark Readability Gradient Overlay + Hero Content */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#051124]/92 via-[#051124]/62 to-[#051124]/20 flex flex-col justify-between p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 font-mono text-[11px] px-3 py-1 rounded-full bg-[#051124]/85 border border-slate-700/80 text-[#CCFF00]">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
                  <span>LIVE TELEMETRY REEL · EQUATORIAL PACIFIC -&gt; 2027</span>
                </div>

                <button
                  type="button"
                  onClick={() => setHeroPlaying((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-xl bg-[#051124]/90 hover:bg-slate-900 text-white border border-slate-700/80 transition-colors cursor-pointer"
                >
                  {heroPlaying ? (
                    <Pause className="w-3.5 h-3.5 text-[#CCFF00]" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-[#CCFF00]" />
                  )}
                  <span>{heroPlaying ? 'PAUSE REEL' : 'PLAY REEL'}</span>
                </button>
              </div>

              <div className="max-w-2xl space-y-2">
                <div className="font-mono text-[11px] text-cyan-300 tracking-wider uppercase">
                  +1.80°C GLOBAL OCT RECORD · PRIMARY DRIVER: +1.34°C OCEAN SURGE · ~97% 2026 #1 PROBABILITY
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Ocean Heat Unlocked the 176-Year Record Before the Super El Niño Peak Even Arrived
                </h2>
                <p className="text-xs sm:text-sm text-slate-200/95 font-light leading-relaxed max-w-xl">
                  A single monthly update shifts climate reporting from distant policy abstractions into real-time planetary reality—where marine heat leads and a multi-month Pacific lag carries momentum straight into 2027.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Headline & KPI Strip */}
        <section className="bg-[#081630] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-3.5 max-w-4xl">
            <div className="font-mono text-xs text-[#CCFF00] tracking-wider uppercase">
              // A PLANET OUT OF BOUNDS · OCEAN-LED SURGE SINCE 1850
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              October 2026: Nominally the Warmest Single Month in Recorded History
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Climate tracking often gets reduced to long-horizon trend lines and distant policy milestones, yet occasional monthly releases mark a sharper inflection. Berkeley Earth’s October 2026 temperature analysis shows that record ocean warmth (+1.34 ± 0.10°C, surpassing the previous October ocean high by +0.14°C) was the primary driver pushing global temperatures to +1.80 ± 0.12°C (+3.25 ± 0.22°F) above the 1850–1900 baseline—nominally the warmest single month out of all 2,122 months since 1850.
            </p>
            <p className="text-sm text-slate-300/90 leading-relaxed font-light">
              Crucially, this record is emerging while a rapidly intensifying Super El Niño is still building toward its projected December peak near 4°C on conventional Niño 3.4 indices. Because global atmospheric temperatures respond with a multi-month delay after tropical Pacific warmth peaks, much of this event’s full warming influence has yet to arrive and will shape climate conditions well into 2027.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono">
            <div className="bg-[#051124] border border-cyan-500/45 rounded-xl p-4 ring-1 ring-cyan-400/20">
              <div className="flex items-center justify-between text-[10px] text-cyan-300 uppercase">
                <span>Primary Driver · Ocean Oct</span>
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-cyan-300 mt-1.5">+1.34°C</div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                All-time Oct ocean high (+0.14°C margin)
              </div>
            </div>

            <div className="bg-[#051124] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase">
                <span>Global Oct Record</span>
                <Thermometer className="w-3.5 h-3.5 text-[#CCFF00]" />
              </div>
              <div className="text-2xl font-bold text-[#CCFF00] mt-1.5">+1.80°C</div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                #1 of 2,122 months (±0.12°C)
              </div>
            </div>

            <div className="bg-[#051124] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase">
                <span>Ocean Oct Record</span>
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-cyan-300 mt-1.5">+1.34°C</div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                +0.14°C above prior Oct record
              </div>
            </div>

            <div className="bg-[#051124] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase">
                <span>2026 #1 Year Odds</span>
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-1.5">~97%</div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                YTD 1.546°C · Est. 1.55–1.64°C
              </div>
            </div>

            <div className="bg-[#051124] border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase">
                <span>Record Footprint</span>
                <Globe className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-1.5">45 Nations</div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                14.4% of Earth warmest Oct ever
              </div>
            </div>
          </div>
        </section>

        {/* Chart 1 & Chart 2: Land vs Ocean Anomaly Explorer + El Nino Lag Simulator */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Domain Anomaly Comparator (5 cols) */}
          <div className="lg:col-span-5 bg-[#081630] border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-xl">
            <div className="space-y-3">
              <div className="font-mono text-[11px] text-[#CCFF00] uppercase tracking-wider">
                // 01 · OCEAN VS. LAND DIVERGENCE
              </div>
              <h2 className="text-lg font-bold text-white">
                October 2026 Anomaly by Domain
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select a domain to inspect its pre-industrial anomaly (1850–1900 baseline) and historical rank.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
                {DOMAIN_METRICS.map((item) => {
                  const active = item.id === selectedDomain;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedDomain(item.id)}
                      className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#CCFF00] text-[#051124] border-[#CCFF00] font-bold'
                          : 'bg-[#051124] text-slate-300 border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      {item.label.split(' ')[0] === 'Global'
                        ? item.label.replace('Global ', '')
                        : item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Horizontal Bar Visual */}
            <div className="space-y-4 font-mono">
              {DOMAIN_METRICS.map((item) => {
                const widthPct = Math.min(100, (item.anomalyC / 2.6) * 100);
                const isCurrent = item.id === selectedDomain;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedDomain(item.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#051124] border-[#CCFF00]/50'
                        : 'bg-[#051124]/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-white font-semibold">{item.label}</span>
                      <span style={{ color: item.accent }} className="font-bold">
                        +{item.anomalyC.toFixed(2)}°C{' '}
                        <span className="text-slate-400 font-normal">
                          (+{item.anomalyF.toFixed(2)}°F)
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: item.accent,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#051124] border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="font-mono text-[11px] text-[#CCFF00]">
                {activeMetric.rankNote}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {activeMetric.summary}
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light border-t border-slate-800/80 pt-2">
                While land anomalies (+2.35 ± 0.14°C, ranking 3rd for October behind 2023 and 2024) sat closer to long-term secular warming, ocean surface warmth set a decisive new October benchmark—proving that marine heat unlocked the planetary record.
              </p>
            </div>
          </div>

          {/* Interactive Super El Nino & Lagged Warming Chart (7 cols) */}
          <div className="lg:col-span-7 bg-[#081630] border border-slate-800/90 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1 max-w-xl">
                <div className="font-mono text-[11px] text-[#CCFF00] uppercase tracking-wider">
                  // 02 · PACIFIC EL NIÑO &amp; DELAYED GLOBAL RESPONSE
                </div>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  Niño 3.4 Surge &amp; Lagged Warming Trajectory (2026–2027)
                </h2>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  With October Niño 3.4 at 3.21°C (and mid-October daily values near 3.5°C) plus an &gt;83% probability of strong-to-very-strong El Niño through Q1 2027, use the sliders below to test how peak strength and atmospheric lag shift subsequent warmth.
                </p>
              </div>
              <div className="font-mono text-xs bg-[#051124] border border-slate-800 rounded-xl px-3 py-2 text-right">
                <span className="text-slate-400 block text-[10px]">ILLUSTRATIVE 2027 LAG INDEX</span>
                <span className="text-[#CCFF00] font-bold text-sm">~{projected2027Warmth}°C</span>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#051124] border border-slate-800/90 rounded-xl p-3.5 font-mono text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label htmlFor="nino-slider" className="text-slate-300 flex items-center gap-1">
                    <SlidersHorizontal className="w-3 h-3 text-[#CCFF00]" />
                    Projected Niño 3.4 Peak
                  </label>
                  <span className="text-amber-400 font-bold">+{ninoPeakTarget.toFixed(2)}°C</span>
                </div>
                <input
                  id="nino-slider"
                  type="range"
                  min={2.6}
                  max={4.3}
                  step={0.05}
                  value={ninoPeakTarget}
                  onChange={(e) => setNinoPeakTarget(Number(e.target.value))}
                  className="w-full accent-[#CCFF00] cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label htmlFor="lag-slider" className="text-slate-300">
                    Atmospheric Response Lag
                  </label>
                  <span className="text-cyan-300 font-bold">{atmosphericLagMonths} mos</span>
                </div>
                <input
                  id="lag-slider"
                  type="range"
                  min={2}
                  max={7}
                  step={1}
                  value={atmosphericLagMonths}
                  onChange={(e) => setAtmosphericLagMonths(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* SVG Dual-Series Trajectory Plot */}
            <div className="bg-[#051124] border border-slate-800 rounded-xl p-3 overflow-hidden">
              <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto block font-mono">
                {/* Horizontal reference gridlines */}
                {[0, 0.25, 0.5, 0.75, 1].map((t) => {
                  const y = padT + t * plotH;
                  const tempVal = (2.1 - t * (2.1 - 1.2)).toFixed(1);
                  const ninoVal = (4.4 - t * 4.4).toFixed(1);
                  return (
                    <g key={t}>
                      <line
                        x1={padL}
                        y1={y}
                        x2={chartW - padR}
                        y2={y}
                        stroke="rgba(148, 163, 184, 0.12)"
                        strokeDasharray="3 3"
                      />
                      <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#94A3B8">
                        {tempVal}°
                      </text>
                      <text
                        x={chartW - padR + 2}
                        y={y + 3}
                        textAnchor="start"
                        fontSize="8.5"
                        fill="#FBBF24"
                        opacity="0.75"
                      >
                        {/* kept inside plot width below */}
                      </text>
                      <title>Temp scale: {tempVal}°C | Niño 3.4 scale: {ninoVal}°C</title>
                    </g>
                  );
                })}

                {/* Highlight October 2026 marker */}
                <line
                  x1={toX(9)}
                  y1={padT}
                  x2={toX(9)}
                  y2={padT + plotH}
                  stroke="rgba(204, 255, 0, 0.35)"
                  strokeDasharray="4 4"
                />

                {/* Niño 3.4 Trajectory */}
                <path
                  d={ninoLinePath}
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                />

                {/* Global Anomaly Trajectory */}
                <path
                  d={globalLinePath}
                  fill="none"
                  stroke="#CCFF00"
                  strokeWidth="2.8"
                />

                {/* Data nodes & X-axis month labels */}
                {adjustedSeries.map((pt, i) => {
                  const x = toX(i);
                  const yT = toYTemp(pt.laggedWarmth);
                  const yN = toYNino(pt.scaledNino);
                  const isOct = i === 9;
                  return (
                    <g key={pt.m}>
                      <circle cx={x} cy={yN} r={2.8} fill="#FBBF24" />
                      <circle
                        cx={x}
                        cy={yT}
                        r={isOct ? 5.2 : 3.5}
                        fill={isOct ? '#CCFF00' : '#081630'}
                        stroke="#CCFF00"
                        strokeWidth={isOct ? 2 : 1.5}
                      />
                      {i % 2 === 0 || i === 9 || i === adjustedSeries.length - 1 ? (
                        <text
                          x={x}
                          y={chartH - 10}
                          textAnchor="middle"
                          fontSize="8.5"
                          fill={isOct ? '#CCFF00' : '#94A3B8'}
                          fontWeight={isOct ? '700' : '400'}
                        >
                          {pt.m}
                        </text>
                      ) : null}
                    </g>
                  );
                })}
              </svg>

              <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-2 text-[11px] font-mono text-slate-300 border-t border-slate-800/80">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#CCFF00] inline-block" />
                    Global Temp Anomaly (°C, left axis)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-amber-400 inline-block" />
                    Niño 3.4 Index (°C, 0–4.4 scale)
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  *Oct 2026 = +1.80°C; post-Oct curve illustrates lagged Pacific influence
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Chart 3 & Chart 4: Regional Record Margins + 2026 Annual Ranking Odds */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Regional Record Margins on Rotatable World Map (7 cols) */}
          <div className="lg:col-span-7 bg-[#081630] border border-slate-800/90 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1 max-w-2xl">
                <div className="font-mono text-[11px] text-[#CCFF00] uppercase tracking-wider">
                  // 03 · REGIONAL RECORD MARGINS ON ROTATABLE WORLD MAP
                </div>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  Record Margins Positioned Across a Rotatable World Map
                </h2>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Globally, 14.4% of Earth’s surface (10.4% of land and 16.4% of ocean) experienced its locally warmest October on record, and 45 countries set national October mean records. Rotate the world map across longitude and latitude—or click any region—to inspect where extreme margins struck.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAutoSpinGlobe((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                  autoSpinGlobe
                    ? 'bg-[#CCFF00] text-[#051124] border-[#CCFF00] font-bold'
                    : 'bg-[#051124] text-slate-200 border-slate-700 hover:border-slate-500'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${autoSpinGlobe ? 'animate-spin' : ''}`} />
                <span>{autoSpinGlobe ? 'STOP ROTATION' : 'ROTATE MAP'}</span>
              </button>
            </div>

            {/* Longitude & Latitude Rotation Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#051124] border border-slate-800/90 rounded-xl p-3 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label htmlFor="globe-lon-slider" className="text-slate-300 flex items-center gap-1">
                    <Compass className="w-3 h-3 text-[#CCFF00]" />
                    Map Center Longitude
                  </label>
                  <span className="text-[#CCFF00] font-bold">{Math.round(globeCenterLon)}°</span>
                </div>
                <input
                  id="globe-lon-slider"
                  type="range"
                  min={-180}
                  max={180}
                  step={1}
                  value={globeCenterLon}
                  onChange={(e) => {
                    setAutoSpinGlobe(false);
                    setGlobeCenterLon(Number(e.target.value));
                  }}
                  className="w-full accent-[#CCFF00] cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label htmlFor="globe-lat-slider" className="text-slate-300">
                    Map Center Latitude
                  </label>
                  <span className="text-cyan-300 font-bold">{Math.round(globeCenterLat)}°</span>
                </div>
                <input
                  id="globe-lat-slider"
                  type="range"
                  min={-45}
                  max={60}
                  step={1}
                  value={globeCenterLat}
                  onChange={(e) => {
                    setAutoSpinGlobe(false);
                    setGlobeCenterLat(Number(e.target.value));
                  }}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* Rotatable World Map SVG with Geographic Record Markers */}
            <div className="bg-[#051124] border border-slate-800 rounded-xl p-3 space-y-2.5">
              <svg viewBox="0 0 720 350" className="w-full h-auto block font-mono">
                <defs>
                  <radialGradient id="rotGlobeBg" cx="50%" cy="48%" r="54%">
                    <stop offset="0%" stopColor="#0e294f" />
                    <stop offset="72%" stopColor="#07172e" />
                    <stop offset="100%" stopColor="#030a14" />
                  </radialGradient>
                </defs>

                <rect width="720" height="350" rx="10" fill="url(#rotGlobeBg)" />

                {/* Globe Horizon Ellipse */}
                <ellipse
                  cx="360"
                  cy="175"
                  rx="316"
                  ry="154"
                  fill="none"
                  stroke="rgba(125, 211, 252, 0.25)"
                  strokeWidth="1.2"
                />

                {/* Latitude & Longitude Graticule Lines */}
                {[-45, -20, 0, 20, 45, 65].map((lat) => {
                  const pts = [];
                  for (let dLon = -90; dLon <= 90; dLon += 6) {
                    const pt = projectRotatedWorldPoint(
                      wrapLon180(globeCenterLon + dLon),
                      lat,
                      globeCenterLon,
                      globeCenterLat,
                      720,
                      350
                    );
                    if (pt.visible) {
                      pts.push(`${pts.length === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`);
                    }
                  }
                  return pts.length > 1 ? (
                    <path
                      key={`glat-${lat}`}
                      d={pts.join(' ')}
                      fill="none"
                      stroke={lat === 0 ? 'rgba(204, 255, 0, 0.24)' : 'rgba(148, 163, 184, 0.12)'}
                      strokeDasharray={lat === 0 ? '5 4' : '2 4'}
                      strokeWidth="0.9"
                    />
                  ) : null;
                })}

                {[-120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lon) => {
                  const pts = [];
                  for (let lat = -60; lat <= 80; lat += 6) {
                    const pt = projectRotatedWorldPoint(
                      lon,
                      lat,
                      globeCenterLon,
                      globeCenterLat,
                      720,
                      350
                    );
                    if (pt.visible) {
                      pts.push(`${pts.length === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`);
                    }
                  }
                  return pts.length > 1 ? (
                    <path
                      key={`glon-${lon}`}
                      d={pts.join(' ')}
                      fill="none"
                      stroke="rgba(148, 163, 184, 0.11)"
                      strokeDasharray="2 4"
                      strokeWidth="0.85"
                    />
                  ) : null;
                })}

                {/* Rotated Continents */}
                {HERO_WORLD_CONTINENTS.map((land) => {
                  const pathD = buildRotatedWorldPath(
                    land.coords,
                    globeCenterLon,
                    globeCenterLat,
                    720,
                    350
                  );
                  return pathD ? (
                    <path
                      key={`rot-${land.id}`}
                      d={pathD}
                      fill="#13315c"
                      fillOpacity="0.92"
                      stroke="#7DD3FC"
                      strokeOpacity="0.62"
                      strokeWidth="1.2"
                    />
                  ) : null;
                })}

                {/* Record Margin Bars & Pins at Country Coordinates */}
                {REGIONAL_RECORDS.map((rec) => {
                  const pt = projectRotatedWorldPoint(
                    rec.lon,
                    rec.lat,
                    globeCenterLon,
                    globeCenterLat,
                    720,
                    350
                  );
                  if (!pt.visible) return null;

                  const isSelected = rec.id === selectedRegionId;
                  const barHeight = Math.max(12, (rec.marginC / 1.2) * 44);

                  return (
                    <g
                      key={rec.id}
                      onClick={() => handleSelectRegion(rec)}
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="16"
                          fill="none"
                          stroke={rec.color}
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                        />
                      )}

                      {/* Vertical margin bar rising from country coordinate */}
                      <line
                        x1={pt.x}
                        y1={pt.y}
                        x2={pt.x}
                        y2={pt.y - barHeight}
                        stroke={rec.color}
                        strokeWidth={isSelected ? '6' : '4.5'}
                        strokeLinecap="round"
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? '6' : '4.5'}
                        fill={rec.color}
                        stroke="#051124"
                        strokeWidth="1.5"
                      />

                      <text
                        x={pt.x}
                        y={pt.y - barHeight - 6}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="700"
                        fill={rec.color}
                      >
                        +{rec.marginC.toFixed(2)}°C
                      </text>
                      <text
                        x={pt.x}
                        y={pt.y + 15}
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight={isSelected ? '700' : '500'}
                        fill={isSelected ? '#FFFFFF' : '#CBD5E1'}
                      >
                        {rec.region.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Selected Country Callout */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2 py-1.5 border-t border-slate-800/80 text-xs">
                <div className="space-y-0.5">
                  <div className="font-mono text-[11px] font-bold" style={{ color: activeRegion.color }}>
                    {activeRegion.region} · {activeRegion.unitLabel} ({activeRegion.lat.toFixed(1)}°, {activeRegion.lon.toFixed(1)}°)
                  </div>
                  <p className="text-slate-300 font-light">{activeRegion.context}</p>
                </div>
              </div>
            </div>

            {/* Compact Country Selector / Margin Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {REGIONAL_RECORDS.map((rec) => {
                const isSelected = rec.id === selectedRegionId;
                return (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => handleSelectRegion(rec)}
                    className={`text-left rounded-xl p-3 border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#051124] border-[#CCFF00]/60 ring-1 ring-[#CCFF00]/25'
                        : 'bg-[#051124]/75 border-slate-800/90 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 font-mono text-xs">
                      <span className="text-white font-bold truncate">{rec.region}</span>
                      <span style={{ color: rec.color }} className="font-bold shrink-0">
                        +{rec.marginC.toFixed(2)}°C
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2026 Annual Ranking Probabilities (5 cols) */}
          <div className="lg:col-span-5 bg-[#081630] border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-xl">
            <div className="space-y-4">
              <div className="font-mono text-[11px] text-[#CCFF00] uppercase tracking-wider">
                // 04 · 2026 ANNUAL RANKING ODDS
              </div>
              <h2 className="text-lg font-bold text-white">
                Estimated Probability of 2026 Final Rank
              </h2>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                With January–October 2026 averaging 1.546 ± 0.083°C above pre-industrial levels (effectively tied with 2024), Berkeley Earth estimates a ~97% probability that 2026 finishes 1st overall and a projected annual range of 1.55–1.64°C (&gt;99% above 1.5°C).
              </p>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Historical precedents from 1997/1998 and 2015/2016 show that paired Super El Niño years often see the second year absorb the full delayed warming surge—meaning 2027 could be even warmer than 2026.
              </p>

              <div className="space-y-3 pt-1 font-mono">
                {RANKING_PROBABILITIES.map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#051124] border border-slate-800 rounded-xl p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-200">{item.label}</span>
                      <span style={{ color: item.color }} className="font-bold">
                        {item.display}
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.max(3, item.prob)}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#051124] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-1.5 font-light">
              <div className="font-mono text-[10px] text-cyan-300 uppercase flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                Methodology &amp; Dataset Note
              </div>
              <p className="leading-relaxed">
                Because HadSST4 lags by a month, October ocean data uses an ERA5 extension bias-corrected against HadSST4. Minor ranking differences can occur across datasets (e.g., ERA5 places 2024 slightly ahead year-to-date, giving 2026 a ~20% ERA5 #1 probability).
              </p>
            </div>
          </div>
        </section>

        {/* Interactive 5 Takeaways Selector */}
        <section className="bg-[#081630] border border-slate-800/90 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="space-y-1">
            <div className="font-mono text-[11px] text-[#CCFF00] uppercase tracking-wider">
              // 05 · FIVE CRITICAL TAKEAWAYS &amp; NEW BASELINES
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-3xl">
              As long-term warming collides with an extreme Pacific event, today’s record-breaking averages risk becoming routine baselines—raising urgent questions for human systems, infrastructure, and climate policy heading into 2027.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
            {takeaways.map((t, idx) => {
              const active = idx === activeTakeaway;
              return (
                <button
                  key={t.num}
                  onClick={() => setActiveTakeaway(idx)}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#CCFF00] text-[#051124] border-[#CCFF00] font-bold'
                      : 'bg-[#051124] text-slate-300 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="text-[10px] opacity-80">TAKEAWAY {t.num}</div>
                  <div className="truncate mt-0.5">{t.title}</div>
                </button>
              );
            })}
          </div>

          <div className="bg-[#051124] border border-[#CCFF00]/30 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <h3 className="text-base font-bold text-white">
                {takeaways[activeTakeaway].num}. {takeaways[activeTakeaway].title}
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                {takeaways[activeTakeaway].body}
              </p>
            </div>
            <div className="font-mono text-sm font-bold px-4 py-2 rounded-xl bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/35 shrink-0 self-start sm:self-center">
              {takeaways[activeTakeaway].stat}
            </div>
          </div>
        </section>

        {/* Reference Footer */}
        <footer className="bg-[#081630] border border-slate-800/90 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-mono text-[10px] text-[#CCFF00] uppercase tracking-widest">
              // PRIMARY REPORT SOURCE
            </div>
            <p className="text-slate-300 font-light">
              Berkeley Earth — October 2026 Temperature Update (1850–1900 baseline; ERA5/HadSST4 ocean extension; El Niño forecast context).
            </p>
          </div>
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#CCFF00] hover:bg-[#b8e600] text-[#051124] font-bold transition-colors shrink-0"
          >
            <span>Read Full Berkeley Earth Report</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </footer>
      </main>
    </div>
  );
}