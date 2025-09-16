import React, { useEffect, useState, useMemo } from 'react';
import {
    Label,
    Input,
    Button,
    Heading,
    Stack,
    Checkbox,
    Flex
} from "@twilio-paste/core";
import { MessagingCanvas } from '@twilio/flex-ui';
import { DatePicker, formatReturnDate } from '@twilio-paste/core/date-picker';
import { Radio, RadioGroup } from '@twilio-paste/core/radio-group';
import { ShowIcon } from "@twilio-paste/icons/esm/ShowIcon";
import { CloseIcon } from "@twilio-paste/icons/esm/CloseIcon";
import { ChevronRightIcon } from "@twilio-paste/icons/esm/ChevronRightIcon";

import { Spinner } from "@twilio-paste/core";

import QueueSelector from "./QueueSelector/QueueSelector";
import AgentList from './AgentSelection/AgentList';
import ProgressTracker from './ProgressTracker/ProgressTracker';
import ConversationErrorBoundary from "./ConversationErrorBoundary";


import * as St from "./SearchModalStyles";

import MessageSearchUtil from '../../utils/MessageSearchUtil';

interface Props {
    isOpen: boolean;
    toggleModal: () => void;
}

const SearchModal = ({ isOpen, toggleModal }: Props) => {

    if (!isOpen) {
        return null;
    }

    const [searchLoading, setSearchLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [previewConversation, setPreviewConversation] = useState<any | null>(null);
    const [showAssignmentPanel, setShowAssignmentPanel] = useState<boolean>(false);
    const [selectedWorkerForAssignment, setSelectedWorkerForAssignment] = useState<any | null>(null);

    useEffect(() => {
        if (searchResults != null) {
            setSelectedRows([]);
        }
    }, [searchResults]);
    // Handles the selection of all rows
    const handleSelectAll = (event: any) => {
        if (event.target.checked) {
            const allRowIds = searchResults.map((message) => message.conversationSid);
            setSelectedRows(allRowIds);
        } else {
            setSelectedRows([]);
        }
    };

    // Handles the selection of a single row
    const handleSelectRow = (event: any, id: string) => {
        if (event.target.checked) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        }
    };

    // Check if all rows are selected
    const allRowsSelected = selectedRows.length === searchResults.length && searchResults.length > 0;


    const [showLiveTasks, setShowLiveTasks] = React.useState(true);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [externalContactInput, setExternalContactInput] = useState("");
    const [customerContactInput, setCustomerContactInput] = useState("");
    const [subjectInput, setSubjectInput] = useState("");
    const [bodyInput, setBodyInput] = useState("");
    const [selectedQueues, setSelectedQueues] = React.useState<string[]>([]);

    const taskTimeFrame = useMemo(
        () => {
            return (showLiveTasks) ? "active" : "date-range";

        },
        [showLiveTasks]
    );



    const [bulkOperations,setBulkOperations] = useState<any[] | null>(null);


    const openAssignTaskPanel = () => {
        setShowAssignmentPanel(true);
    }

    const closeAssignTaskPanel = () => {
        setShowAssignmentPanel(false);
    }


    const selfAssignTasks= ()=>{

        let newBulkOperations:any[] = [
            {
                title:"Operation 1",
                asyncFunction:async ()=>{
                    
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            resolve("resolved");
                          }, 8000);
                        });
                      
                }
            },
            {
                title:"Operation 2",
                asyncFunction:async ()=>{
                    
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            resolve("resolved");
                          }, 15000);
                        });
                      
                }
            },
        ];
        
        


        setBulkOperations(newBulkOperations);
    }





    // const {data:taskList,loading,error} = useTaskQuery();


    const executeSearch = async () => {

        const searchPayoad = {
            startDate,
            endDate,
            externalContactInput,
            customerContactInput,
            subjectInput,
            bodyInput,
            showLiveTasks,
            selectedQueues
        }

        console.error(searchPayoad);

        if (showLiveTasks) {
            setSearchLoading(true);
            const taskResults = await MessageSearchUtil.searchActiveTasks(searchPayoad);
            setSearchResults(taskResults);
            setSearchLoading(false);
        }
        else{
            const taskResults = await MessageSearchUtil.querySearchIndex(searchPayoad);
            
        }

    }

    const clearForm = () => {
        setStartDate("");
        setEndDate("");
        setExternalContactInput("");
        setCustomerContactInput("");
        setSubjectInput("");
        setBodyInput("");
        setShowLiveTasks(true);
        setSelectedQueues([]);
    }

    return (

        <St.ModalOverlay className="modal-overlay" onClick={() => toggleModal()}>
            <St.ModalContainer onClick={(e) => e.stopPropagation()}>
                <St.ModalCloseBtn className="modal-close-button" onClick={() => toggleModal()}>
                    &times;
                </St.ModalCloseBtn>
                <div>
                    <Stack orientation="horizontal" spacing="space60">
                        <div style={{ marginRight: "3rem" }}>
                            <Heading as="h3" variant="heading30">
                                Conversation Search
                            </Heading>
                        </div>

                        <RadioGroup
                            name="taskTimeframe"
                            value={taskTimeFrame}
                            legend={""}
                            onChange={newValue => {
                                setShowLiveTasks(newValue === "active");
                            }}
                            orientation="horizontal"
                        >
                            <Radio
                                value="active"
                                name="taskTimeframe"
                            >
                                Active Tasks
                            </Radio>
                            <Radio
                                value="date-range"
                                name="taskTimeframe"
                            >
                                Date Range
                            </Radio>
                        </RadioGroup>
                        {
                            !showLiveTasks &&
                            <Stack orientation="horizontal" spacing="space30" >


                                <DatePicker id={"search-email-fromDate"} onChange={(evt) => setStartDate(evt.target.value)} />

                                <p> to </p>
                                <DatePicker id={"search-email-toDate"} onChange={(evt) => setEndDate(evt.target.value)} min={startDate} />

                            </Stack>
                        }

                    </Stack>

                    <div className="search-conversation-wrap">
                        <St.SearchConversationTable>

                            <tbody>
                                <tr>
                                    <td>
                                        <Label htmlFor={"search-email-taskqueues"}>Task Queues:</Label>
                                        <QueueSelector value={selectedQueues}
                                            setSelectedValues={(newSelection: string[]) => setSelectedQueues(newSelection)}
                                        />
                                    </td>
                                    <td >
                                        <Label htmlFor={"search-email-subject"}>Subject:</Label>
                                        <Input
                                            type="text"
                                            id="search-message-subject"
                                            name="search-message-subject"
                                            placeholder="Subject"
                                            value={subjectInput}
                                            onChange={e => setSubjectInput(e.target.value)}
                                        />
                                    </td>
                                    <td >
                                        <Label htmlFor={"search-email-body"}>Body:</Label>
                                        <Input
                                            type="text"
                                            id="search-message-body"
                                            name="search-message-body"
                                            placeholder="Body"
                                            value={bodyInput}
                                            onChange={e => setBodyInput(e.target.value)}
                                        />
                                    </td>
                                    <td >
                                        <Label htmlFor={"search-email-from"}>External Contact:</Label>
                                        <Input
                                            type="text"
                                            id="search-message-from"
                                            name="search-message-from"
                                            placeholder="From"
                                            value={externalContactInput}
                                            onChange={e => setExternalContactInput(e.target.value)}
                                        />
                                    </td>
                                    <td >

                                        <Label htmlFor={"search-email-to"}>Customer Contact:</Label>
                                        <Input
                                            type="text"
                                            id="search-message-to"
                                            name="search-message-to"
                                            placeholder="To"
                                            value={customerContactInput}
                                            onChange={e => setCustomerContactInput(e.target.value)}
                                        />
                                    </td>
                                    <td className="btn">
                                        <Button variant="primary" onClick={executeSearch} >Search</Button>
                                    </td>
                                    <td className="btn">
                                        <Button variant="secondary" onClick={clearForm}>Reset</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </St.SearchConversationTable>
                        {<div>
                            {
                                searchLoading &&
                                <Flex hAlignContent="center" vertical padding="space60" width="100%">
                                    <Spinner size="sizeIcon110" decorative={false} title="Loading" />
                                </Flex>
                            }
                            {
                                searchResults && searchResults.length > 0 &&
                                <St.SearchResultsContainer>
                                    <Button variant="secondary" size="small" onClick={() => selfAssignTasks()} disabled={selectedRows.length === 0} >Assign{(selectedRows.length > 0) ? ` ${selectedRows.length}` : ""} to Self</Button>
                                    <Button variant="secondary" size="small" onClick={() => openAssignTaskPanel()} disabled={selectedRows.length === 0} >Assign{(selectedRows.length > 0) ? ` ${selectedRows.length}` : ""} to Others  <ChevronRightIcon decorative={false} size="sizeIcon40" title="close" /></Button>
                                    <St.SearchResultsWrap>
                                        <St.SearchResultsTableWrapper>
                                            <St.SearchResultsTable>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <input
                                                                type="checkbox"
                                                                onChange={handleSelectAll}
                                                                checked={allRowsSelected}
                                                            />
                                                        </th>
                                                        <th>Queue</th>
                                                        <th>Channel</th>
                                                        <th>Customer Contact</th>
                                                        <th>External Contact</th>
                                                        <th>Task Status</th>
                                                        <th>Preview</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchResults.map((message, index) => (
                                                        <tr key={message.conversationSid} className={(index % 2 === 0 ? 'even-row ' : 'odd-row ') + ((message.conversationSid == previewConversation?.conversationSid) ? " selected " : "")}>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    onChange={(e) => handleSelectRow(e, message.conversationSid)}
                                                                    checked={selectedRows.includes(message.conversationSid)}
                                                                />
                                                            </td>
                                                            <td>
                                                                {message.taskQueue}
                                                            </td>
                                                            <td>
                                                                {message.taskChannel}
                                                            </td>
                                                            <td>
                                                                {message.customerContact}
                                                            </td>
                                                            <td>
                                                                {message.externalContact}
                                                            </td>
                                                            <td>
                                                                {message.taskStatus}  {((message.taskStatus == "assigned") ? `to ${message.assignedTo}` : '')}
                                                            </td>
                                                            <td>
                                                                <Button variant="secondary_icon" size="reset" onClick={() => setPreviewConversation({ conversationSid: message.conversationSid, channel: message.taskChannel })}>
                                                                    <ShowIcon decorative={false} size="sizeIcon40" title="show" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </St.SearchResultsTable>
                                        </St.SearchResultsTableWrapper>


                                        {

                                            previewConversation != null &&
                                            <St.MessagingPreviewContainer>
                                                <Heading as="h4" variant="heading40"> Conversation Transcript </Heading>
                                                <St.MessagingPreviewCloseBtnWrap>
                                                    <Button variant="secondary_icon" size="reset" onClick={() => setPreviewConversation(null)}>
                                                        <CloseIcon decorative={false} size="sizeIcon40" title="close" />
                                                    </Button>
                                                </St.MessagingPreviewCloseBtnWrap>
                                                <ConversationErrorBoundary>

                                                    <St.MessagingCanvasWrapper>
                                                        <MessagingCanvas sid={previewConversation.conversationSid} conversationType={"email"} autoInitConversation={true}>
                                                        </MessagingCanvas>

                                                    </St.MessagingCanvasWrapper>
                                                </ConversationErrorBoundary>
                                            </St.MessagingPreviewContainer>
                                        }

                                        {
                                            showAssignmentPanel &&
                                            <St.TaskAssignmentContainer>
                                                <Heading as="h4" variant="heading40"> Agent Selection</Heading>
                                                <St.TaskAssignmentCloseBtnWrap>
                                                    <Button variant="secondary_icon" size="reset" onClick={() => closeAssignTaskPanel()}>
                                                        <CloseIcon decorative={false} size="sizeIcon40" title="close" />
                                                    </Button>
                                                </St.TaskAssignmentCloseBtnWrap>
                                                <St.TaskAssignmentWrapper>
                                                    <AgentList />

                                                </St.TaskAssignmentWrapper>
                                            </St.TaskAssignmentContainer>
                                        }



                                    </St.SearchResultsWrap>
                                </St.SearchResultsContainer>
                            }
                        </div>
                        }
                    </div>
                </div>

                {
                    bulkOperations!=null && 
                    <ProgressTracker asyncOperations={bulkOperations} concurrency={3} clearOperations={()=>{setBulkOperations(null);executeSearch();}} />   
                }

            </St.ModalContainer>
        </St.ModalOverlay>

    )
}

export default SearchModal;