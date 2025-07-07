import React from 'react';
import { SideLink, Actions, Manager } from '@twilio/flex-ui';

import { StringTemplates } from '../flex-hooks/strings';

interface OwnProps {
  activeView?: string;
  viewName: string;
}

const BulkSkillsMapperSideLink = (props: OwnProps) => {
  const AllStrings = Manager.getInstance().strings as any;

  function navigate() {
    Actions.invokeAction('NavigateToView', { viewName: props.viewName });
  }

  return (
    <SideLink
      showLabel={true}
      icon="Cogs"
      iconActive="Cogs"
      isActive={props.activeView === props.viewName}
      onClick={navigate}
      key="bulk-skills-mapper-side-link"
    >
      {AllStrings[StringTemplates.BulkSkillsMapper]}
    </SideLink>
  );
};

export default BulkSkillsMapperSideLink;
