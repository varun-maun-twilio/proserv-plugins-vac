import * as Flex from '@twilio/flex-ui';

import { isFeatureEnabled } from '../../config';
import WorkerCapacityService from "../../utils/WorkerCapacityService";

import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';

export const actionEvent = FlexActionEvent.after;
export const actionName = FlexAction.AcceptTask;

export const actionHook = function updateWorkerCapacity(flex: typeof Flex, _manager: Flex.Manager) {
  if (!isFeatureEnabled()) return;
  _manager.events.addListener("taskAccepted", (task) => {
    WorkerCapacityService.updateCapacity(_manager?.workerClient?.sid ?? '');
  });
};
