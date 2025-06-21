import { Manager } from "@twilio/flex-ui";
import { useEffect, useState } from "react"
import {TaskListItem} from "../../types/QueueStatsTaskList";

let  _queuesLiveQueryMap = new Map();
export default function useFetchTasks(prefix:string){

   
    const [data,setData] = useState<TaskListItem[]>([])
    const [error,setError] = useState<Error>();
    const [loading,setLoading] = useState(false)

    useEffect(() => {

        

        (
            async function(){
                try{
                    setLoading(true);

                    console.error("Loading new data for "+prefix);
                    

                    if(prefix!=null ){
                        Manager.getInstance()
                                    .insightsClient
                                    .liveQuery("tr-task", `data.queue_name CONTAINS "${prefix}" `)//AND data.status IN ["pending", "reserved","assigned"] 
                                    .then((q) => {
                                        _queuesLiveQueryMap.set(prefix,q);
                                        let queryItems  = q.getItems();
                                        let taskItems = (Object.keys(queryItems).map(taskSid => queryItems[taskSid])) as TaskListItem[];
                                        setData(taskItems);
                                  

                                    q.on('itemRemoved', (item) => {
                                        const removedTaskSid = item.key;
                                        let newTaskItems = data.filter(d=>d.task_sid!=removedTaskSid);
                                        setData([...newTaskItems]);
                                    });
                                    q.on('itemUpdated', (item) => {
                                        const updatedTaskSid = item.key;
                                        const updatedTaskObj = item.value;
                                        let newTaskItems = data.map(d=>(d.task_sid!=updatedTaskSid)?d:updatedTaskObj);
                                        setData([...newTaskItems]);
                                    });
                                    })
                                    .catch(function (e) {
                                    console.error('Error when subscribing to live updates on task search', e);
                                    });
                    }

                    
                }catch(err:any){
                    setError(err);
                }finally{
                    setLoading(false)
                }
            }


        )();

   return ()=>{
        console.error("Unmounting with the live query",_queuesLiveQueryMap.get(prefix));
        if( _queuesLiveQueryMap.get(prefix)!=null){
            console.error("Unmounding");
            _queuesLiveQueryMap.get(prefix).removeAllListeners();
            _queuesLiveQueryMap.get(prefix).close();
            _queuesLiveQueryMap.set(prefix,undefined);
        }
    }

    }, [prefix])

    return { data, error, loading }

}