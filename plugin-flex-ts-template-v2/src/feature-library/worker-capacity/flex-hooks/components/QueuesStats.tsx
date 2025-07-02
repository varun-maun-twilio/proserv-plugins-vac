import * as Flex from '@twilio/flex-ui';
import { WorkersDataTable, ColumnDefinition } from '@twilio/flex-ui';
import QueueCapacityCard from "../../custom-components/QueueCapacityCard"
import { isFeatureEnabled } from '../../config';


export const componentHook = function addAgentCapacityStats(flex: typeof Flex, manager: Flex.Manager) {
  if (!isFeatureEnabled() ) return;

  flex.QueuesStats.QueuesDataTable.Content.add(
    <ColumnDefinition
      key="agent-capacity-queue-stats"
      header="Agents Capacity"
      content={(queue: Flex.QueuesStats.WorkerQueue) => { 
        return <QueueCapacityCard queueName={queue.friendly_name} />;
      }}
    />,
    { sortOrder: 1 }
  );
};
