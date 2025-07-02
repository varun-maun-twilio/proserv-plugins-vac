import * as Flex from '@twilio/flex-ui';
import { WorkersDataTable, ColumnDefinition } from '@twilio/flex-ui';
import AgentCapacityCard from "../../custom-components/AgentCapacityCard"
import AgentCapacityHeaderCard from "../../custom-components/AgentCapacityHearderCard"
import { isFeatureEnabled } from '../../config';


export const componentHook = function addAgentCapacityStats(flex: typeof Flex, manager: Flex.Manager) {
  if (!isFeatureEnabled() ) return;

  WorkersDataTable.Content.add(<ColumnDefinition key="channelCapacity" header={<AgentCapacityHeaderCard key="header-agent-capacity" />} style={{  }}
    content={(item, context) => (
      <AgentCapacityCard workerSid={(item as any)?.worker?.sid} context={context} />
    )}
  />, { sortOrder: 10 });
};
