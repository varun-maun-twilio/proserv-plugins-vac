import * as Flex from '@twilio/flex-ui';
import { FeatureDefinition } from '../../types/feature-loader';
import { isFeatureEnabled } from './config';
import {draftUtils} from "./utils/DraftUtils";
// @ts-ignore
import hooks from './flex-hooks/**/*.*';

const loadDrafts = async()=>{

  const persistedDrafts = await draftUtils.fetchSyncMapItem ("workerEmailDrafts",Flex.Manager.getInstance()?.workerClient?.sid||"");
  
  console.error({persistedDrafts},"persistedDrafts");
  if(persistedDrafts?.item?.drafts){
    persistedDrafts?.item?.drafts?.forEach((d:any)=>{
      console.error(d.key,d.value);
      window.sessionStorage.setItem(d.key,d.value);
    })
  }
}

export const register = (): FeatureDefinition => {
  if (!isFeatureEnabled()) return {};
  loadDrafts();
  return { name: 'persistent-drafts', hooks: typeof hooks === 'undefined' ? [] : hooks };

 
};
