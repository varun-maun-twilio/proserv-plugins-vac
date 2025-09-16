export interface MessageListSearchForm {
  from?:string;
  to?:string;
  queues?:string;
  subject?:string;
  body?:string;
  hasActiveTask?:string;
}

export interface MessageListItem {
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
  
  
  
  export interface SearchActiveTasksResponse{
    docs:MessageListItem[]
  }
  
  export interface CheckboxCellProps {
    onClick: (checked: boolean) => void;
    id: string;
    checked: boolean;
    label: string;
    indeterminate?: boolean;
  }
  

  
 