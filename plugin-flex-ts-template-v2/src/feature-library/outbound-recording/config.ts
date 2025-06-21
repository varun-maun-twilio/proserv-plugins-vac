import { getFeatureFlags } from '../../utils/configuration';
import OutboundRecordingConfig from './types/ServiceConfiguration';

const { enabled = false , include_queues = []} = (getFeatureFlags()?.features?.outbound_recording as OutboundRecordingConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};

export const getIncludedQueues = () => {
  return include_queues;
};

export const getChannelToRecord = () => {
  return "worker";
};