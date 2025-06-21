import { Manager } from "@twilio/flex-ui";
import { useEffect, useState, useRef } from "react"
import {TaskListItem} from "../../types/QueueStatsTaskList";
import { TasksInstantQuery } from '../../../../utils/index-query/InstantQueryHelper';

export default function useFetchTasks(prefix:string){

   
    const [data,setData] = useState<TaskListItem[]>([])
    const [error,setError] = useState<Error>();
    const [loading,setLoading] = useState(false);
   

    const  fetchTasks = async (matchString:string)=>{

        const tasksMap = await TasksInstantQuery(
            `data.queue_name CONTAINS "${prefix}" AND data.status IN ["pending", "reserved"]`,//AND data.status IN ["pending", "reserved","assigned"]
          );
          let taskItems = (Object.keys(tasksMap).map(taskSid => tasksMap[taskSid])) as unknown as TaskListItem[];
          console.error(taskItems);
          setData(taskItems);
    }

    useEffect(()=>{

        fetchTasks(prefix);


    },[prefix])



    return { data, error, loading }

}