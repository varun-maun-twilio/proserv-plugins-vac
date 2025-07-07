import { getFeatureFlags } from '../../utils/configuration';
import BulkSkillsMapperConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.bulk_skills_mapper as BulkSkillsMapperConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
