import * as Flex from '@twilio/flex-ui';


import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.Logout;
import {draftUtils} from "../../utils/DraftUtils";
import {isFeatureEnabled}  from "../../config";

export const actionHook = function persistEmailDrafts(flex: typeof Flex, _manager: Flex.Manager) {


  if(!isFeatureEnabled()){return};

    flex.Actions.addListener(`${actionEvent}${actionName}`, async (payload) => {

      const persistedData =  Object.keys(window.sessionStorage).filter(x=>x.match(/^CH[0-9a-fA-F]{32}$/g)).map(x=>{ return {
        "key":x,
        "value":window.sessionStorage.getItem(x)
      }})

      

      await draftUtils.saveSyncMapItem("workerEmailDrafts",_manager?.workerClient?.sid||"",{"drafts":persistedData});
  
      
      
    });

  


};
