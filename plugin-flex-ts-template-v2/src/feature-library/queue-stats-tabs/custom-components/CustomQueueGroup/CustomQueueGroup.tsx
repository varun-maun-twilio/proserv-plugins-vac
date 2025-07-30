import * as React from "react";
import { useEffect, useState , useMemo} from "react";
import { Box } from "@twilio-paste/core/box";
import {Input} from '@twilio-paste/core/input';
import {Label} from '@twilio-paste/core/label';
import {Button} from '@twilio-paste/core/button';
import {Text} from '@twilio-paste/text';
import { PlusIcon } from "@twilio-paste/icons/esm/PlusIcon";
import {MultiselectCombobox} from '@twilio-paste/core/combobox';
import {Modal, ModalBody, ModalFooter, ModalFooterActions, ModalHeader, ModalHeading} from '@twilio-paste/core/modal';
import {  saveUserConfig} from '../../utils/helpers';
import useQueueAPI from "./useQueueAPI";

interface Props {
  
}




const SampleEmptyState = () => (
  <Box paddingY="space40" paddingX="space50">
    <Text as="span" fontStyle="italic" color="colorTextWeak">
      No results found
    </Text>
  </Box>
);

const CustomQueueGroup = ({ }: Props) => {

  const [isQueueGroupModalOpen, setIsQueueGroupModalOpen] = useState<boolean>(false);
 
  const handleOpen = () => setIsQueueGroupModalOpen(true);
  const handleClose = () => setIsQueueGroupModalOpen(false);


  const {
    data: allQueuesObjs,
} = useQueueAPI({}, 50);


const allQueues = useMemo(
    () => {
        return allQueuesObjs.map((q: any) => q?.friendly_name);

    },
    [allQueuesObjs]
);

function getFilteredItems(inputValue:string) {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return allQueues.filter(function filterItems(item) {
    return item.toLowerCase().includes(lowerCasedInputValue);
  });
}



const [newGroupName, setNewGroupName] = React.useState('');
const [inputValue, setInputValue] = React.useState('');
const [selectedItems, setSelectedItems] = React.useState<any>([]);
const filteredItems = React.useMemo(() => getFilteredItems(inputValue), [inputValue]);

const createGroup = ()=>{
  saveUserConfig("queue_stats_tabs",{myGroups:[ {
    key:newGroupName,
    queueList: selectedItems
}]});
setInputValue("");
setSelectedItems([]);
setIsQueueGroupModalOpen(false);
}


  return (
    <div style={{width:300}}>

<Button variant="primary" style={{marginLeft:30}} onClick={handleOpen}    >
      <PlusIcon decorative />
      New Group
    </Button>
    <Modal  isOpen={isQueueGroupModalOpen} onDismiss={handleClose} size="default"  ariaLabelledby={"queue-group-edit-modal"}>
        <ModalHeader>
          <ModalHeading as="h3" >
            My Queue Group
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
        <div>
        <Label htmlFor="queue_group_name" required>Group Name</Label>
  <Input aria-describedby="" id="queue_group_name" name="queue_group_name" type="text" placeholder="My Group" onChange={(e)=>{setNewGroupName(e.target.value)}} required/>
    </div>
    <div>
        <MultiselectCombobox
      labelText="Choose Queues"
      selectedItemsLabelText=""
     inputValue={inputValue}
     
      items={filteredItems}
      initialSelectedItems={[]}
      emptyState={SampleEmptyState}
      onInputValueChange={({inputValue: newInputValue = ''}) => {
        setInputValue(newInputValue);
      }}
      onSelectedItemsChange={(selectedItems) => {
        setSelectedItems(selectedItems);
        setInputValue("");
      }}
    />
    </div>
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={createGroup}>Create Group</Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default CustomQueueGroup;

