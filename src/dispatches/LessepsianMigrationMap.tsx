import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Pause,
  ExternalLink,
  X,
  Compass,
  Layers,
  MapPin,
} from 'lucide-react';

/**
 * DEEP DISPATCHES // MEDITERRANEAN LESSEPSIAN TELEMETRY MAP
 * Full-viewport standalone interactive map tracking Lessepsian migration
 * across the Mediterranean Sea (Suez -> Levantine -> Cyprus / Anatolia / Aegean / Central Med).
 */

type MapProps = {
  article?: {
    number?: string;
  };
};

const GEO_BOUNDS = {
  minLon: 12.0,
  maxLon: 37.0,
  minLat: 30.5,
  maxLat: 42.2,
};

function projectCoord(lon: number, lat: number, width = 1200, height = 750) {
  const meanLatRad = ((GEO_BOUNDS.minLat + GEO_BOUNDS.maxLat) * 0.5 * Math.PI) / 180;
  const lonScale = Math.cos(meanLatRad);

  const rawMinX = GEO_BOUNDS.minLon * lonScale;
  const rawMaxX = GEO_BOUNDS.maxLon * lonScale;
  const rawX = lon * lonScale;

  const x = ((rawX - rawMinX) / (rawMaxX - rawMinX)) * width;
  const y = ((GEO_BOUNDS.maxLat - lat) / (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat)) * height;
  return { x, y };
}

const LANDMASSES = [
  {
    id: 'cyprus',
    name: 'Cyprus',
    coords: [
      [32.27, 35.02],
      [32.55, 35.16],
      [32.95, 35.18],
      [33.32, 35.34],
      [34.05, 35.50],
      [34.61, 35.70],
      [34.25, 35.48],
      [33.96, 35.24],
      [34.08, 34.98],
      [33.63, 34.72],
      [32.92, 34.65],
      [32.38, 34.76],
      [32.27, 35.02],
    ],
  },
  {
    id: 'crete',
    name: 'Crete',
    coords: [
      [23.55, 35.52],
      [24.65, 35.48],
      [25.75, 35.35],
      [26.32, 35.15],
      [25.55, 35.02],
      [24.20, 35.18],
      [23.55, 35.52],
    ],
  },
  {
    id: 'sicily',
    name: 'Sicily',
    coords: [
      [12.42, 37.85],
      [13.45, 38.18],
      [14.85, 38.22],
      [15.65, 38.05],
      [15.15, 37.05],
      [14.20, 36.72],
      [12.75, 37.55],
      [12.42, 37.85],
    ],
  },
  {
    id: 'italian-peninsula',
    name: 'Southern & Central Italy',
    coords: [
      [12.0, 42.2],
      [12.0, 41.2],
      [13.2, 41.15],
      [14.25, 40.75],
      [15.65, 38.15],
      [16.55, 37.95],
      [17.15, 39.45],
      [18.45, 40.15],
      [17.85, 40.95],
      [16.25, 41.85],
      [14.5, 42.2],
      [12.0, 42.2],
    ],
  },
  {
    id: 'greece-aegean',
    name: 'Greece & Aegean Shelf',
    coords: [
      [19.8, 42.2],
      [19.8, 39.8],
      [20.6, 38.8],
      [21.4, 37.4],
      [22.4, 36.4],
      [23.1, 36.7],
      [23.7, 37.9],
      [24.8, 38.4],
      [25.6, 39.9],
      [26.5, 40.8],
      [26.5, 42.2],
      [19.8, 42.2],
    ],
  },
  {
    id: 'anatolia',
    name: 'Anatolia (Turkiye)',
    coords: [
      [26.4, 42.2],
      [26.4, 39.8],
      [27.2, 38.4],
      [27.8, 37.2],
      [28.8, 36.7],
      [30.5, 36.3],
      [32.2, 36.2],
      [33.9, 36.15],
      [34.8, 36.75],
      [36.0, 36.85],
      [36.2, 36.2],
      [37.0, 36.2],
      [37.0, 42.2],
      [26.4, 42.2],
    ],
  },
  {
    id: 'levant-north-africa',
    name: 'Levant & North Africa Littoral',
    coords: [
      [35.95, 36.2],
      [35.78, 35.52],
      [35.52, 34.45],
      [35.19, 33.27],
      [34.75, 32.08],
      [34.23, 31.18],
      [32.32, 31.26],
      [30.15, 31.38],
      [27.2, 31.42],
      [24.5, 31.85],
      [21.5, 32.65],
      [18.5, 31.95],
      [15.2, 32.45],
      [12.0, 33.45],
      [12.0, 30.5],
      [37.0, 30.5],
      [37.0, 36.2],
      [35.95, 36.2],
    ],
  },
];

