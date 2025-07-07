import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import SignatureManagementSideLink from '../../custom-components/SignatureManagementSideLink';

export const componentName = FlexComponent.SideNav;
export const componentHook = function addContactsToSideNav(flex: typeof Flex) {

  const { roles } = flex.Manager.getInstance().user;
  if (roles.indexOf('admin') >= 0 || roles.indexOf('supervisor') >= 0) {

    flex.SideNav.Content.add(<SignatureManagementSideLink viewName="signature-management" key="signature-management-side-nav" />);
  }
};
