import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import { isFeatureEnabled } from '../../config';
import SearchPanel from '../../custom-components/SearchPanel/SearchPanel';

export const componentName = FlexComponent.SideNav;
export const componentHook = function addContactsToSideNav(flex: typeof Flex) {
  if (!isFeatureEnabled() ) {
    return;
  }
/*
  flex.AgentDesktopView.Content.add(<SearchPanel key="message-search-panel" />,{
    sortOrder:-1
  });
  */
};