const WAYPOINTS = [
  {
    id: 'suez-north',
    name: 'Suez Northern Gateway (Port Said)',
    code: 'MED-01 · SUEZ',
    subbasin: 'Southeastern Levantine',
    lon: 32.32,
    lat: 31.28,
    depth: '14m',
    temp: '+29.4°C',
    salinity: '39.6 PSU',
    role: 'Primary artificial maritime link connecting warm, saline Red Sea / Suez waters to the Eastern Mediterranean.',
  },
  {
    id: 'levant-east',
    name: 'Eastern Levantine Shelf',
    code: 'MED-02 · LEVANT',
    subbasin: 'Levantine Basin',
    lon: 34.95,
    lat: 33.45,
    depth: '72m',
    temp: '+28.7°C',
    salinity: '39.3 PSU',
    role: 'Core thermal gateway and high-density Lessepsian establishment zone feeding northward and westward currents.',
  },
  {
    id: 'cyprus-shelf',
    name: 'Cyprus & Karpaz Shelf',
    code: 'MED-03 · CYPRUS',
    subbasin: 'Northern Levantine',
    lon: 34.25,
    lat: 35.38,
    depth: '40m',
    temp: '+28.2°C',
    salinity: '39.1 PSU',
    role: 'Island stepping-stone where Levantine drift encounters rocky reefs, headlands, and bays around Cyprus.',
  },
  {
    id: 'cilician-anatolia',
    name: 'Cilician & Southern Anatolian Shelf',
    code: 'MED-04 · ANATOLIA',
    subbasin: 'Northeastern Levantine',
    lon: 32.85,
    lat: 36.15,
    depth: '55m',
    temp: '+27.8°C',
    salinity: '38.9 PSU',
    role: 'Warm coastal shelf corridor carrying Lessepsian species northwestward toward the Aegean Sea.',
  },
  {
    id: 'aegean-sea',
    name: 'Southeastern Aegean & Cretan Arc',
    code: 'MED-05 · AEGEAN',
    subbasin: 'Aegean Sea',
    lon: 25.85,
    lat: 36.35,
    depth: '95m',
    temp: '+26.4°C',
    salinity: '38.7 PSU',
    role: 'Island-chain dispersal corridor where rising summer temperatures allow deeper Aegean penetration.',
  },
  {
    id: 'ionian-central',
    name: 'Ionian & Central Mediterranean',
    code: 'MED-06 · CENTRAL MED',
    subbasin: 'Central Mediterranean',
    lon: 17.65,
    lat: 37.85,
    depth: '140m',
    temp: '+25.5°C',
    salinity: '38.3 PSU',
    role: 'Western frontier where warming waters gradually expand suitability beyond the warm Levantine core.',
  },
  {
    id: 'malta-strait',
    name: 'Malta & Sicily Channel Shelf',
    code: 'MED-07 · MALTA',
    subbasin: 'Central Mediterranean / Malta',
    lon: 14.41,
    lat: 35.95,
    depth: '68m',
    temp: '+25.1°C',
    salinity: '37.9 PSU',
    role: 'Westernmost lionfish record frontier in the Central Mediterranean (35.95°N, 14.41°E), marking long-range pelagic larval drift from eastern source populations.',
  },
];

const SPECIES_PROFILES = [
  {
    id: 'lionfish',
    name: 'Lionfish',
    scientific: 'Pterois miles',
    color: '#CCFF00',
    depthRange: '2m - 65m',
    corridorSummary:
      'Establishes across the Levantine Basin, reaches Cyprus and southern Anatolia, advances through the Aegean, and reaches Malta and Sicily in the Central Mediterranean.',
    trophicImpact:
      'Venomous ambush predator consuming native reef fish and juveniles; westward expansion to Malta underscores long-distance larval dispersal in warming seas.',
    corridors: [
      [
        [32.32, 31.28],
        [34.2, 32.2],
        [35.3, 33.8],
        [34.5, 35.4],
        [32.5, 36.1],
        [29.2, 36.4],
        [26.2, 36.2],
      ],
      [
        [34.5, 35.4],
        [33.3, 35.3],
        [32.5, 34.8],
      ],
      [
        [26.2, 36.2],
        [22.4, 36.1],
        [18.5, 36.8],
        [15.1, 36.7],
        [14.41, 35.95],
      ],
    ],
  },
  {
    id: 'pufferfish',
    name: 'Silver-Cheeked Pufferfish',
    scientific: 'Lagocephalus sceleratus',
    color: '#38BDF8',
    depthRange: '10m - 100m',
    corridorSummary:
      'Wide-ranging shelf migrant spreading from the Suez gateway through the Levantine, Aegean, and Ionian/Central Mediterranean.',
    trophicImpact:
      'Damages fishing nets and longlines while posing severe tetrodotoxin hazards to ecosystems, fisheries, and human health.',
    corridors: [
      [
        [32.32, 31.28],
        [33.8, 31.7],
        [35.1, 33.2],
        [33.8, 35.0],
        [29.5, 35.6],
        [25.6, 36.4],
        [21.2, 37.1],
        [17.6, 37.8],
      ],
      [
        [29.5, 35.6],
        [26.1, 35.2],
        [24.2, 35.3],
      ],
    ],
  },
  {
    id: 'striped-eel-catfish',
    name: 'Striped Eel Catfish',
    scientific: 'Plotosus lineatus',
    color: '#FF7A00',
    depthRange: '1m - 80m',
    corridorSummary:
      'Fast-spreading benthic invader advancing along warm Levantine coastal shelves toward Cyprus and eastern Mediterranean habitats.',
    trophicImpact:
      'Juveniles form dense foraging balls over sand and seagrass beds; venomous fin spines create sting risks in shallow coastal zones.',
    corridors: [
      [
        [32.32, 31.28],
        [34.4, 32.3],
        [35.4, 34.1],
        [34.6, 35.7],
        [33.8, 35.2],
      ],
      [
        [35.4, 34.1],
        [34.8, 35.6],
        [32.8, 36.1],
      ],
    ],
  },
];

