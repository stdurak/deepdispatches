import type { ComponentType } from 'react';
import OrcaDossier from './OrcaDossier';
import PosidoniaDossier from './PosidoniaDossier';

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
    status: "IN DEVELOPMENT",
    title: "The Resilient Reefs: Red Sea Marine Sanctuaries",
    subtitle: "High salinity, thermal extremes, and the coral lineages surviving global marine heatwaves.",
    readTime: "8 min read",
    category: "Resilience & Oceanography",
    date: "2026-10-15",
    views: 8900,
    summary: "Field dispatches and diving transects exploring why Red Sea corals withstand temperatures that bleach global reefs.",
  }
];

// 2. BİLEŞEN KAYIT DEFTERİ (Hangi ID hangi bileşeni yükler?)
export const DISPATCH_COMPONENTS: Record<string, ComponentType<{ article: any }>> = {
  'dossier-001': OrcaDossier,
  'dossier-002': PosidoniaDossier,
};