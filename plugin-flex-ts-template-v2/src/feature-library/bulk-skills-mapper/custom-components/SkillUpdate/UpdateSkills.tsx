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
import {Checkbox, CheckboxGroup} from '@twilio-paste/core/checkbox';
import { ButtonGroup } from '@twilio-paste/core/button-group';
import { Button } from '@twilio-paste/core/button';
import { CloseIcon } from "@twilio-paste/icons/esm/CloseIcon";
import { BulkSkillsTable, ChipFilter, TextFilter, ListWrapper, ListFooter } from "../BulkSkillsMapperViewStyles";
import useActivityAPI from "../../data-hooks/useActivityAPI";
import BulkSkillsMapperService  from "../../utils/BulkSkillsMapperService";



interface ComponentProps {
    selectedAgents: any[];
    updateSelectedAgents: (selectedValues: any[]) => void;
    selectedSkills: any[];
    updateSelectedSkills: (selectedValues: any[]) => void;
    updateInProgress: (inProgress: boolean) => void;
    inProgress:boolean;
}


const OPERATIONS = ["Add", "Disable", "Delete", "Overwrite"];

const UpdateSkills = ({ selectedAgents,selectedSkills,updateInProgress,inProgress,updateSelectedAgents,updateSelectedSkills }: ComponentProps) => {

    const [selectedOperation, setSelectedOperation] = useState("Add");
    const [progressList, setProgressList] = useState<any[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<string | undefined>();
    const [selectedActivitySid, setSelectedActivitySid] = useState<string | undefined>();
    const [checkedForActivityUpdate, setCheckedForActivityUpdate] = useState(false);
    const {
        data: allActivityObjs,
    } = useActivityAPI({}, 50);

    const allActivities = useMemo(
        () => {
            return allActivityObjs.map((q: any) => {return {label:q?.friendly_name,value:q?.sid}});
        },
        [allActivityObjs]
    );

    
    const updateSummary =  useMemo(
        () => {
            return {
                total: progressList?.length,
                pending:progressList.filter(x=>x.status=="Queued").length,
                completed:progressList.filter(x=>x.status=="Success").length,
                failed:progressList.filter(x=>x.status=="Failure").length
            } 
        },
        [progressList]
    );
    
    

    const initiateProcess = async () => {


        const newProgressList = [];
        for (let a of selectedAgents) {
            newProgressList.push({ agent: a, status: "Queued", selectedOperation })
        }
        setProgressList(newProgressList);
        updateInProgress(true);

        for(let a of selectedAgents){
                try{

                     await BulkSkillsMapperService.updateSkills(selectedOperation,a.sid,selectedSkills,(checkedForActivityUpdate?selectedActivitySid:undefined));
                     updateProgressItemStatus(a.sid,"Success");

                }catch(e){
                    updateProgressItemStatus(a.sid,"Failure");
                    console.error(`Error in updating skills of ${a.sid}`);
                }
        }


    }

    const updateProgressItemStatus= (workerSid:string,updateStatus:string)=>{
        setProgressList(prevList=>
            prevList.map(item=>{return ((item.agent.sid===workerSid)?{...item,status:updateStatus}:item)}));
    }


    const reset = ()=>{
        updateInProgress(false)
        updateSelectedAgents([]);
        updateSelectedSkills([]);
    }


    return (

        <div style={{marginBottom:50}}>

            <Heading as="h3" variant="heading30"  >Skills Update</Heading>

{!inProgress &&
            <Box>

<Stack orientation="vertical" spacing="space60">
  <p>Choose Operation</p>
  <Combobox
                    autocomplete
                    items={OPERATIONS}
                    labelText=""
                    selectedItem={selectedOperation}
                    onSelectedItemChange={changes => {
                        setSelectedOperation(changes.selectedItem);
                    }}
                />



<Checkbox
      value="agent_activity_update"
      name="agent_activity_update"
      checked={checkedForActivityUpdate}
      onChange={(event) => {
        setCheckedForActivityUpdate(event.target.checked);
      }}
    >
      Update Agent Activity
    </Checkbox>

    <Combobox disabled={!checkedForActivityUpdate} 
               items={allActivities} 
               labelText="Select Activity"
               optionTemplate={(item) => <div>{item.label}</div>}
                onSelectedItemChange={changes => {
                    setSelectedActivity(changes.selectedItem.label);
                    setSelectedActivitySid(changes.selectedItem.value);
                }}
                selectedItem={selectedActivity}
            />


  <Button variant="primary" onClick={() => initiateProcess()} >Initiate</Button>
</Stack>

                

               

            </Box>
}


            {inProgress && progressList.length > 0 &&

                <BulkSkillsTable>
                    <tbody>

                        <tr>
                            <th>
                            <Heading as="h4" variant="heading40" marginBottom="space0" >Sr No</Heading>
                            </th>
                            <th>

                                <Heading as="h4" variant="heading40" marginBottom="space0" >Agent</Heading>
                            </th>
                            <th>
                                <Heading as="h4" variant="heading40" marginBottom="space0" >Status</Heading>

                            </th>
                        </tr>
                        {
                            progressList.map((p,pIter) => (
                                <tr key={`progress-update-item-${p.agent.sid}`}>
                                    <td>
                                        {pIter+1}
                                    </td>
                                    <td>
                                        {(JSON.parse(p.agent?.attributes).full_name || p.agent.friendly_name)}
                                    </td>
                                    <td>
                                        {p.status}
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </BulkSkillsTable>
            }


{
    inProgress && 
    <Box margin="space40">
        <Stack orientation="horizontal" spacing="space60">
        <p>Pending: {updateSummary?.pending}</p>
        <p>Completed: {updateSummary?.completed}</p>
        <p>Failed: {updateSummary?.failed}</p>

</Stack>
    </Box>
}


{inProgress &&

            <Box margin="space40">
                    <Button variant="secondary" onClick={()=>reset()}>Reset</Button>
            </Box>

}



        </div>

    );
};

export default UpdateSkills;
