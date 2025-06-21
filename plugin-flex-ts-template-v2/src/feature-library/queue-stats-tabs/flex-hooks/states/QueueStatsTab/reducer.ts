import * as Flex from '@twilio/flex-ui';

import { Action } from '../../../../../types/manager';
import { QueueStatsTabState, SELECT_TAB,  } from './types';
import initialState from './initialState';

const reducer = (state = initialState, action: Action): QueueStatsTabState => {
  switch (action.type) {
  
    case `${SELECT_TAB}`: {
      return {
        ...state,
        selectedTab: action.payload.selectedTab,
      };
    }

    default: {
      return state;
    }
  }
};

// Reducer
export const reducerHook = () => ({ queueStatsTab: reducer });
