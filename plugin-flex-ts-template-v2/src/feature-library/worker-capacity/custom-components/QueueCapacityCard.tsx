import * as Flex from '@twilio/flex-ui';
import { styled } from '@twilio/flex-ui';
import { Actions, useFlexSelector } from '@twilio/flex-ui';
import { useEffect, useState } from 'react';
import { SyncDocument } from 'twilio-sync';
import { ShowIcon } from "@twilio-paste/icons/esm/ShowIcon";
import { Button } from '@twilio-paste/core/button';
import WorkerCapacityService from "../utils/WorkerCapacityService";
import AgentCapacityCard from "./AgentCapacityCard";
import {
    SideModal,
    SideModalBody,
    SideModalButton,
    SideModalFooter,
    SideModalContainer,
    SideModalHeader,
    SideModalHeading,
    useSideModalState
} from '@twilio-paste/core/side-modal';
import { ChatIcon } from "@twilio-paste/icons/esm/ChatIcon";
import { SMSIcon } from "@twilio-paste/icons/esm/SMSIcon";
import { EmailIcon } from "@twilio-paste/icons/esm/EmailIcon";
import { VoiceCapableIcon } from "@twilio-paste/icons/esm/VoiceCapableIcon";
import {  useSelector } from 'react-redux';
import AppState from '../../../types/manager/AppState';
import { reduxNamespace } from '../../../utils/state';
import { Stack } from '@twilio-paste/core/stack';
import { Box } from '@twilio-paste/core/box';
import {Spinner} from '@twilio-paste/core/spinner';

const StatsWrapper = styled('div')`
 width:3rem;
 height:1.5rem;
text-align:center;
display: flex;
justify-content: center;
`;

const CapacityTable = styled('table')`
width:100%;
border-collapse: collapse;
`;

const CapacityTableCell = styled('td')`
min-width: 50px !important;
max-width:120px !important;
width:120px !important;
border:1px solid #ccc;
`;
const CapacityTableCapacityCell = styled('td')`
min-width: 50px !important;
border:1px solid #ccc;
`;

const CapacityTableHeaderCell = styled('th')`
min-width: 50px !important;
max-width:100px !important;
width:100px !important;
background:#f1f1f1 !important;
border:1px solid #ccc;
padding:10px 0px;
font-weight:bold;

`;
const CapacityTableCapacityHeaderCell = styled('th')`
min-width: 50px !important;
background:#f1f1f1 !important;
border:1px solid #ccc;
padding:10px 0px;
font-weight:bold;
text-align:center;
`;

const ColumnHeaderCountText = styled('p')`
margin-left:0.25rem;
   
`;


interface Props {
    queueName: string

}



const QueueCapacityCard = ({ queueName }: Props) => {


    const dialog = useSideModalState({});

    const [workerList, setWorkerList] = useState<any[]>([]);
    const [isLoading,setLoading] = useState<boolean>(false);


    const { workerCapacities } = useSelector(
        (state: AppState) => state[reduxNamespace].workerCapacities
      );

 


      const getCounts= (channel:string) =>{
          
       return workerList?.map(w=>w.sid)?.map(w=>workerCapacities[w]?.channels?.[channel]?.available || 0).reduce((total,item)=>total+item,0)
      }


    const loadWorkers = async () => {

        setLoading(true);
        dialog.show();


        const workers = (await WorkerCapacityService.fetchQueueWorkers(queueName)).filter((x:any)=>x["available"]==true);
        setWorkerList(workers);
    
        setLoading(false);
        


    }



    return (
        <SideModalContainer state={dialog}>
            <Button variant="secondary_icon" onClick={() => loadWorkers()} style={{display:"block"}}>
                <ShowIcon decorative={false} title="View Capacity" />
            </Button>
            <SideModal aria-label="My Dialog">
                <SideModalHeader>
                    <SideModalHeading>{queueName}</SideModalHeading>
                </SideModalHeader>
                <SideModalBody>
                    <CapacityTable>
                        <thead>
                            <tr>
                                <CapacityTableHeaderCell>Worker</CapacityTableHeaderCell>
                                <CapacityTableHeaderCell>Activity</CapacityTableHeaderCell>
                                <CapacityTableCapacityHeaderCell>
                                    Capacity
                                    <br /><br />
                                    <Stack orientation="horizontal" spacing="space60">
                                        <StatsWrapper>
                                            <VoiceCapableIcon decorative={false} title="Voice Capacity" />

                                        </StatsWrapper>
                                        <StatsWrapper >
                                            <ChatIcon decorative={false} title="Chat Capacity" />

                                        </StatsWrapper>
                                        <StatsWrapper >
                                            <SMSIcon decorative={false} title="SMS Capacity" />

                                        </StatsWrapper>
                                        <StatsWrapper >
                                            <EmailIcon decorative={false} title="Email Capacity" />

                                        </StatsWrapper>
                                    </Stack>
                                </CapacityTableCapacityHeaderCell>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                workerList?.map(w => (<tr key={`worker-capacity-card-${w?.sid}`}>
                                    <CapacityTableCell>{w?.friendlyName}</CapacityTableCell>
                                    <CapacityTableCell>{w?.activityName} </CapacityTableCell>
                                    <CapacityTableCapacityCell><AgentCapacityCard workerSid={w.sid} /></CapacityTableCapacityCell>
                                </tr>)
                                )
                            }
                            {
                                workerList?.length==0 &&
                                <tr><td colSpan={3}>No Available Workers</td></tr>
                            }

                        </tbody>
                    </CapacityTable>

                    {
                        isLoading &&
                        <Spinner decorative={false} title="Loading" size="sizeIcon80" />
                    }


                </SideModalBody>
                <SideModalFooter>
                        
                <Stack orientation="horizontal" spacing="space60">
                <StatsWrapper>
  <VoiceCapableIcon decorative={false} title="Voice Capacity" />
  <ColumnHeaderCountText>{getCounts("voice")}</ColumnHeaderCountText>
      </StatsWrapper>
  <StatsWrapper >
  <ChatIcon decorative={false} title="Chat Capacity" />
  <ColumnHeaderCountText>{getCounts("chat")}</ColumnHeaderCountText>
      </StatsWrapper>
  <StatsWrapper >
  <SMSIcon decorative={false} title="SMS Capacity" />
  <ColumnHeaderCountText>{getCounts("sms")}</ColumnHeaderCountText>
      </StatsWrapper>
  <StatsWrapper >
  <EmailIcon decorative={false} title="Email Capacity" />
  <ColumnHeaderCountText>{getCounts("email")}</ColumnHeaderCountText>
      </StatsWrapper>
                                    </Stack>
                </SideModalFooter>
            </SideModal>
        </SideModalContainer>

    );
};

export default QueueCapacityCard;