const SEASONAL_TIMELINE = [
  { month: 'JAN', sst: '17.6°C', anomaly: '+1.1°C', fluxIndex: 36, regime: 'Winter Mixing · Baseline Basin Flow' },
  { month: 'FEB', sst: '17.1°C', anomaly: '+1.2°C', fluxIndex: 32, regime: 'Winter Thermal Minimum · Slower Dispersal' },
  { month: 'MAR', sst: '17.9°C', anomaly: '+1.3°C', fluxIndex: 45, regime: 'Early Spring Stratification Onset' },
  { month: 'APR', sst: '19.5°C', anomaly: '+1.5°C', fluxIndex: 58, regime: 'Levantine & Anatolian Spring Warming' },
  { month: 'MAY', sst: '22.1°C', anomaly: '+1.8°C', fluxIndex: 72, regime: 'Shelf Current Acceleration' },
  { month: 'JUN', sst: '25.2°C', anomaly: '+2.0°C', fluxIndex: 85, regime: 'Early Summer Heatwave · Aegean & Cyprus Influx' },
  { month: 'JUL', sst: '27.5°C', anomaly: '+2.2°C', fluxIndex: 95, regime: 'Peak Summer Thermal Anomaly' },
  { month: 'AUG', sst: '28.6°C', anomaly: '+2.4°C', fluxIndex: 100, regime: 'Mediterranean SST Peak · Maximum Dispersal' },
  { month: 'SEP', sst: '27.4°C', anomaly: '+2.1°C', fluxIndex: 88, regime: 'Late-Summer Warm Pool · Coastal Residency' },
  { month: 'OCT', sst: '24.6°C', anomaly: '+1.7°C', fluxIndex: 73, regime: 'Autumn Transition · Gradual Cooling' },
  { month: 'NOV', sst: '21.3°C', anomaly: '+1.4°C', fluxIndex: 55, regime: 'Late Autumn Turnover' },
  { month: 'DEC', sst: '18.9°C', anomaly: '+1.2°C', fluxIndex: 43, regime: 'Winter Cooling Entry' },
];

const REFERENCES = [
  {
    title: 'First Record of the Devil Firefish Pterois miles in Maltese Waters (Annales / ZRS Koper, 2026)',
    url: 'https://publ.zdjp.si/index.php/ashn/article/view/514',
    note: 'Documented occurrence of Pterois miles in Maltese waters in the Central Mediterranean.',
  },
  {
    title: 'Lionfish (Pterois miles) in the Mediterranean Sea: A Review of the Invasion (NeoBiota, 2024)',
    url: 'https://neobiota.pensoft.net/article/110442/',
    note: 'Mediterranean-wide review tracking westward and northward expansion including Malta, Sicily, Croatia, and Sardinia.',
  },
  {
    title: 'Projected Habitat Expansion of the Invasive Striped Eel Catfish Plotosus lineatus in the Mediterranean Sea (MDPI Diversity, 2026)',
    url: 'https://www.mdpi.com/1424-2818/18/9/571',
    note: 'Mediterranean habitat suitability modeling and climate warming projections for Plotosus lineatus.',
  },
  {
    title: 'A lionfish (Pterois miles) invasion has begun in the Mediterranean Sea (Kletou et al., Marine Biodiversity Records)',
    url: 'https://www.researchgate.net/publication/303977580_A_lionfish_Pterois_miles_invasion_has_begun_in_the_Mediterranean_Sea',
    note: 'Early colonization and spread of Pterois miles across eastern Mediterranean waters.',
  },
  {
    title: 'Preventing lionfish invasion in Cyprus through early response and targeted removal (EEA Climate-ADAPT)',
    url: 'https://climate-adapt.eea.europa.eu/en/metadata/case-studies/preventing-lionfish-invasion-in-cyprus-through-early-response-and-targeted-removal',
    note: 'Eastern Mediterranean ocean warming context and Lessepsian management framework.',
  },
];

