import { getFeatureFlags } from '../../utils/configuration';
import SignatureManagementConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.signature_management as SignatureManagementConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
