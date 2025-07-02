import React, { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormActions
} from '@twilio-paste/core/form';
import {
  Flex,
  Card,
  Stack,
  Label,
  Input,
  HelpText,
  Select,
  Option,
  Button,
  Heading,
  MultiselectCombobox
} from "@twilio-paste/core";
import { default as MuiInput } from '@material-ui/core/Input';
import { default as MuiSelect } from '@material-ui/core/Select';
import { default as MuiCheckbox } from '@material-ui/core/Checkbox';
import { default as MuiListItemText } from '@material-ui/core/ListItemText';
import { default as MuiMenuItem } from '@material-ui/core/MenuItem';
import { DatePicker, formatReturnDate } from '@twilio-paste/core/date-picker';
import { FlexHelper } from '../../../../utils/helpers';
import { SearchQuery } from '../../types'
import './style.css'

interface Props {
  onSubmit: (arg0: SearchQuery) => void;
}

const SearchForm = ({ onSubmit }: Props) => {

  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [messageSearchInput, setMessageSearchInput] = useState("");
  const [contactInput, setContactInput] = useState("");

  const [searchQueuesList, setSearchQueuesList] = useState<Array<string>>([]);
  const [allQueuesList, setAllQueuesList] = useState<Array<string>>([]);
  const [queueSelectionInputValue, setQueueSelectionInputValue] = React.useState('');



  useEffect(() => {
    (async () => {
      const queueList = await FlexHelper.getAllQueues() || [];
      setAllQueuesList(queueList);
    })()
  }, []);


  useEffect(() => {
  }, [allQueuesList]);



  const getFilteredQueueNames = (inputValue: string) => {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return allQueuesList.filter(function filterItems(item) {
      return item.toLowerCase().includes(lowerCasedInputValue);
    });
  }

  const executeSearch = () => {

    console.error({
      startDate,
      endDate,
      fromInput,
      toInput,
      subjectInput,
      bodyInput
    })

    //onSubmit({ freeText: messageSearchInput, contact: contactInput, queues: selectedQueuesList });
  }

  const clearForm = () => {
    setStartDate("");
    setEndDate("");
    setFromInput("");
    setToInput("");
    setSubjectInput("");
    setBodyInput("");
  }

  return (
    <div style={{width:"100%"}}>

      <table className={"search-email-form-table"} >
        <tbody>
          <tr>
            <td>
              <Label htmlFor={"search-email-fromDate"}>Start date:</Label>
              <DatePicker id={"search-email-fromDate"} onChange={(evt) => setStartDate(evt.target.value)} />
            </td>
            <td>
              <Label htmlFor={"search-email-toDate"}>End date:</Label>
              <DatePicker id={"search-email-toDate"} onChange={(evt) => setEndDate(evt.target.value)} min={startDate} />
            </td>
          </tr>
          <tr>
            <td >
              <Label htmlFor={"search-email-from"}>From:</Label>
              <Input
                type="text"
                id="search-message-from"
                name="search-message-from"
                placeholder="From"
                value={fromInput}
                onChange={e => setFromInput(e.target.value)}
              />
            </td>
          
            <td >

              <Label htmlFor={"search-email-to"}>To:</Label>
              <Input
                type="text"
                id="search-message-to"
                name="search-message-to"
                placeholder="To"
                value={toInput}
                onChange={e => setToInput(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
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
          </tr>
          <tr>
            <td colSpan={2}>
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
          </tr>
          <tr>
            <td colSpan={2}>
              <div className="queue-select-wrapper">
                <Label htmlFor={"search-email-queue"}>Queue:</Label>
                <MuiSelect
                  labelId="search-message-queue"
                  id="search-message-queue"
                  multiple
                  displayEmpty
                  value={searchQueuesList}
                  onChange={(e) => { setSearchQueuesList(e?.target?.value as string[] || []) }}
                  input={<MuiInput />}
                  renderValue={(selected) => {
                    if ((selected as string[]).length == 0) {
                      return <em>Select</em>;
                    }
                    else {
                      return <em>{(selected as string[]).join(',')}</em>
                    }
                  }
                  }
                  style={{ width: "100%", padding: "5px" }}

                >
                  {allQueuesList.map((name) => (
                    <MuiMenuItem value={name}>
                      <MuiCheckbox checked={searchQueuesList.indexOf(name) > -1} />
                      <MuiListItemText primary={name} />
                    </MuiMenuItem>
                  ))}
                </MuiSelect>
              </div>
            </td>
          </tr>
        </tbody>
      </table>


      <Flex width="100%" padding="space10" hAlignContent="right">
        <Stack orientation="horizontal" spacing="space20">
          <Button variant="primary" onClick={executeSearch} >Search</Button>
          <Button variant="secondary" onClick={clearForm}>Cancel</Button>
        </Stack>
      </Flex>

    </div>

  );
};

export default SearchForm;
