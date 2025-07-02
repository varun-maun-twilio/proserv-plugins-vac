export interface SearchQuery {
    freeText: string;
    contact: string;
    queues?: string[];
  }

  export interface SearchMessagesRequest {
    freeText: string;
    contact: string;
    queues?: string[];
  }

  export interface ConversationMessage {
    _id: string;
    conversationSid: string;
    channelType:string;
    contact: string;
    queueName: string;
    body: string;
    subject: string;
    author: string;
    creationDate:  string;
    htmlMediaSid?: string;
  }


  export interface SearchMessagesResponse {
    messages: ConversationMessage[]
  }

