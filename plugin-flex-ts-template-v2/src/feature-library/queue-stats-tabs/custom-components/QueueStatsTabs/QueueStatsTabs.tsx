import * as Flex from '@twilio/flex-ui';
import { useFlexSelector } from '@twilio/flex-ui';
import { QueuesStats } from '@twilio/flex-ui';
import { useEffect, useState } from "react";
import {RadioButtonGroup, RadioButton} from '@twilio-paste/core/radio-button-group';

import {  saveUserConfig, fetchUserConfigForQueueTabs} from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import AppState from '../../../../types/manager/AppState';
import CustomQueueGroup from "../CustomQueueGroup";


import QueueGroups from "./config/groups";

interface Props {
 
}




const QueueStatsTabs = ({  }: Props) => {

  const userPreference:any =    useSelector(
    (state: AppState) => state.flex.worker?.attributes?.config_overrides?.features?.queue_stats_tabs
  );


  const selectedTab:string= useSelector(
    (state: AppState) => state.flex.worker?.attributes?.config_overrides?.features?.queue_stats_tabs?.selectedTab
  ) || "Everything";

  const hasFetchedList:boolean= useSelector(
    (state: AppState) => state.flex.realtimeQueues?.hasFetchedList) || false;

  useEffect(()=>{
    if(hasFetchedList && selectedTab!=null){
      applyQueueGroupFilters(selectedTab);
    }
  },[selectedTab,hasFetchedList])

  const applyQueueGroupFilters = (groupName:string)=>{

        const combinedFilterGroups = [
          ...userPreference?.myGroups?.map((g:any)=>{
            return {
              key:g.key,
              filterFn: (q:any) =>  g.queueList.includes(q.friendly_name),
            }
          }),
          ...QueueGroups
        ];
        
        const filterFn:(q:any)=>boolean = combinedFilterGroups.find(g=>g.key===groupName)?.filterFn as (q:any)=>boolean;
        
        console.error("###### Applying Subscription ",groupName,filterFn)

        Flex.QueuesStats.setFilter(filterFn);
        Flex.QueuesStats.setSubscriptionFilter(filterFn);

        
  }


  return (
    <div style={{margin:20,display:"flex"}}>
   <RadioButtonGroup name="queue-groups" attached legend="" onChange={(e)=>{saveUserConfig("queue_stats_tabs",{selectedTab:e})}} value={selectedTab}>
    {
        QueueGroups.map(t=><RadioButton value={t.key} >{t.key}</RadioButton>
        )
    }
    {
      userPreference?.myGroups?.map((t:any)=><RadioButton value={t.key} >{t.key} <button>Edit</button></RadioButton>)
    }
    <CustomQueueGroup />
    
  </RadioButtonGroup>
 
  
    </div>
  );
};

export default QueueStatsTabs;