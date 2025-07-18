import * as Flex from '@twilio/flex-ui';

import { addMissingCallDataIfNeeded, canRecordTask } from '../../helpers/outboundRecordingHelper';
import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.HangupCall;
export const actionHook = function handleOutboundRecordingHangupCall(flex: typeof Flex, _manager: Flex.Manager) {
  flex.Actions.addListener(`${actionEvent}${actionName}`, async (payload) => {
    if (!canRecordTask(payload.task)) {
      return;
    }
    // Listening for this event to at least capture the conference SID
    // if the outbound call is canceled before the called party answers
    addMissingCallDataIfNeeded(payload.task);
  });
};
