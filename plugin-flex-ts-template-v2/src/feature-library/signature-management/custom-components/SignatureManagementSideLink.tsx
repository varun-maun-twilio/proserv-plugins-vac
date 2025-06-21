import React from 'react';
import { SideLink, Actions, Manager } from '@twilio/flex-ui';

import { StringTemplates } from '../flex-hooks/strings';

interface OwnProps {
  activeView?: string;
  viewName: string;
}

const SignatureManagementSideLink = (props: OwnProps) => {
  const AllStrings = Manager.getInstance().strings as any;

  function navigate() {
    Actions.invokeAction('NavigateToView', { viewName: props.viewName });
  }

  return (
    <SideLink
      showLabel={true}
      icon="TasksSmall"
      iconActive="TasksSmall"
      isActive={props.activeView === props.viewName}
      onClick={navigate}
      key="signature-management-side-link"
    >
      {AllStrings[StringTemplates.SignatureManagement]}
    </SideLink>
  );
};

export default SignatureManagementSideLink;
