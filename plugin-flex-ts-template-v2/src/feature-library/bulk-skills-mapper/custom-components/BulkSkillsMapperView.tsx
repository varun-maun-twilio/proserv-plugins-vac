import { useEffect, useState, useRef } from 'react';
import { Template } from '@twilio/flex-ui';
import { Flex } from '@twilio-paste/core/flex';
import { Heading } from '@twilio-paste/core/heading';


import { StringTemplates } from '../flex-hooks/strings';

import { BulkSkillsMapperViewWrapper } from './BulkSkillsMapperViewStyles';
import AgentList from './AgentSelection/AgentList';
import SkillList from './SkillSelection/SkillList';
import UpdateSkills from './SkillUpdate/UpdateSkills';




const BulkSkillsMapperView = () => {

  const [selectedAgents,setSelectedAgents] = useState<any[]>([]);
  const [selectedSkills,setSelectedSkills] = useState<any[]>([]);
const [inProgress,setInProgress] = useState<boolean>(false);

  const initialize = async () => {

  }

  useEffect(() => {


    initialize();

  }, []);

  useEffect(() => {

  }, []);






  return (

    <BulkSkillsMapperViewWrapper>

      <Flex margin="space50" marginBottom="space0" element="SIGNATURE_MANAGEMENT_VIEW_WRAPPER" vertical grow shrink>

       
          <Heading as="h2" variant="heading20" >
            <Template code={StringTemplates.BulkSkillsMapper} />
          </Heading>
       
          
          {
            !inProgress &&
            <AgentList updateSelectedAgents={setSelectedAgents} />

          }

          
          {
            !inProgress &&
            <SkillList updateSelectedSkills={setSelectedSkills}/>
          }

        
            <UpdateSkills selectedAgents={selectedAgents} 
            selectedSkills={selectedSkills} 
            updateInProgress={setInProgress} 
            inProgress={inProgress}
            updateSelectedSkills={setSelectedSkills}
            updateSelectedAgents={setSelectedAgents} />
       
        

      </Flex>



    </BulkSkillsMapperViewWrapper>
  );
};

export default BulkSkillsMapperView;
