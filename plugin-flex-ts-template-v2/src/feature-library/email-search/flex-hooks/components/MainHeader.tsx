import * as Flex from '@twilio/flex-ui';

import EmailSearchToggleBtn from '../../custom-components/EmailSearchToggleBtn';
import { FlexComponent } from '../../../../types/feature-loader';
import { isFeatureEnabled } from '../../config';

export const componentName = FlexComponent.MainHeader;
export const componentHook = function addDeviceManagerToMainHeader(flex: typeof Flex) {
  if (!isFeatureEnabled()) {
    return;
  }
  flex.MainHeader.Content.add(<EmailSearchToggleBtn key="search-email-trigger" />, {
    sortOrder: -1,
    align: 'end',
  });
};