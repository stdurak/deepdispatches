import type { ComponentType } from 'react';
import OrcaDossier from './OrcaDossier';
import PosidoniaDossier from './PosidoniaDossier';
import LionfishDossier from './LionfishDossier';
import CephalopodDossier from './CephalopodDossier';
import IndoPacificDossier from './IndoPacificDossier';
import PenguinDossier from './PenguinDossier';
import LessepsianMigrationMap from './LessepsianMigrationMap';
import BerkeleyOct2026Telemetry from './BerkeleyOct2026Telemetry';
import StandardDossier from './StandardDossier';

const modules = import.meta.glob<{ default: any }>('../content/dispatches/*.json', { eager: true });

export const DISPATCHES = Object.entries(modules)
  .map(([path, mod]) => {
    const fileName = path.split('/').pop()?.replace('.json', '') || '';
    return {
      ...mod.default,
      id: mod.default.dossierId || mod.default.id || fileName,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const DISPATCH_COMPONENTS: Record<string, ComponentType<{ article: any }>> = {
  'dossier-001': OrcaDossier,
  'dossier-002': PosidoniaDossier,
  'dossier-003': LionfishDossier,
  'dossier-004': CephalopodDossier,
  'dossier-005': IndoPacificDossier,
  'dossier-006': PenguinDossier,
  'dossier-007': LessepsianMigrationMap,
  'dossier-008': BerkeleyOct2026Telemetry,
};

export { StandardDossier };
