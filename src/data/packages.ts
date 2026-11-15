export * from './packages/types';
export { sikkim2N3DPackages } from './packages/sikkim2N3D';
export { sikkim3N4DPackages } from './packages/sikkim3N4D';
export { sikkim4N5DPackages } from './packages/sikkim4N5D';
export { sikkim5N6DPackages } from './packages/sikkim5N6D';
export { sikkim6N7DPackages } from './packages/sikkim6N7D';
export { sikkimLongDurationPackages } from './packages/sikkimLongDuration';

import { TourPackage } from './packages/types';
import { sikkim2N3DPackages } from './packages/sikkim2N3D';
import { sikkim3N4DPackages } from './packages/sikkim3N4D';
import { sikkim4N5DPackages } from './packages/sikkim4N5D';
import { sikkim5N6DPackages } from './packages/sikkim5N6D';
import { sikkim6N7DPackages } from './packages/sikkim6N7D';
import { sikkimLongDurationPackages } from './packages/sikkimLongDuration';

// Combined catalogue of all 36 verified Sikkim itineraries from uploaded official guides
export const tourPackagesData: TourPackage[] = [
  ...sikkim2N3DPackages,
  ...sikkim3N4DPackages,
  ...sikkim4N5DPackages,
  ...sikkim5N6DPackages,
  ...sikkim6N7DPackages,
  ...sikkimLongDurationPackages,
];

// Dynamic regional slices ensuring multi-region combo tours appear under every relevant region without duplicate records
export const northSikkimPackages: TourPackage[] = tourPackagesData.filter(
  (p) => p.region === 'North Sikkim' || p.districtsCovered.includes('North Sikkim')
);

export const eastSikkimPackages: TourPackage[] = tourPackagesData.filter(
  (p) => p.region === 'East Sikkim' || p.districtsCovered.includes('East Sikkim')
);

export const westSikkimPackages: TourPackage[] = tourPackagesData.filter(
  (p) => p.region === 'West Sikkim' || p.districtsCovered.includes('West Sikkim')
);

export const southSikkimPackages: TourPackage[] = tourPackagesData.filter(
  (p) => p.region === 'South Sikkim' || p.districtsCovered.includes('South Sikkim')
);

export default tourPackagesData;