function buildSvgPath(coords: number[][], width = 1200, height = 750) {
  if (!coords || coords.length === 0) return '';
  return coords
    .map((coord: number[], idx: number) => {
      const lon = coord[0];
      const lat = coord[1];
      const { x, y } = projectCoord(lon, lat, width, height);
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

export default function LessepsianMigrationMap({ article }: MapProps) {
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [activeWaypoint, setActiveWaypoint] = useState(WAYPOINTS[1]);
  const [seasonIndex, setSeasonIndex] = useState(7);
  const [isPlaying, setIsPlaying] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [showBathymetry, setShowBathymetry] = useState(true);
  const [showVectors, setShowVectors] = useState(true);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const currentSeason = SEASONAL_TIMELINE[seasonIndex];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setSeasonIndex((prev) => (prev + 1) % SEASONAL_TIMELINE.length);
    }, 1100);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleResetView = useCallback(() => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        setZoom((z) => Math.min(3.2, Number((z + 0.2).toFixed(2))));
      } else if (e.key === '-' || e.key === '_') {
        setZoom((z) => Math.max(0.85, Number((z - 0.2).toFixed(2))));
      } else if (e.key === '0') {
        handleResetView();
      } else if (e.key === 'Escape') {
        setSourcesOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleResetView]);

  const handleFocusWholeMed = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  const handleFocusLevantCyprus = () => {
    setZoom(2.05);
    setPan({ x: -340, y: -110 });
    setActiveWaypoint(WAYPOINTS[2]);
  };

  const handleFocusAegeanCentral = () => {
    setZoom(1.75);
    setPan({ x: 215, y: -55 });
    setActiveWaypoint(WAYPOINTS[6]);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.14 : -0.14;
    setZoom((prev) => Math.min(3.2, Math.max(0.85, Number((prev + delta).toFixed(2)))));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-interactive="true"]')) return;
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: dragStartRef.current.panX + dx,
      y: dragStartRef.current.panY + dy,
    });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const visibleSpecies = useMemo(() => {
    if (selectedSpecies === 'all') return SPECIES_PROFILES;
    return SPECIES_PROFILES.filter((sp) => sp.id === selectedSpecies);
  }, [selectedSpecies]);

  const effectiveFlux = useMemo(() => {
    return Math.round(currentSeason.fluxIndex * (selectedSpecies === 'all' ? 1 : 0.94));
  }, [currentSeason, selectedSpecies]);

  const dossierBadge = article?.number || 'MEDITERRANEAN ATLAS';

  return (
    <div
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-screen h-screen overflow-hidden bg-[#051124] text-slate-100 select-none font-sans"
      style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
    >
      <svg
        viewBox="0 0 1200 750"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
      >
        <defs>
          <radialGradient id="medSeaGrad" cx="58%" cy="52%" r="65%">
            <stop offset="0%" stopColor="#0a2040" />
            <stop offset="60%" stopColor="#051124" />
            <stop offset="100%" stopColor="#020914" />
          </radialGradient>

          <pattern id="medGrid" width="75" height="75" patternUnits="userSpaceOnUse">
            <path
              d="M 75 0 L 0 0 0 75"
              fill="none"
              stroke="rgba(148, 163, 184, 0.055)"
              strokeWidth="0.8"
            />
          </pattern>

          <filter id="vectorGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="basinShadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#01050c" floodOpacity="0.85" />
          </filter>
        </defs>

        <g
          transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
          style={{
            transformOrigin: '600px 375px',
            transition: isDraggingRef.current ? 'none' : 'transform 160ms ease-out',
          }}
        >
          <rect x="-500" y="-350" width="2200" height="1500" fill="url(#medSeaGrad)" />
          <rect x="-500" y="-350" width="2200" height="1500" fill="url(#medGrid)" />

          {showBathymetry && (
            <g fill="none" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="1" strokeDasharray="5 5">
              <ellipse
                cx={projectCoord(33.5, 34.2).x}
                cy={projectCoord(33.5, 34.2).y}
                rx="145"
                ry="82"
              />
              <ellipse
                cx={projectCoord(25.2, 36.2).x}
                cy={projectCoord(25.2, 36.2).y}
                rx="115"
                ry="68"
              />
              <ellipse
                cx={projectCoord(18.2, 37.5).x}
                cy={projectCoord(18.2, 37.5).y}
                rx="130"
                ry="78"
              />
              <path
                d={`M ${projectCoord(32.35, 31.3).x} ${projectCoord(32.35, 31.3).y} Q ${projectCoord(35.5, 33.8).x} ${projectCoord(35.5, 33.8).y} ${projectCoord(28.5, 36.3).x} ${projectCoord(28.5, 36.3).y}`}
                stroke="rgba(204, 255, 0, 0.11)"
                strokeWidth="22"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Graticule */}
          <g fill="rgba(148, 163, 184, 0.35)" fontSize="9" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
            {[15, 20, 25, 30, 35].map((lon) => {
              const { x } = projectCoord(lon, GEO_BOUNDS.maxLat);
              return (
                <g key={`lon-${lon}`}>
                  <line
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={750}
                    stroke="rgba(148, 163, 184, 0.045)"
                    strokeWidth="0.7"
                  />
                  <text x={x + 4} y={16}>
                    {lon}°E
                  </text>
                </g>
              );
            })}
            {[32, 35, 38, 41].map((lat) => {
              const { y } = projectCoord(GEO_BOUNDS.minLon, lat);
              return (
                <g key={`lat-${lat}`}>
                  <line
                    x1={0}
                    y1={y}
                    x2={1200}
                    y2={y}
                    stroke="rgba(148, 163, 184, 0.045)"
                    strokeWidth="0.7"
                  />
                  <text x={10} y={y - 4}>
                    {lat}°N
                  </text>
                </g>
              );
            })}
          </g>

          {/* Landmasses */}
          <g filter="url(#basinShadow)">
            {LANDMASSES.map((land) => {
              const isCyprus = land.id === 'cyprus';
              return (
                <path
                  key={land.id}
                  d={`${buildSvgPath(land.coords)} Z`}
                  fill={isCyprus ? '#152c4f' : '#0b192e'}
                  stroke={isCyprus ? '#CCFF00' : '#263b59'}
                  strokeWidth={isCyprus ? 1.8 / Math.sqrt(zoom) : 1.05 / Math.sqrt(zoom)}
                  strokeOpacity={isCyprus ? 0.9 : 0.72}
                />
              );
            })}
          </g>

          {/* Sea & Basin Labels */}
          <g
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            letterSpacing="0.14em"
            pointerEvents="none"
          >
            <text
              x={projectCoord(34.6, 33.4).x}
              y={projectCoord(34.6, 33.4).y}
              fill="rgba(148, 163, 184, 0.46)"
              fontSize={10.5 / Math.sqrt(zoom)}
              textAnchor="middle"
            >
              LEVANTINE SEA
            </text>
            <text
              x={projectCoord(33.4, 35.15).x}
              y={projectCoord(33.4, 35.15).y}
              fill="#f8fafc"
              fontSize={9.5 / Math.sqrt(zoom)}
              fontWeight="700"
              textAnchor="middle"
            >
              CYPRUS
            </text>
            <text
              x={projectCoord(31.4, 37.6).x}
              y={projectCoord(31.4, 37.6).y}
              fill="rgba(148, 163, 184, 0.45)"
              fontSize={10 / Math.sqrt(zoom)}
              textAnchor="middle"
            >
              ANATOLIA
            </text>
            <text
              x={projectCoord(25.2, 37.4).x}
              y={projectCoord(25.2, 37.4).y}
              fill="rgba(125, 211, 252, 0.55)"
              fontSize={9.5 / Math.sqrt(zoom)}
              textAnchor="middle"
            >
              AEGEAN SEA
            </text>
            <text
              x={projectCoord(18.6, 36.2).x}
              y={projectCoord(18.6, 36.2).y}
              fill="rgba(148, 163, 184, 0.44)"
              fontSize={10 / Math.sqrt(zoom)}
              textAnchor="middle"
            >
              CENTRAL MEDITERRANEAN
            </text>
            <text
              x={projectCoord(14.41, 35.42).x}
              y={projectCoord(14.41, 35.42).y}
              fill="#CCFF00"
              fontSize={8.5 / Math.sqrt(zoom)}
              fontWeight="700"
              textAnchor="middle"
            >
              MALTA (P. MILES)
            </text>
            <text
              x={projectCoord(32.35, 30.85).x}
              y={projectCoord(32.35, 30.85).y}
              fill="#fbbf24"
              fontSize={8.5 / Math.sqrt(zoom)}
              textAnchor="middle"
            >
              SUEZ GATEWAY
            </text>
          </g>

          {/* Migration Vectors */}
          {showVectors && (
            <g>
              <style>{`
                @keyframes medDashFlow {
                  to {
                    stroke-dashoffset: -56;
                  }
                }
                .med-lessepsian-flow {
                  stroke-dasharray: 10 8;
                  animation: medDashFlow 1.7s linear infinite;
                }
              `}</style>

              {visibleSpecies.map((sp) => {
                const strokeW = (1.7 + (currentSeason.fluxIndex / 100) * 1.9) / Math.sqrt(zoom);
                return (
                  <g key={sp.id} filter="url(#vectorGlow)">
                    {sp.corridors.map((routeCoords, idx) => {
                      const d = buildSvgPath(routeCoords);
                      return (
                        <g key={`${sp.id}-route-${idx}`}>
                          <path
                            d={d}
                            fill="none"
                            stroke={sp.color}
                            strokeWidth={strokeW * 0.65}
                            strokeOpacity="0.25"
                          />
                          <path
                            d={d}
                            fill="none"
                            stroke={sp.color}
                            strokeWidth={strokeW}
                            strokeOpacity="0.92"
                            className="med-lessepsian-flow"
                          />
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </g>
          )}

          {/* Waypoint Nodes */}
          {WAYPOINTS.map((wp) => {
            const { x, y } = projectCoord(wp.lon, wp.lat);
            const isSelected = activeWaypoint?.id === wp.id;
            const r = (isSelected ? 6.5 : 4.5) / Math.sqrt(zoom);

            return (
              <g
                key={wp.id}
                data-interactive="true"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setActiveWaypoint(wp);
                }}
                className="cursor-pointer"
              >
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r={r * 2.4}
                    fill="none"
                    stroke="#CCFF00"
                    strokeWidth={1.2 / Math.sqrt(zoom)}
                    strokeOpacity="0.65"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={isSelected ? '#CCFF00' : '#081630'}
                  stroke="#CCFF00"
                  strokeWidth={1.8 / Math.sqrt(zoom)}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* TOP HUD */}
      <header
        data-interactive="true"
        className="fixed top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center gap-3 bg-[#081630]/90 backdrop-blur-md border border-slate-800/90 px-4 py-2.5 rounded-xl shadow-2xl">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-white">
                DEEP DISPATCHES
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30">
                {dossierBadge}
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
              MEDITERRANEAN LESSEPSIAN MIGRATION TELEMETRY
            </p>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 bg-[#081630]/90 backdrop-blur-md border border-slate-800/90 p-1.5 rounded-xl shadow-2xl text-xs font-mono">
          <button
            onClick={handleFocusWholeMed}
            className="px-3 py-1.5 rounded-lg bg-[#051124] hover:bg-slate-800 text-slate-200 hover:text-[#CCFF00] border border-slate-800 transition-colors cursor-pointer"
          >
            All Med
          </button>
          <button
            onClick={handleFocusLevantCyprus}
            className="px-3 py-1.5 rounded-lg bg-[#051124] hover:bg-slate-800 text-slate-200 hover:text-[#CCFF00] border border-slate-800 transition-colors cursor-pointer hidden md:inline-block"
          >
            Levant &amp; Cyprus
          </button>
          <button
            onClick={handleFocusAegeanCentral}
            className="px-3 py-1.5 rounded-lg bg-[#051124] hover:bg-slate-800 text-slate-200 hover:text-[#CCFF00] border border-slate-800 transition-colors cursor-pointer hidden lg:inline-block"
          >
            Aegean &amp; Central
          </button>
          <button
            onClick={() => setSourcesOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold transition-colors cursor-pointer"
          >
            Sources ({REFERENCES.length})
          </button>
        </div>
      </header>

      {/* TELEMETRY DRAWER */}
      <aside
        data-interactive="true"
        className={`fixed top-20 left-4 z-30 w-[calc(100vw-2rem)] sm:w-[375px] max-h-[calc(100vh-11.5rem)] overflow-y-auto bg-[#081630]/92 backdrop-blur-xl border border-slate-800/90 rounded-2xl shadow-2xl transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : '-translate-x-[calc(100%+2rem)]'
        }`}
      >
        <div className="p-5 space-y-5">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3.5">
            <div>
              <span className="text-[10px] font-mono text-[#CCFF00] tracking-widest uppercase block">
                // BASIN-WIDE LESSEPSIAN STREAM
              </span>
              <h1 className="text-base font-bold text-white mt-0.5">
                Mediterranean Dispersal &amp; Thermal Flux
              </h1>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Collapse Telemetry Panel"
              className="text-xs font-mono text-slate-400 hover:text-white p-1.5 rounded bg-[#051124] border border-slate-800 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono">
            <div className="bg-[#051124] border border-slate-800/90 rounded-xl p-2.5">
              <span className="text-[9px] text-slate-400 uppercase block">SST ({currentSeason.month})</span>
              <span className="text-sm font-bold text-white">{currentSeason.sst}</span>
              <span className="text-[10px] text-amber-400 block">{currentSeason.anomaly}</span>
            </div>
            <div className="bg-[#051124] border border-slate-800/90 rounded-xl p-2.5">
              <span className="text-[9px] text-slate-400 uppercase block">Advection</span>
              <span className="text-sm font-bold text-[#CCFF00]">{effectiveFlux}%</span>
              <span className="text-[10px] text-slate-400 block">Flux Index</span>
            </div>
            <div className="bg-[#051124] border border-slate-800/90 rounded-xl p-2.5">
              <span className="text-[9px] text-slate-400 uppercase block">Salinity</span>
              <span className="text-sm font-bold text-cyan-300">{activeWaypoint.salinity}</span>
              <span className="text-[10px] text-slate-400 truncate block">{activeWaypoint.subbasin.split(' ')[0]}</span>
            </div>
          </div>

          {/* SPECIES FILTER */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              <span>// SPECIES CORRIDOR FILTER</span>
              <button
                onClick={() => setSelectedSpecies('all')}
                className="text-[#CCFF00] hover:underline cursor-pointer"
              >
                Show All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
              <button
                onClick={() => setSelectedSpecies('all')}
                className={`px-3 py-2 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedSpecies === 'all'
                    ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-bold'
                    : 'bg-[#051124] text-slate-300 border-slate-800 hover:border-slate-600'
                }`}
              >
                All Vectors (3)
              </button>
              {SPECIES_PROFILES.map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSpecies(sp.id)}
                  className={`px-3 py-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    selectedSpecies === sp.id
                      ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-bold'
                      : 'bg-[#051124] text-slate-300 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: selectedSpecies === sp.id ? '#000000' : sp.color,
                    }}
                  />
                  <span className="truncate">{sp.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SPECIES CARDS */}
          <div className="space-y-2.5">
            {visibleSpecies.map((sp) => (
              <div
                key={sp.id}
                onClick={() => setSelectedSpecies(sp.id)}
                className="bg-[#051124]/95 border border-slate-800/90 hover:border-slate-700 rounded-xl p-3.5 space-y-2 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-bold text-white">{sp.name}</h2>
                    <p className="text-[11px] italic text-slate-400">{sp.scientific}</p>
                  </div>
                  <span
                    className="text-[9px] font-mono px-2 py-0.5 rounded border"
                    style={{
                      color: sp.color,
                      borderColor: `${sp.color}55`,
                      backgroundColor: `${sp.color}14`,
                    }}
                  >
                    {sp.depthRange}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {sp.corridorSummary}
                </p>
                <p className="text-[11px] font-mono text-slate-400 border-t border-slate-800/70 pt-2">
                  Impact: {sp.trophicImpact}
                </p>
              </div>
            ))}
          </div>

          {/* WAYPOINT INSPECTOR */}
          {activeWaypoint && (
            <div className="bg-[#051124] border border-[#CCFF00]/30 rounded-xl p-3.5 space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#CCFF00] font-bold flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {activeWaypoint.code}
                </span>
                <span className="text-slate-400">DEPTH {activeWaypoint.depth}</span>
              </div>
              <div className="text-xs font-bold text-white">{activeWaypoint.name}</div>
              <p className="text-[11px] text-slate-300 font-sans font-light leading-relaxed">
                {activeWaypoint.role}
              </p>
            </div>
          )}

          {/* LAYER TOGGLES */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
            <button
              onClick={() => setShowVectors((v) => !v)}
              className={`flex-1 py-2 px-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-center gap-1.5 ${
                showVectors
                  ? 'bg-[#CCFF00]/15 border-[#CCFF00]/50 text-[#CCFF00]'
                  : 'bg-[#051124] border-slate-800 text-slate-500'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Vectors: {showVectors ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setShowBathymetry((b) => !b)}
              className={`flex-1 py-2 px-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-center gap-1.5 ${
                showBathymetry
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                  : 'bg-[#051124] border-slate-800 text-slate-500'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Shelf: {showBathymetry ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* INLINE REFERENCES */}
          <div className="border-t border-slate-800/80 pt-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-widest">
                // REFERENCES &amp; LINKS
              </span>
              <button
                onClick={() => setSourcesOpen(true)}
                className="text-[10px] font-mono text-slate-300 hover:text-[#CCFF00] cursor-pointer"
              >
                All Sources ↗
              </button>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              {REFERENCES.slice(0, 3).map((ref) => (
                <li key={ref.url} className="leading-snug">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-[#CCFF00] underline decoration-slate-700 inline-flex items-start gap-1"
                  >
                    <span>{ref.title}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {!drawerOpen && (
        <button
          data-interactive="true"
          onClick={() => setDrawerOpen(true)}
          className="fixed top-20 left-4 z-30 px-4 py-2.5 rounded-xl bg-[#081630]/95 hover:bg-[#081630] border border-[#CCFF00]/40 text-xs font-mono font-bold text-[#CCFF00] shadow-2xl cursor-pointer backdrop-blur-md"
        >
          // OPEN MEDITERRANEAN TELEMETRY
        </button>
      )}

      {/* ZOOM CONTROLS */}
      <div
        data-interactive="true"
        className="fixed bottom-24 right-4 z-30 flex flex-col gap-1.5 bg-[#081630]/90 backdrop-blur-md border border-slate-800/90 p-1.5 rounded-xl shadow-2xl font-mono text-xs"
      >
        <button
          onClick={() => setZoom((z) => Math.min(3.2, Number((z + 0.25).toFixed(2))))}
          className="w-8 h-8 rounded-lg bg-[#051124] hover:bg-slate-800 text-white hover:text-[#CCFF00] flex items-center justify-center cursor-pointer"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="text-[10px] text-center text-slate-400 py-0.5">
          {Math.round(zoom * 100)}%
        </div>
        <button
          onClick={() => setZoom((z) => Math.max(0.85, Number((z - 0.25).toFixed(2))))}
          className="w-8 h-8 rounded-lg bg-[#051124] hover:bg-slate-800 text-white hover:text-[#CCFF00] flex items-center justify-center cursor-pointer"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetView}
          className="w-8 h-8 rounded-lg bg-[#051124] hover:bg-slate-800 text-slate-300 hover:text-[#CCFF00] flex items-center justify-center cursor-pointer border-t border-slate-800/70"
          title="Reset View (0)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SEASONAL TIMELINE SCRUBBER */}
      <div
        data-interactive="true"
        className="fixed bottom-4 left-4 right-4 z-30 max-w-4xl mx-auto bg-[#081630]/92 backdrop-blur-xl border border-slate-800/90 rounded-2xl px-4 py-3 shadow-2xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="px-3.5 py-1.5 rounded-xl bg-[#CCFF00] hover:bg-[#b8e600] text-black text-xs font-mono font-bold shrink-0 cursor-pointer transition-colors inline-flex items-center justify-center gap-1.5"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'PAUSE' : 'CYCLE'}</span>
          </button>

          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
              <span className="text-[#CCFF00] font-bold">
                {currentSeason.month} · {currentSeason.regime}
              </span>
              <span className="text-slate-300">
                SST: <strong className="text-white">{currentSeason.sst}</strong> ({currentSeason.anomaly}) · Flux:{' '}
                <strong className="text-[#CCFF00]">{effectiveFlux}%</strong>
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={SEASONAL_TIMELINE.length - 1}
              value={seasonIndex}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIsPlaying(false);
                setSeasonIndex(Number(e.target.value));
              }}
              aria-label="Seasonal Mediterranean warming and dispersal scrubber"
              className="w-full accent-[#CCFF00] cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* SOURCES MODAL */}
      {sourcesOpen && (
        <div
          data-interactive="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSourcesOpen(false)}
        >
          <div
            className="max-w-2xl w-full bg-[#081630] border border-slate-700 rounded-2xl p-6 md:p-8 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#CCFF00] uppercase tracking-widest block">
                  // SOURCES &amp; SCIENTIFIC REFERENCES
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Mediterranean Lessepsian Reference Index
                </h3>
              </div>
              <button
                onClick={() => setSourcesOpen(false)}
                className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded bg-[#051124] border border-slate-800 cursor-pointer"
              >
                ESC
              </button>
            </div>

            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Basin routes, monthly SST values, and dispersal flux indices use self-contained illustrative model values for interactive exploration alongside published ecological and regional reference sources below:
            </p>

            <ul className="space-y-3">
              {REFERENCES.map((item, idx) => (
                <li
                  key={item.url}
                  className="bg-[#051124] border border-slate-800/90 rounded-xl p-4 space-y-1.5"
                >
                  <div className="text-[10px] font-mono text-[#CCFF00]">SOURCE 0{idx + 1}</div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-cyan-300 hover:text-[#CCFF00] underline inline-flex items-start gap-1.5"
                  >
                    <span>{item.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  </a>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{item.note}</p>
                  <div className="text-[11px] font-mono text-slate-500 break-all">{item.url}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}