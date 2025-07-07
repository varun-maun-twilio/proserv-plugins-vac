import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import SignatureManagementView from '../../custom-components/SignatureManagementView';

export const componentName = FlexComponent.ViewCollection;
export const componentHook = function addContactsView(flex: typeof Flex) {

  const { roles } = flex.Manager.getInstance().user;
  if (roles.indexOf('admin') >= 0 || roles.indexOf('supervisor') >= 0) {
  flex.ViewCollection.Content.add(
    <flex.View name="signature-management" key="signature-management">
      <SignatureManagementView key="signature-management-view-content" />
    </flex.View>,
  );
  }
};
