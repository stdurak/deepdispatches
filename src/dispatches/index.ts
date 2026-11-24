
import LessepsianMigrationMap from './LessepsianMigrationMap';
import type { ComponentType } from 'react';
import OrcaDossier from './OrcaDossier';
import PosidoniaDossier from './PosidoniaDossier';
import LionfishDossier from './LionfishDossier';
import CephalopodDossier from './CephalopodDossier';
import IndoPacificDossier from './IndoPacificDossier';
import PenguinDossier from './PenguinDossier';

// 1. META VERİ (Ana sayfa listesi için)
export const DISPATCHES = [
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
    summary: "Decades of groundbreaking research in neuroscience and marine biology are dismantling our assumptions about mind and social complexity.",
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
    summary: "An unvarnished assessment of Mediterranean seagrass meadows: from ancient carbon vaults to anchor chain scarring.",
  },
  {
    id: "dossier-003",
    number: "DOSSIER #003",
    status: "FIELD REPORT",
    title: "The Lessepsian Mirage: How the Suez Canal Weaponized the Mediterranean",
    subtitle: "In a warming sea, human engineering shattered a 3-million-year-old thermal wall. Now, the Mediterranean is an alien frontier where predators evolve into prey.",
    readTime: "8 min read",
    category: "Invasive Species & Maritime Geopolitics",
    date: "2026-10-23",
    views: 0,
    summary: "Thirty years of context collapse into a single truth: the Lionfish is not a monster. It is a victim of the mechanical Trojan Horses we call cargo ships.",
  },
  {
    id: "dossier-004",
    number: "DOSSIER #004",
    status: "FIELD INVESTIGATION",
    title: "The Ocean’s Double Agents: Split-Screen Camouflage, Encrypted Polarization, and the Quantum Optics of Cephalopod Courtship",
    subtitle: "In the photic slaughterhouse of the open sea, broadcasting passion is an invitation to death. The cuttlefish’s solution? Project an encrypted frequency to a lover while displaying cold stone to the executioner.",
    readTime: "11 min read",
    category: "Cephalopod Biophotonics & Cognitive Stealth",
    date: "2026-10-22",
    views: 0,
    summary: "Three hundred million years before human telecommunications, cuttlefish engineered a living, biophotonic equivalent using split-screen camouflage and encrypted polarization.",
  },
  {
    id: "dossier-005",
    number: "DOSSIER #005",
    status: "CLIMATE INVESTIGATION",
    title: "When Oceans Stop Talking: The Surprising Science of the Indo-Pacific Breakup",
    subtitle: "For 400 years, the Indian and Pacific Oceans maintained a synchronized atmospheric conversation. Now, human emissions are breaking the connection — and destroying our ability to predict the climate.",
    readTime: "9 min read",
    category: "Climate Dynamics & Oceanography",
    date: "2026-11-03",
    views: 0,
    summary: "A landmark WHOI study reveals that the long-standing marriage between the Indian and Pacific Oceans is failing due to anthropogenic forcing.",
  },
  {
    id: "dossier-006",
    number: "DOSSIER #006",
    status: "FIELD TELEMETRY REPORT",
    title: "Tracked Across the Southern Ocean: How Young Emperor Penguins Head Straight Into Industrial Fishing Zones",
    subtitle: "Satellite telemetry of 48 juveniles reveals a 1,500-kilometer open-ocean migration highway—and a lethal blindspot in Antarctic marine protection.",
    readTime: "9 min read",
    category: "Polar Telemetry & Marine Governance",
    date: "2026-11-20",
    views: 0,
    summary: "When five-month-old emperor penguins leave Antarctic colonies for the first time, they follow an identical 1,500 km northward highway—spending up to 60% of key months inside active industrial fishing zones outside proposed marine reserves.",
  },
  // YENİ EKLENEN: TÜM AKDENİZ ATLASI (DOSSIER 007)
  {
    id: "dossier-007",
    number: "DOSSIER #007",
    status: "INTERACTIVE ATLAS",
    title: "Mediterranean Sea Levantine Lessepsian Corridor: Lionfish, Pufferfish & Striped Eel Catfish",
    subtitle: "Interactive corridor and seasonal thermal timeline exploring Indo-Pacific dispersal across the Mediterranean basin.",
    readTime: "Interactive Map",
    category: "Lessepsian Biogeography & Coastal Telemetry",
    date: "2026-11-24",
    views: 0,
    summary: "Explore seasonal temperature shifts and northward migration corridors across the Levantine basin, Aegean Sea, and Central Mediterranean.",
    image: "/mediterranean-lessepsian-cover.jpg"
  }
];

// 2. BİLEŞEN KAYIT DEFTERİ (Hangi ID hangi bileşeni yükler?)
export const DISPATCH_COMPONENTS: Record<string, ComponentType<{ article: any }>> = {
  'dossier-001': OrcaDossier,
  'dossier-002': PosidoniaDossier,
  'dossier-003': LionfishDossier,
  'dossier-004': CephalopodDossier,
  'dossier-005': IndoPacificDossier,
  'dossier-006': PenguinDossier,
  'dossier-007': LessepsianMigrationMap, // Harita bileşeni buraya bağlandı
};