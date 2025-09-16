
import * as Flex from '@twilio/flex-ui';

import {  
  SearchQuery,
    ConversationMessage,
  SearchMessagesResponse,
  AssignTaskRequest,
} from '../types';
import { EncodedParams } from '../../../types/serverless';
import ApiService from '../../../utils/serverless/ApiService';
import logger from '../../../utils/logger';

import { TasksInstantQuery } from "../../../utils/index-query/InstantQueryHelper";


class MessageFilterService extends ApiService {
  // eslint-disable-next-line no-restricted-syntax
  constructor() {
    super();
   
  }

  async searchActiveTasks(query:any): Promise<any[]>{
    try{

      const tasksMap = await TasksInstantQuery(
        `data.channel_type != 'voice' AND data.status IN ["pending", "reserved","assigned"]`,
    );
    let conversationObjList = Object.keys(tasksMap).map(taskSid => tasksMap[taskSid])
                                        .filter(task=>task.attributes.conversationSid!=null)
                                         .map(task=>{
                                           return {
                                             conversationSid:task.attributes.conversationSid,
                                             taskChannel:task.channel_unique_name,
                                             taskQueue:task.queue_name,
                                             taskSid:task.task_sid,
                                             externalContact:'N/A',
                                             customerContact:'N/A',
                                             subject:'N/A',
                                             body:'N/A',
                                             taskStatus:task.status,
                                             assignedTo:task.worker_name,
                                             assignedToSid:task.worker_sid
                                           }
                                         });
    console.error(conversationObjList);
    return conversationObjList;

    }catch(e:any){
      logger.error('[MessageFilterService] search searchActiveTasks', e);
      return [];
    }
    
  }


  async querySearchIndex(query:any): Promise<any[]|null> {

    let searchQuery = {
      "query": {
        "match_all": {}
      }
    };


    const response = await this.fetchJsonWithReject<SearchMessagesResponse>(
      `http://localhost:9200/twilio_conversation_messages/_search`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${btoa('admin:VM_30Mar1990')}` },
        body: JSON.stringify(searchQuery),
      },
    );

    console.error(response);

    return [];
  }

  async search(query:SearchQuery): Promise<ConversationMessage[] | null> {
    try {
      return await this.#search(query);
    } catch (error: any) {
      logger.error('[schedule-manager] search messages', error);
      return null;
    }
  }




  #search = async (query:SearchQuery): Promise<ConversationMessage[]> => {
    const manager = Flex.Manager.getInstance();

    
    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(manager.user.token),
      dateFrom: query.dateFrom,
      dateTo: query.dateTo,
      externalContact:query.externalContact ,
      customerContact:query.customerContact,
      channel: query.channel,
      body: query.body,
      subject: query.subject,
      taskQueues:query.taskQueues?.join(","),
    };
    
    const response = await this.fetchJsonWithReject<SearchMessagesResponse>(
      `http://localhost:8888/searchMessages`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    );

    return [
      ...response.messages,
    ];
  };

  async assignTasks(req:AssignTaskRequest): Promise<string> {
    try {
      return await this.#assign(req);
    } catch (error: any) {
      logger.error('[schedule-manager] unable to assign conversations', error);
      return "notok";
    }
  }

  #assign = async (req:AssignTaskRequest): Promise<string> => {
    const manager = Flex.Manager.getInstance();

    
    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(manager.user.token),
      conversationList :req.conversationList,
      targetWorkerEmail:req.targetWorkerEmail
    };
    
    await this.fetchJsonWithReject<SearchMessagesResponse>(
      `http://localhost:8888/assignTasks`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.buildBody(encodedParams),
      },
    );

    return "ok"
  };

}

export default new MessageFilterService();