import * as Flex from '@twilio/flex-ui';
import { styled } from '@twilio/flex-ui';
import { Actions, useFlexSelector } from '@twilio/flex-ui';
import { useEffect, useState } from 'react';
import { SyncDocument } from 'twilio-sync';


import {Stack} from '@twilio-paste/core/stack';
import {Box} from '@twilio-paste/core/box';

import syncClient from "../../../utils/sdk-clients/sync/SyncClient"
import { updateCapacity } from "../flex-hooks/states";
import { WorkerCapacityObj, WorkerCapacityState, WorkerCapacityUpdateRequest } from "../types/WorkerCapacity"
import WorkerCapacityService from "../utils/WorkerCapacityService";

const StatsWrapper = styled('div')`
 width:3rem;
 height:3.5rem;
text-align:center;
display: flex;
    align-items: center;
    justify-content: center;

& > span {
    margin:auto
    display:inline-block;
}
`;


interface Props {
    workerSid?: string
    context?: any
}



const AgentCapacityCard = ({ workerSid, context }: Props) => {

    const [workerCapacityDoc, setWorkerCapacityDoc] = useState<any>(null);


    const updateWorkerCapacity = async () => {
        syncClient.document(`worker-capacity-${workerSid}`).then(doc => {
            

            if(Object.keys(doc.data).indexOf("channels")==-1){
                WorkerCapacityService.updateCapacity(workerSid||"");
            }

            setWorkerCapacityDoc(doc.data);
            Flex.Manager.getInstance().store.dispatch(
                updateCapacity({
                    workerSid: workerSid || "",
                    capacities: (doc.data as WorkerCapacityObj)
                }));
            doc.on('updated', function (event) {
              
                setWorkerCapacityDoc(event.data);
               
                Flex.Manager.getInstance().store.dispatch(
                    updateCapacity({
                        workerSid: workerSid || "",
                        capacities: (event.data as WorkerCapacityObj)
                    }));
            });
        })
    }

   const renderCounts= (channel:string)=>{
       if(workerCapacityDoc?.channels?.[channel]){
        return (<span> {workerCapacityDoc?.channels?.[channel]?.available} <span>&#47;</span> {workerCapacityDoc?.channels?.[channel]?.total}</span>)
       }
       else{
           return (<span>-</span>)
       }
   
   }


    useEffect(() => {

        updateWorkerCapacity();



    }, [workerSid]);




    return (
        <Stack orientation="horizontal" spacing="space60">
  <StatsWrapper>
  
  {renderCounts("voice")}
      </StatsWrapper>
  <StatsWrapper >

  {renderCounts("chat")}
      </StatsWrapper>
  <StatsWrapper >
  {renderCounts("sms")}
      </StatsWrapper>
  <StatsWrapper >
  {renderCounts("email")}
      </StatsWrapper>
</Stack>

    );
};

export default AgentCapacityCard;