export * from './packages/types';
export { northSikkimPackages } from './packages/northSikkim';
export { eastSikkimPackages } from './packages/eastSikkim';
export { westSikkimPackages } from './packages/westSikkim';
export { southSikkimPackages } from './packages/southSikkim';

import { TourPackage } from './packages/types';
import { northSikkimPackages } from './packages/northSikkim';
import { eastSikkimPackages } from './packages/eastSikkim';
import { westSikkimPackages } from './packages/westSikkim';
import { southSikkimPackages } from './packages/southSikkim';

export const tourPackagesData: TourPackage[] = [
  ...northSikkimPackages,
  ...eastSikkimPackages,
  ...westSikkimPackages,
  ...southSikkimPackages
];

export default tourPackagesData;
