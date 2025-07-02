import { getFeatureFlags } from '../../utils/configuration';
import WorkerCapacityConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.worker_capacity as WorkerCapacityConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
