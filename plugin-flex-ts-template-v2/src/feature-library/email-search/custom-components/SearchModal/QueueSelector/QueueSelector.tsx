import React, { useState,useMemo,useRef,useEffect } from 'react';
import {    Label } from "@twilio-paste/core";
import './QueueSelector.css';

import useQueueAPI from "../../../data-hooks/useQueueAPI";

interface Props {
  value: string[];
  setSelectedValues: (agr0:string[]) => void;
}

const QueueSelector = ({value=[],setSelectedValues}:Props) => {

  const componentRef = useRef<HTMLDivElement>(null); 

  const [selectedItems, setSelectedItems] = useState(value);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  
    useEffect(()=>{
      if(value!=null){
        setSelectedItems(value);
      }
    },[value])


   useEffect(() => {
    const handleClickOutside = (event : MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);


  const { data: allQueuesObjs } = useQueueAPI({}, 100);
  const allQueues = useMemo(() => {return allQueuesObjs.map((q:any) => q?.friendly_name);},[allQueuesObjs]);


  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prevSelected) => {
       let newSelected = [];
      if (prevSelected.includes(item)) {
        newSelected = prevSelected.filter((selected) => selected !== item);
      } else {
        newSelected = [...prevSelected, item];
      }
      setSelectedValues(newSelected);
      return newSelected;
    });
  };

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const getDisplayValue = () => {
    if (selectedItems.length === 0) {
      return 'Select Queues...';
    } else if (selectedItems.length <= 3) {
      return selectedItems.join(', ');
    } else {
      return `${selectedItems.length} selected`;
    }
  };

  return (
    <div className="multiple-select-container" ref={componentRef}>
      <div className="multiple-select-box" onClick={togglePopover}>
        {getDisplayValue()}
      </div>
      {isPopoverOpen && (
        <div className="multiple-select-popover">
          {allQueues.map((item) => (
            <div key={item} className="multiple-select-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
                {item}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueueSelector;