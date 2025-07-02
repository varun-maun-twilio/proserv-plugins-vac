import React, { useEffect, useState } from 'react';
import * as TwilioFlex from '@twilio/flex-ui';
import { CheckboxGroup, Checkbox } from "@twilio-paste/core/checkbox";
import { useUIDSeed } from "@twilio-paste/core/uid-library";
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridBody,
  DataGridCell
} from "@twilio-paste/core/data-grid";
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
import {Modal, ModalBody, ModalFooter, ModalFooterActions, ModalHeader, ModalHeading} from '@twilio-paste/core/modal';
import moment from 'moment';
import { MessagingCanvas } from '@twilio/flex-ui';
import {MessageListItem} from "../../types/MessageSearchTypes"
import MessageSearchUtil from '../../utils/MessageSearchUtil';

const TableHeaderData = [
  "Date",
  "Queue",
  "From",
  "To",
  "Subject",
  "Task Exists"
];

const TableBodyDataFields = [
  "creationDate",
  "assignedToQueue",
  "from",
  "to",
  "subject",
  "hasActiveTask"
];
import CheckboxCell from "./CheckboxCell";

import "./style.css";

  interface Props {
    conversationMessages: MessageListItem[]
  }

const SearchResults = ({conversationMessages}:Props) => {
 
  const seed = useUIDSeed();

  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  const allChecked = checkedItems.every(Boolean);
  const indeterminate = checkedItems.some(Boolean) && !allChecked;


  const [modalMessage,setModalMessage] = useState<MessageListItem | null>();
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
    const [modalContent,setModalContent] = useState<string | null>();

    

    useEffect(() => {

      if(conversationMessages!=null){
        setCheckedItems(conversationMessages.map(()=>false));
      }

    }, [conversationMessages]);

  useEffect(() => {
  }, [modalContent,isModalOpen]);


  const loadHTMLBodyContent = async (mediaSid:string,message:MessageListItem)=>{
    console.error({mediaSid});
    setModalContent(mediaSid);
    setModalMessage(message);

    setIsModalOpen(true);

  }

  const onAssignClicked = async ()=>{
    let selectedTasks = [];
    for(let iter=0;iter<conversationMessages.length;iter++){
      if(checkedItems[iter]){
        selectedTasks.push(conversationMessages[iter].activeTaskSid);
      }
    }

    /*
    MessageSearchUtil.assignTasks({
      targetWorkerEmail:TwilioFlex?.Manager?.getInstance()?.workerClient?.attributes?.email || "",
      taskList:selectedTasks.join(',')
    })
    */

  
}

const cloneIntoNewMail = async()=>{

  setIsModalOpen(false);

  TwilioFlex.Actions.invokeAction("StartOutboundEmailTask", {
    destination: "vmaun@twilio.com",
    queueSid: "WQ5f50082569a097416e23427fdd92ec21",
    from: "support@varun-maun.co.in",
    fromName: "support"
  });
}



  return (
<div style={{marginTop:"20px",overflow:"auto",scrollBehavior:"smooth",height:"calc(100vh - 400px)",width:"100%"}}>
    

<Box width="100%">

<CheckboxGroup name="items" legend="">
<DataGrid aria-label="example grid">
  <DataGridHead>
    <DataGridRow>
      <DataGridHeader width="55px">
        <CheckboxCell
          onClick={(checked: boolean) => {
            const newCheckedItems = checkedItems.map(() => checked);
            setCheckedItems(newCheckedItems);
          }}
          id={seed("select-all")}
          checked={allChecked}
          indeterminate={indeterminate}
          label="Select all"
        />
      </DataGridHeader>
      <DataGridHeader>Date</DataGridHeader>
      <DataGridHeader>Queue</DataGridHeader>
      <DataGridHeader>From / To</DataGridHeader>
      <DataGridHeader>Subject</DataGridHeader>
      <DataGridHeader>Has Task?</DataGridHeader>
     
    </DataGridRow>
  </DataGridHead>
  <DataGridBody>
    {conversationMessages.map((row:MessageListItem, rowIndex) => (
      <DataGridRow
        key={`row-${rowIndex}`}
        selected={checkedItems[rowIndex]}
      >
        <DataGridCell>
          <CheckboxCell
            onClick={(checked: boolean) => {
              const newCheckedItems = [...checkedItems];
              newCheckedItems[rowIndex] = checked;
              setCheckedItems(newCheckedItems);
            }}
            id={seed(`row-${rowIndex}-checkbox`)}
            checked={checkedItems[rowIndex]}
            label={`Select row ${rowIndex}`}
          />
        </DataGridCell>
       
          <DataGridCell key={`col-1`}><Button variant="link" onClick={() => {loadHTMLBodyContent(row.conversationSid || "",row)}}>{moment(row.creationDate).format('MM/DD/YYYY HH:mm')}</Button></DataGridCell>
          <DataGridCell key={`col-2`}>{row.assignedToQueue}</DataGridCell>
          <DataGridCell key={`col-3`}>{`${row.from} / ${row.to}`}</DataGridCell>
          <DataGridCell key={`col-4`}>{row.subject}</DataGridCell>
          <DataGridCell key={`col-5`}>{((row.hasActiveTask+"")=='true')?"Y":"N"}</DataGridCell>
      </DataGridRow>
    ))}
  </DataGridBody>
</DataGrid>
</CheckboxGroup>
</Box>
<Flex>
                             <Button variant="primary" size="small" onClick={()=>onAssignClicked()}>
                            Self Assign
                            </Button>
                    </Flex>
 
<Modal className="full-screen-modal" isOpen={isModalOpen} onDismiss={() => { setIsModalOpen(false); } } size="wide"  ariaLabelledby={'hello'}>
        <ModalHeader>
          <ModalHeading as="h3" >
            Email Details
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
            {
                (modalContent!=null) && (
                    <div className="messaging-canvas-wrapper">
                    <MessagingCanvas key="conversation-messaging-canvas" sid={modalContent} conversationType="email" autoInitConversation={true}>
               </MessagingCanvas>
               </div>
                )
            }
           
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
          <Button variant="primary" onClick={()=>{cloneIntoNewMail()}}>
              Send Email
            </Button>
            <Button variant="secondary" onClick={()=>{setIsModalOpen(false)}}>
              Cancel
            </Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
   
  </div>

      
  );
};

export default SearchResults;
