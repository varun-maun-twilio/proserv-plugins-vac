import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import SignatureManagementSideLink from '../../custom-components/SignatureManagementSideLink';

export const componentName = FlexComponent.SideNav;
export const componentHook = function addContactsToSideNav(flex: typeof Flex) {

  flex.SideNav.Content.add(<SignatureManagementSideLink viewName="signature-management" key="signature-management-side-nav" />);
};
