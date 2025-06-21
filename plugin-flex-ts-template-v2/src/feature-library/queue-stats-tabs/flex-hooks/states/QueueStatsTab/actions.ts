import * as Flex from '@twilio/flex-ui';

import { Action } from '../../../../../types/manager';
import { SELECT_TAB } from './types';


class Actions {
  public static saveSelectedTab = (tab: string): Action => {
    return {
      type: SELECT_TAB,
      payload: {
        selectedTab: tab
      },
    };
  }
}

export default Actions;
