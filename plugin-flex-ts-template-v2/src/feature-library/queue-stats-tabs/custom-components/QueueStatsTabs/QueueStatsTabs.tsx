import * as Flex from '@twilio/flex-ui';
import { useFlexSelector } from '@twilio/flex-ui';
import { QueuesStats } from '@twilio/flex-ui';
import { useEffect, useState } from "react";
import {RadioButtonGroup, RadioButton} from '@twilio-paste/core/radio-button-group';
import { useDispatch, useSelector } from 'react-redux';
import AppState from '../../../../types/manager/AppState';
import { Actions,QueueStatsTabState } from '../../flex-hooks/states/QueueStatsTab';

interface Props {
 
}

const TAB_LIST = ["Airbnb","BDC","Casago Support","Email","GE","OE","ROS","All"]



const QueueStatsTabs = ({  }: Props) => {

    const queuesMap = useFlexSelector((state: AppState) => state.flex.realtimeQueues.queuesList);
    const dispatch = useDispatch();

  useEffect(()=>{

    console.error("Resetting subscriptions to everyone queue");

    QueuesStats.setFilter(
        (queue: Flex.QueuesStats.WorkerQueue) =>
          queue.friendly_name == "Everyone"
      );
    QueuesStats.setSubscriptionFilter((queue) => queue.friendly_name=="Everyone");
    
    return ()=>{

     

    }

  },[])

  const applyQueueGroupFilters = (groupName:string)=>{

        dispatch(Actions.saveSelectedTab(groupName));
        

        if(groupName=="everyone"){
            QueuesStats.setFilter((queue) => queue.friendly_name=="Everyone");
            QueuesStats.setSubscriptionFilter((queue) => queue.friendly_name=="Everyone");
           /* const newQueuesPreferenceData = {...queuesMap};
            let qList = Object.keys(newQueuesPreferenceData);
            for(var q of qList){              
                newQueuesPreferenceData[q].selected=true;
            }
            dispatch({type:"FLEX_METRICS_FILTER_PANEL",payload:{queuesPreferenceData:newQueuesPreferenceData}})
            */
        }
        else{
            QueuesStats.setFilter(
                (queue: Flex.QueuesStats.WorkerQueue) =>
                queue.friendly_name.substring(0, groupName.length) == groupName
              );
            QueuesStats.setSubscriptionFilter((queue) => queue.friendly_name.substring(0, groupName.length) == groupName);
           
            /*
            const newQueuesPreferenceData:Record<string,any> = {};
            let qList = Object.keys(queuesMap);
            
            for(var q of qList){
               let curr =  queuesMap[q];
               
               if(curr.friendly_name.substring(0, groupName.length)  == groupName){
                newQueuesPreferenceData[q] = {
                    ...curr,
                    selected:true
                }
               }
               
            }


            
            dispatch({type:"FLEX_METRICS_FILTER_PANEL",payload:{isFilterPanelOpen:false,isFirstTimeCardsExperience:false,queuesPreferenceData:newQueuesPreferenceData}});
*/
            
        }
  }


  return (
    <>
   <RadioButtonGroup name="queue-groups" attached legend="" onChange={(e)=>{applyQueueGroupFilters(e)}}>
    <RadioButton value="everyone" defaultChecked>Everyone</RadioButton>
    {
        TAB_LIST.map(t=><RadioButton value={t} >{t}</RadioButton>
        )
    }
    
  </RadioButtonGroup>
    </>
  );
};

export default QueueStatsTabs;