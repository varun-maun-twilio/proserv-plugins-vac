import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import BulkSkillsMapperView from '../../custom-components/BulkSkillsMapperView';

export const componentName = FlexComponent.ViewCollection;
export const componentHook = function addContactsView(flex: typeof Flex) {


  flex.ViewCollection.Content.add(
    <flex.View name="bulk-skills-mapper" key="bulk-skills-mapper">
      <BulkSkillsMapperView key="bulk-skills-mapper-view-content" />
    </flex.View>,
  );
};
