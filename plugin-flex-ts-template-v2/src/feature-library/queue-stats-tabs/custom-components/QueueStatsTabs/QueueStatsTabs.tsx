import * as Flex from '@twilio/flex-ui';
import { useFlexSelector } from '@twilio/flex-ui';
import { QueuesStats } from '@twilio/flex-ui';
import { useEffect, useState } from "react";
import {RadioButtonGroup, RadioButton} from '@twilio-paste/core/radio-button-group';
import { useDispatch, useSelector } from 'react-redux';
import AppState from '../../../../types/manager/AppState';
import { Actions,QueueStatsTabState } from '../../flex-hooks/states/QueueStatsTab';

import QueueGroups from "./config/groups";

interface Props {
 
}




const QueueStatsTabs = ({  }: Props) => {

  
  

  const applyQueueGroupFilters = (groupName:string)=>{

        
        const filterFn:(q:any)=>boolean = QueueGroups.find(g=>g.key===groupName)?.filterFn as (q:any)=>boolean;

        QueuesStats.setFilter(filterFn);
        QueuesStats.setSubscriptionFilter(filterFn);
       
        
  }


  return (
    <div style={{margin:20}}>
   <RadioButtonGroup name="queue-groups" attached legend="" onChange={(e)=>{applyQueueGroupFilters(e)}}>
    {
        QueueGroups.map(t=><RadioButton value={t.key} >{t.key}</RadioButton>
        )
    }
    
  </RadioButtonGroup>
    </div>
  );
};

export default QueueStatsTabs;