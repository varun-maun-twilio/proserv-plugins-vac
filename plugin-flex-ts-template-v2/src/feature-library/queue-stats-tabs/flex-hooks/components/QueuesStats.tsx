import * as Flex from '@twilio/flex-ui';

import QueueStatsTabs from '../../custom-components/QueueStatsTabs';

import { isFeatureEnabled } from '../../config';


export const componentHook = function addAttributesToTaskInfoPanel(flex: typeof Flex, manager: Flex.Manager) {
  if (!isFeatureEnabled() ) return;

 flex.QueuesStatsView.Content.add(<QueueStatsTabs key="stats-fitler-tabs"/>,{sortOrder:1})
};
