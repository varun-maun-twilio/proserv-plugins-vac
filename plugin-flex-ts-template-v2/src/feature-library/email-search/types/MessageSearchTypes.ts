export interface MessageListItem {
    _id: string;
    conversationSid?: string;
    body?: string;
    subject?: string;
    from?: string;
    to?: string;
    cc?: string;
    creationDate: string;
    htmlMediaSid?: string;
    hasActiveTask?: string;
    activeTaskSid?: string;
    assignedToAgentSid?: string
    assignedToQueue?: string;
  }
  
  export interface MessageListSearchForm {
    from?:string;
    to?:string;
    queues?:string;
    subject?:string;
    body?:string;
    hasActiveTask?:string;
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
  

  
  export interface AssignTaskRequest{
    taskList: string;
    targetWorkerEmail:string;
  }