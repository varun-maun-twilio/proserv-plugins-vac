import React, { useEffect, useState,useMemo } from 'react';
import * as TwilioFlex from '@twilio/flex-ui';
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
import { ChevronLeftIcon } from "@twilio-paste/icons/esm/ChevronLeftIcon";
import {Modal, ModalBody, ModalFooter, ModalFooterActions, ModalHeader, ModalHeading} from '@twilio-paste/core/modal';
import { Combobox } from '@twilio-paste/core/combobox';
import moment from 'moment';
import { MessagingCanvas } from '@twilio/flex-ui';
import {MessageListItem} from "../../types/MessageSearchTypes"
import {SearchResultsTable,EmailPreviewCard} from "./SearchPanelViewStyles"
import MessageSearchUtil from '../../utils/MessageSearchUtil';
import "./style.css";

import useWorkerAPI from "../../data-hooks/useWorkerAPI";

  interface Props {
    conversationMessages: MessageListItem[],
    navigateToSearchForm: ()=>void
  }

const SearchResults = ({conversationMessages,navigateToSearchForm}:Props) => {
 
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  const [isConversationModalOpen,setIsConversationModalOpen] = useState<boolean>(false);
  const [modalConversation,setModalConversation] = useState<string | null>();
  const [isWorkerAssignmentModalOpen,setIsWorkerAssignmentModalOpen] = useState<boolean>(false);

  const {
      data: allWorkerObjs,
  } = useWorkerAPI({}, 50);

  const allWorkers = useMemo(
    () => {
        return allWorkerObjs//.map((q: any) => q?.friendly_name);

    },
    [allWorkerObjs]
);
const [selectedWorker, setSelectedWorker] = useState<any | null>(null);
    

    useEffect(() => {

      if(conversationMessages!=null){
        setSelectedRows([]);
      }

    }, [conversationMessages]);

  useEffect(() => {
  }, [modalConversation,isConversationModalOpen]);


   // Handles the selection of all rows
   const handleSelectAll = (event:any) => {
    if (event.target.checked) {
      const allRowIds = conversationMessages.map((message) => message.conversationSid);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  // Handles the selection of a single row
  const handleSelectRow = (event:any, id:string) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  // Check if all rows are selected
  const allRowsSelected = selectedRows.length === conversationMessages.length && conversationMessages.length > 0;

  const openThreadModal = (conversationSid:string) => {
    setModalConversation(conversationSid);
    setIsConversationModalOpen(true); 
  }

  const onAssignClicked = async ()=>{
   
   
    await MessageSearchUtil.assignTasks({
      targetWorkerEmail:TwilioFlex?.Manager?.getInstance()?.workerClient?.attributes?.email || "",
      conversationList:selectedRows.join(',')
    })
    

  
}

const onAssignToOthersClicked = async ()=>{   
  setIsWorkerAssignmentModalOpen(true);
}

const onAssignToSelectedAgentClicked = async ()=>{
  const selectedWorkerEmail = JSON.parse(selectedWorker?.attributes||'{}')?.email;
  await MessageSearchUtil.assignTasks({
    targetWorkerEmail:selectedWorkerEmail|| "",
    conversationList:selectedRows.join(',')
  });
  setIsWorkerAssignmentModalOpen(false);
  
}


  return (
<div style={{marginTop:"0px",overflow:"auto",scrollBehavior:"smooth",width:"400px",maxWidth:"400px",minWidth:"400px"}}>
    
<div>
<Button variant="link" onClick={()=>navigateToSearchForm()}>  <ChevronLeftIcon decorative={false} title="Back" /> Modify Filters</Button>
</div>   

{conversationMessages?.length==0 &&


  <p style={{"textAlign":"center"}}>No Results Found</p>
  
}

{conversationMessages?.length>0 &&
(<>
<SearchResultsTable>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={allRowsSelected}
              />
            </th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {conversationMessages.map((message, index) => (
            <tr key={message.conversationSid} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectRow(e, message.conversationSid)}
                  checked={selectedRows.includes(message.conversationSid)}
                />
              </td>
              <td>
                <EmailPreviewCard onClick={() => openThreadModal(message.conversationSid)}>
                <p className={"customerContact"}>{message.customerContact}</p>
                  
                  <p> 
                  <span className={"taskQueue"}>{message.taskQueue} | </span>
                    <span className={"externalContact"}>{message.externalContact}</span>
                  </p>
                   
                   <p className={"emailSubject"}>{message.subject?.substring(0,30)}</p>
                  
                   <p className={"emailDate"}>{moment(message.dateCreated).format('MM/DD/YYYY HH:mm')}</p>
                   </EmailPreviewCard>
              </td>
              
  
             
            </tr>
          ))}
        </tbody>
      </SearchResultsTable>


<div style={{marginTop:"20px",marginLeft:"20px"}}>

<Stack orientation="horizontal" spacing="space60">
    <Button variant="primary" size="small" onClick={()=>{onAssignClicked()}}>
                            Self Assign
                            </Button>
    <Button variant="secondary" size="small" onClick={()=>{onAssignToOthersClicked()}}>
                            Assign To Others
                            </Button>
  
</Stack>


                           
</div>
</>
)}

 
<Modal className="full-screen-modal" isOpen={isConversationModalOpen} onDismiss={() => { setIsConversationModalOpen(false); } } size="wide"  ariaLabelledby={'hello'}>
        <ModalHeader>
          <ModalHeading as="h3" >
            Email Details
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
            {
                (modalConversation!=null) && (
                    <div className="messaging-canvas-wrapper">
                    <MessagingCanvas key="conversation-messaging-canvas" sid={modalConversation} conversationType="email" autoInitConversation={true}>
               </MessagingCanvas>
               </div>
                )
            }
           
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
            <Button variant="primary" onClick={()=>{setIsConversationModalOpen(false)}}>
              Close
            </Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>

      <Modal className="full-screen-modal" isOpen={isWorkerAssignmentModalOpen} onDismiss={() => { setIsWorkerAssignmentModalOpen(false); } }  size="default"  ariaLabelledby={'worker-assignment-modal'}>
        <ModalHeader>
          <ModalHeading as="h3" >
            Assign Tasks
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
           
        <Combobox items={allWorkers} labelText="Select Agent" 
                                            onSelectedItemChange={changes => {
                                              setSelectedWorker(changes.selectedItem);
                            
                                            }}
                                            itemToString={w=>w.friendly_name}
                                            optionTemplate={(item) => (
                                             <Text as="span">
                                                    {item.friendly_name} 
                                             </Text>                                             
                                            )}

                                            selectedItem={selectedWorker}
                                        />
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
          <Button variant="primary" onClick={()=>{onAssignToSelectedAgentClicked()}}>
              Assign
            </Button>
            <Button variant="secondary" onClick={()=>{setIsWorkerAssignmentModalOpen(false)}}>
              Cancel
            </Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
   
  </div>

      
  );
};

export default SearchResults;
