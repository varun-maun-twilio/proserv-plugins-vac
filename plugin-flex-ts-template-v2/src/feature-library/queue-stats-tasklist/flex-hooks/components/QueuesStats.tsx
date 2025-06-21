import * as Flex from '@twilio/flex-ui';

import TaskListTable from '../../custom-components/TaskListTable';

import { isFeatureEnabled } from '../../config';


export const componentHook = function addAttributesToTaskInfoPanel(flex: typeof Flex, manager: Flex.Manager) {
  if (!isFeatureEnabled() ) return;

  flex.QueuesStatsView.Content.add(<TaskListTable key="task-table"/>,{sortOrder:1000})
};
