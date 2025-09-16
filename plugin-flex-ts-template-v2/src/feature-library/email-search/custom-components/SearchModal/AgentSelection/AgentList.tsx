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
import {  TextFilter, ListWrapper } from "./AgentListStyles";




import useWorkerAPI from "../../../data-hooks/useWorkerAPI";


interface ComponentProps {
   
}




const AgentList = (props: ComponentProps) => {

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
                <span className="subtitle">{worker.activity_name}</span>
                <div className="list-action-btn">
                    <Button variant="primary" size="small"
                        onClick={() => {
                           // setSelectedAgents(prevAgents => [...prevAgents, worker])
                        }}
                      >
                        Assign
                    </Button>
                </div>

            </li>
            )
        } catch (e) {
            return null;
        }
    }



    const visibleAvailableWorkers = useMemo(
        () => {
            return ((workerSearchText != "") ?
                workers?.filter((w: any) => {
                    return (JSON.parse(w?.attributes).full_name || w.friendly_name).toUpperCase().indexOf(workerSearchText.toUpperCase()) > -1
                })
                : workers)
        },
        [workerSearchText, workers]
    );


    return (

        <>
            
                            <div >

                                <TextFilter>
                                    <Input type="text"
                                        insertBefore={<SearchIcon decorative={false} size="sizeIcon20" title="Search" />}
                                        placeholder="Search"
                                        onChange={(e) => { setWorkerSearchText(e.target.value) }}
                                        value={workerSearchText} />
                                </TextFilter>
                                <p>&nbsp;</p>
                                <br />
                                <br />
                                </div>
                                
                      

                            <ListWrapper >

                                <ul>
                                    {
                                        visibleAvailableWorkers.map(w => row(w))
                                    }

                                </ul>


                            </ListWrapper>
                           
                       











        </>

    );
};

export default AgentList;
