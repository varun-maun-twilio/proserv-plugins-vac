import { getFeatureFlags } from '../../utils/configuration';
import PersistentDraftsConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.persistent_drafts as PersistentDraftsConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
