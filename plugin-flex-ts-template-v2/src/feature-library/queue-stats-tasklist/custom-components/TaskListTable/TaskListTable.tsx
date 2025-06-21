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
import TaskListGrid from "./TaskListGrid";

interface Props {
 
}



const TaskListTable = ({  }: Props) => {


  const queuesTab  = useSelector((state: AppState) => state[reduxNamespace].queueStatsTab.selectedTab);
  const {data:taskList,loading,error} = useFetchTasks(queuesTab);

  useEffect(()=>{

  },[queuesTab])


  useEffect(()=>{

  },[taskList])




  return (
    <>
    <br />
     <Heading as="h3" variant="heading30">
     Current Interactions Waiting {queuesTab}
  </Heading>
   
     
     <br />


    {loading==false && error==null &&

      <TaskListGrid  taskList={taskList}/>
    }
   
    </>
  );
};

export default TaskListTable;