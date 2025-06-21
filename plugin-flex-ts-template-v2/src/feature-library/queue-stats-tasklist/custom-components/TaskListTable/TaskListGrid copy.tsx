import * as Flex from '@twilio/flex-ui';
import { Actions,useFlexSelector } from '@twilio/flex-ui';
import {Heading} from '@twilio-paste/core/heading';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridBody,
  DataGridCell,
  DataGridFoot,
} from '@twilio-paste/core/data-grid';
import AppState from '../../../../types/manager/AppState';
import { reduxNamespace } from '../../../../utils/state';
import useFetchTasks from "./useFetchTasks";

interface Props {
  taskList: any[]
}



const TaskListGrid = ({ taskList }: Props) => {







  useEffect(()=>{

  },[taskList])


  return (
    <>
    
     <DataGrid aria-label="User information table" striped >
    <DataGridHead>
      <DataGridRow>
        <DataGridHeader>Channel</DataGridHeader>
        <DataGridHeader>Status</DataGridHeader>
        <DataGridHeader>Queue Name</DataGridHeader>
        <DataGridHeader>Worker</DataGridHeader>
        <DataGridHeader>Task Age</DataGridHeader>
      </DataGridRow>
    </DataGridHead>
    <DataGridBody>

      {
        (taskList!=null) &&
        taskList.map((t,tIter)=>(
          <DataGridRow key={`queuestats-task-row-${tIter}`}>
          <DataGridCell>{t?.channel_unique_name}</DataGridCell>
          <DataGridCell>{t?.status}</DataGridCell>
          <DataGridCell>{t?.queue_name}</DataGridCell>
          <DataGridCell>{t?.worker_name}</DataGridCell>
          <DataGridCell>{t?.age}</DataGridCell>
        </DataGridRow>
        ))
      }

</DataGridBody>
  
  </DataGrid>

   
    </>
  );
};

export default TaskListGrid;