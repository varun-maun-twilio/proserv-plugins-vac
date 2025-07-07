import { Manager } from '@twilio/flex-ui';
import { useEffect, useState, useRef, useMemo } from 'react';
import { Flex } from '@twilio-paste/core/flex';
import { Heading } from '@twilio-paste/core/heading';
import { Box } from '@twilio-paste/core/box';
import { Stack } from '@twilio-paste/core/stack';
import { Input } from '@twilio-paste/core/input';
import { Label } from '@twilio-paste/core/label';
import { SearchIcon } from "@twilio-paste/icons/esm/SearchIcon";
import { Popover, PopoverContainer, PopoverButton, usePopoverState } from '@twilio-paste/core/popover';
import { Combobox } from '@twilio-paste/core/combobox';

import { ButtonGroup } from '@twilio-paste/core/button-group';
import { Button } from '@twilio-paste/core/button';
import { CloseIcon } from "@twilio-paste/icons/esm/CloseIcon";
import { BulkSkillsTable, ChipFilter, TextFilter, ListWrapper,ListFooter } from "../BulkSkillsMapperViewStyles";




import useWorkerAPI from "./useWorkerAPI";
import useQueueAPI from "./useQueueAPI";

interface ComponentProps {
    updateSelectedAgents: (selectedValues: any[]) => void;
}




const AgentList = (props: ComponentProps) => {

    const [selectedQueue, setSelectedQueue] = useState<string | null>(null);

    const [selectedAgents, setSelectedAgents] = useState<any[]>([]);

    useEffect(()=>{
        props.updateSelectedAgents(selectedAgents);
    },[selectedAgents]);

    const {
        data: allQueues,
    } = useQueueAPI({}, 600);
    const [queueItems, setQueueItems] = useState(allQueues);
    const queuePopover = usePopoverState({ baseId: 'queue-filter-for-agents' });

    const {
        data: workers,
        queryParams: workerFilters,
        refreshData: setWorkerFilters
    } = useWorkerAPI({}, 50);
    const [workerSearchText, setWorkerSearchText] = useState<string>("");


    const row = (worker: any) => {
        try {
            return (<li key={`worker-selection-${worker.sid}`} >

                <span className="title" >{JSON.parse(worker.attributes).full_name || worker.friendly_name}</span>

                <div className="list-action-btn">
                    <Button variant="primary" size="small"
                        onClick={() => {
                            setSelectedAgents(prevAgents => [...prevAgents, worker])
                        }}
                        disabled={(selectedAgents.findIndex(x => x.sid == worker.sid) > -1)}>
                        Add
                    </Button>
                </div>

            </li>
            )
        } catch (e) {
            return null;
        }
    }

    const selectedRow = (worker: any) => {
        try {
            return (
        <li key={`worker-selected-${worker.sid}`} >

            <span className="title" >{JSON.parse(worker.attributes).full_name || worker.friendly_name}</span>

            <div className="list-action-btn">
                <Button variant="destructive" size="small"
                    onClick={() => {
                        setSelectedAgents(prevAgents => prevAgents.filter(w => w.sid != worker.sid))
                    }}
                >
                    Remove
                </Button>
            </div>
            <label >

                <a
                ></a>

            </label>
        </li>
    )} catch (e) {
        return null;
    }
}


    const visibleAvailableWorkers = useMemo(
        () => {
            return ((workerSearchText != "") ?
                workers?.filter((w: any) => {
                    return (JSON.parse(w?.attributes).full_name || w.friendly_name  ).toUpperCase().indexOf(workerSearchText.toUpperCase()) > -1
                })
                : workers)
        },
        [workerSearchText, workers]
    );

   
    const visibleSelectedWorkers = useMemo(
        () => {
            return selectedAgents.sort((a:any,b:any) => {
                const aVal = (JSON.parse(a?.attributes).full_name|| a.friendly_name);
                const bVal = (JSON.parse(b?.attributes).full_name || b.friendly_name);
                return ('' + aVal.toUpperCase()).localeCompare(bVal.toUpperCase())
                
            })
        },
        [selectedAgents]
    );

    const addAllWorkers = ()=>{

        setSelectedAgents(prevAgents => [...prevAgents, ...visibleAvailableWorkers].reduce((acc, current) => {
            const x = acc.find((item:any) => item.sid === current.sid);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []))
    
    }

    const clearAllWorkers = ()=>{
        setSelectedAgents([]);
    }


    return (

        <>

<Heading as="h3" variant="heading30"  >Agent Selection</Heading>
            <BulkSkillsTable>
                <tbody>
                   
                    <tr>
                        <th>

                            <Heading as="h4" variant="heading40" marginBottom="space0" >Available Agents</Heading>
                        </th>
                        <th>
                            <Heading as="h4" variant="heading40" marginBottom="space0" >Selected Agents</Heading>

                        </th>
                    </tr>
                    <tr>
                        <td>
                            <PopoverContainer state={queuePopover} >
                                <div >

                                    <TextFilter>
                                        <Input type="text"
                                            insertBefore={<SearchIcon decorative={false} size="sizeIcon20" title="Search" />}
                                            placeholder="Search"
                                            onChange={(e) => { setWorkerSearchText(e.target.value) }}
                                            value={workerSearchText} />
                                    </TextFilter>
                                    <ChipFilter isSelected={selectedQueue != null}  >
                                        <PopoverButton variant="reset" size="reset">{selectedQueue ? selectedQueue : "Select Queue"}</PopoverButton>
                                        {
                                            selectedQueue &&
                                            (
                                                <Button className="remove-btn" variant="secondary_icon" size="reset" onClick={() => {
                                                    setSelectedQueue(null);
                                                    setWorkerFilters({ ...workerFilters, "TaskQueueName": null });

                                                }}>
                                                    <CloseIcon decorative={false} title="close" />
                                                </Button>
                                            )
                                        }
                                    </ChipFilter>
                                </div>
                                <Popover aria-label="Filter Agents by queue" >

                                    <Combobox items={allQueues} labelText="Select Queue" onInputValueChange={({ inputValue }) => {
                                        if (inputValue !== undefined) {
                                            setQueueItems(allQueues.filter((item: string) => item.toLowerCase().startsWith(inputValue.toLowerCase())));
                                        }
                                    }}
                                        onSelectedItemChange={changes => {
                                            setSelectedQueue(changes.selectedItem);
                                            setWorkerFilters({ ...workerFilters, "TaskQueueName": changes.selectedItem });
                                            queuePopover.hide();
                                        }}

                                        selectedItem={selectedQueue}
                                    />

                                </Popover>
                            </PopoverContainer>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>

                            <ListWrapper >

                                <ul>
                                    {
                                        visibleAvailableWorkers.map(w => row(w))
                                    }

                                </ul>


                            </ListWrapper>
                            <ListFooter>
                                <p>Showing {visibleAvailableWorkers.length} Results</p>
                                <Button variant="link"  onClick={() => addAllWorkers()}>( Add All )</Button>
                            </ListFooter>
                        </td>
                        <td>
                            <ListWrapper >

                                <ul>
                                    {
                                        visibleSelectedWorkers?.map(w => selectedRow(w))
                                    }

                                </ul>
                            </ListWrapper>
                            <ListFooter>
                                <p>Selected {visibleSelectedWorkers.length} Workers</p>
                                <Button variant="destructive_link"  onClick={() => clearAllWorkers()}>( Remove All )</Button>
                            </ListFooter>
                        </td>
                    </tr>
                </tbody>
            </BulkSkillsTable>











        </>

    );
};

export default AgentList;
