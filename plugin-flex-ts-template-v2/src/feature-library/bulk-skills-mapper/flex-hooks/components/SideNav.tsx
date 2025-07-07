import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import BulkSkillsMapperSideLink from '../../custom-components/BulkSkillsMapperSideLink';

export const componentName = FlexComponent.SideNav;
export const componentHook = function addContactsToSideNav(flex: typeof Flex) {

  flex.SideNav.Content.add(<BulkSkillsMapperSideLink viewName="bulk-skills-mapper" key="bulk-skills-mapper-side-nav" />);
};
