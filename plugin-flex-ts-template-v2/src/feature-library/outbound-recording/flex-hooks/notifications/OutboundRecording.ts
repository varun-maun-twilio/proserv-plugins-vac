import * as Flex from '@twilio/flex-ui';
import { NotificationType } from '@twilio/flex-ui';

import { StringTemplates } from '../strings/OutboundRecording';

export enum NotificationIds {
  OutboundRecordingBroken = 'PSOutboundRecordingBroken',
}

export const notificationHook = (_flex: typeof Flex, _manager: Flex.Manager) => [
  {
    id: NotificationIds.OutboundRecordingBroken,
    closeButton: true,
    content: StringTemplates.OutboundRecordingBroken,
    timeout: 0,
    type: NotificationType.error,
  },
];
