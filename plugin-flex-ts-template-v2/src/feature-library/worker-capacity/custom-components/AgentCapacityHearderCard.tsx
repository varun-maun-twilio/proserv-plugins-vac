import * as Flex from '@twilio/flex-ui';
import { styled } from '@twilio/flex-ui';
import {  useSelector } from 'react-redux';
import AppState from '../../../types/manager/AppState';
import { reduxNamespace } from '../../../utils/state';

import { ChatIcon } from "@twilio-paste/icons/esm/ChatIcon";
import { SMSIcon } from "@twilio-paste/icons/esm/SMSIcon";
import { EmailIcon } from "@twilio-paste/icons/esm/EmailIcon";
import { VoiceCapableIcon } from "@twilio-paste/icons/esm/VoiceCapableIcon";
import {Stack} from '@twilio-paste/core/stack';
import {Box} from '@twilio-paste/core/box';

const ColumnHeaderText = styled('span')`
color: rgb(18, 28, 45);
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 2.6rem;
   
`;

const ColumnHeaderCountText = styled('p')`
margin-left:0.25rem;
   
`;

const StatsWrapper = styled('div')`
 width:3rem;
 height:1.5rem;
text-align:center;
display: flex;
justify-content: center;
`;


interface Props {
}



const AgentCapacityHeaderCard = ({  }: Props) => {

 
    const { workerCapacities } = useSelector(
        (state: AppState) => state[reduxNamespace].workerCapacities
      );

    const workersInView =   useSelector(
        (state: AppState) => state.flex.supervisor.workers.map(w=>w.worker.sid)
      );


      const getCounts= (channel:string) =>{
       return workersInView?.map(w=>workerCapacities[w]?.channels?.[channel]?.available || 0).reduce((total,item)=>total+item,0)
      }


    return (
        <div style={{textAlign:"center"}}>
            <ColumnHeaderText>Available Capactity</ColumnHeaderText>
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
</div>

    );
};

export default AgentCapacityHeaderCard;