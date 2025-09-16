import React, { useEffect, useState } from 'react';
import {
    DataGrid,
    DataGridHead,
    DataGridRow,
    DataGridHeader,
    DataGridBody,
    DataGridCell,
    DataGridFoot,
  } from '@twilio-paste/core/data-grid';
  import {
    Flex,
    Text,
    Card,
    Stack,
    Label,
    Input,
    HelpText,
    Select,
    Paragraph,
    Button,
    Heading
  } from "@twilio-paste/core";
  import {Box} from '@twilio-paste/core/box';
import {ConversationMessage} from '../../types';
import {ArrowForwardIcon} from '@twilio-paste/icons/esm/ArrowForwardIcon';
import moment from 'moment';

  interface Props {
    conversationMessages: ConversationMessage[]
  }

const SearchResults = ({conversationMessages}:Props) => {
 
//From Subject-Body trimmer timestamp buttons
  useEffect(() => {
  }, []);

  return (
<div style={{marginTop:"20px",overflow:"auto",scrollBehavior:"smooth",height:"calc(100vh - 300px)"}}>
    
        <Stack orientation="vertical" spacing="space60" >

        {
            conversationMessages.map(cm=>(

                <Card key={`message-search-result-${cm._id}`} padding="space30">

<Flex>

<Flex grow shrink  basis="1px" paddingRight="space20">
<Stack orientation="vertical" spacing="space30" >
<Text as="p" fontSize="fontSize40" fontWeight="fontWeightBold">{cm.contact || cm.author}</Text>
<Text as="p" fontSize="fontSize30"  fontWeight="fontWeightNormal">{cm.subject}</Text>
<Text as="p" fontSize="fontSize20" color="colorTextWeak" fontWeight="fontWeightLight" wordWrap="break-word" wordBreak="break-all">{cm.body.substr(0,300)}</Text>
</Stack>
</Flex>

<Flex width="100px" minWidth="100px">
<Stack orientation="vertical" spacing="space10">
<Text as="p" fontSize="fontSize10" fontWeight="fontWeightSemibold" overflow="hidden">{moment(cm.creationDate).format('MM/DD/YYYY HH:mm')}</Text>
<Button variant="secondary" size="small" onClick={() => {}}>
  <ArrowForwardIcon decorative={true} />
  View
</Button>
</Stack>
</Flex>

</Flex>

    
  </Card>
            
            
          
            ))
        }

  

</Stack>
 
    
   
  </div>

      
  );
};

export default SearchResults;
