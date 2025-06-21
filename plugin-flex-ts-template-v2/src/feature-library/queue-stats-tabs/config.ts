import { getFeatureFlags } from '../../utils/configuration';
import QueueStatsTabsConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.queue_stats_tabs as QueueStatsTabsConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
