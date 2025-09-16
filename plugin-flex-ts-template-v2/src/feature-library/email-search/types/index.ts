export interface SearchQuery {
    dateFrom: string;
    dateTo: string;
    externalContact:string,
    customerContact:string,
    channel: string;
    body: string;
    subject: string;
    taskQueues?: string[];
  }


  export interface ConversationMessage {
    channel:string;
    direction:string;
    externalContact:string;
    customerContact:string;
    cc:string;
    taskQueue:string;
    body:string;
    subject:string;
    hasAttachments:boolean;
    conversationSid:string;
    messageSid: string;
    taskSid: string;
    dateCreated: string;
  }


  export interface SearchMessagesResponse {
    messages: ConversationMessage[]
  }


  export interface AssignTaskRequest{
    conversationList: string;
    targetWorkerEmail:string;
  }
