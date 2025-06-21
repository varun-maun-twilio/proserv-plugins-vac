import * as Flex from '@twilio/flex-ui';

import { NotificationIds } from '../notifications/OutboundRecording';
import { getChannelToRecord } from '../../config';
import { FlexEvent } from '../../../../types/feature-loader';
import logger from '../../../../utils/logger';

export const eventName = FlexEvent.pluginsInitialized;
export const eventHook = () => {
  // Test to make sure the channel config property has been
  // configured correctly. If it has not, throw errors and notifications.
  if (getChannelToRecord() !== 'worker' && getChannelToRecord() !== 'customer') {
    Flex.Notifications.showNotification(NotificationIds.OutboundRecordingBroken);
    logger.error(
      '[outbound-recording] ERROR: outbound_recording.channel does not have the correct value. Refer to your ui_attributes to fix.',
    );
  }
};
