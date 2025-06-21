import { getFeatureFlags } from '../../utils/configuration';
import QueueStatsTasklistConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.queue_stats_tasklist as QueueStatsTasklistConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
