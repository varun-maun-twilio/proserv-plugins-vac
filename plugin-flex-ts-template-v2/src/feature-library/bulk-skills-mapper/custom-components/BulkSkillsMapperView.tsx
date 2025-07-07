import { useEffect, useState, useRef } from 'react';
import { Template } from '@twilio/flex-ui';
import { Flex } from '@twilio-paste/core/flex';
import { Heading } from '@twilio-paste/core/heading';


import { StringTemplates } from '../flex-hooks/strings';

import { BulkSkillsMapperViewWrapper } from './BulkSkillsMapperViewStyles';
import AgentList from './AgentSelection/AgentList';
import SkillList from './SkillSelection/SkillList';





const BulkSkillsMapperView = () => {

  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [operation, setOperation] = useState<string>("add");


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
       
          
            <AgentList />



          
            <SkillList />


        
       
        

      </Flex>



    </BulkSkillsMapperViewWrapper>
  );
};

export default BulkSkillsMapperView;
