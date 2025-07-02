import * as Flex from '@twilio/flex-ui';
import { isFeatureEnabled } from '../../config';

import { FlexEvent } from '../../../../types/feature-loader';
import logger from '../../../../utils/logger';
import {draftUtils} from "../../utils/DraftUtils";
export const eventName = FlexEvent.userLoggedIn;

const loadDrafts = async()=>{

  const persistedDrafts = await draftUtils.fetchSyncMapItem ("workerEmailDrafts",Flex.Manager.getInstance()?.workerClient?.sid||"");
  
  console.error({persistedDrafts},"persistedDrafts");
}

export const eventHook =  () => {

  console.error("^^^^^^^^^^^^^^ Draft event has been called");

  if (!isFeatureEnabled() ) return;

  loadDrafts();


};
