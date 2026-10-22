import type { ComponentType } from 'react';
import OrcaDossier from './OrcaDossier';
import PosidoniaDossier from './PosidoniaDossier';
import LionfishDossier from './LionfishDossier'; // Yeni eklendi
import CephalopodDossier from './CephalopodDossier';

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
  }
];

// 2. BİLEŞEN KAYIT DEFTERİ (Hangi ID hangi bileşeni yükler?)
// İşte aradığın C maddesi tam olarak burası:
export const DISPATCH_COMPONENTS: Record<string, ComponentType<{ article: any }>> = {
  'dossier-001': OrcaDossier,
  'dossier-002': PosidoniaDossier,
  'dossier-003': LionfishDossier, // Kızıldeniz makalesi eklendi
  'dossier-004': CephalopodDossier,
};