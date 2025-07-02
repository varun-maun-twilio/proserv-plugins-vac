import React, { useEffect, useState } from 'react';
import { Button } from '@twilio/flex-ui';

import { Flex } from '@twilio-paste/core/flex';
import { Heading } from '@twilio-paste/core/heading';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import {SearchQuery,ConversationMessage} from '../../types'
import {Spinner } from "@twilio-paste/core";

import MessageSearchUtil from '../../utils/MessageSearchUtil';

export interface OwnProps {
  pageSize: number;
}

const SearchPanel = () => {

    const [searchResults,setSearchResults] = useState<ConversationMessage[]>([]); 
    const [isSearching,setIsSearching] = useState<boolean>(false); 

  useEffect(() => {
  }, []);

  useEffect(() => {
}, [isSearching,searchResults]);


 const filterOutOlderMessages = (searchResults:Array<ConversationMessage>)=>{

    let filteredResults:Array<ConversationMessage> = []; 
  
    for(let message of searchResults){
        const messageIndex = filteredResults.findIndex(r=>r.conversationSid==message.conversationSid);
        if(messageIndex==-1){
            filteredResults.push(message);
        }
        else if( new Date(filteredResults[messageIndex].creationDate).getTime() < new Date(message.creationDate).getTime() ){
            filteredResults.splice(messageIndex,1,message);
        }
    }


     return filteredResults;
 }

  const performSearch =async (query:SearchQuery)=>{  
    setIsSearching(true);
    const searchResults = await MessageSearchUtil.search({...query});
    console.error({searchResults})
    setSearchResults(filterOutOlderMessages(searchResults || []));
    setIsSearching(false);
  }


  return (
    
    <div >
        <Flex vertical   padding="space0">
          <SearchForm  onSubmit={performSearch}  key="search-messages-form-container"/>
          {
                isSearching && (
                <Flex hAlignContent="center" vertical padding="space60" width="100%">
                    <Spinner size="sizeIcon110" decorative={false} title="Loading" />
                </Flex>)
          }
          {
             !isSearching && searchResults.length>0 && (
                 <div style={{width:"100%"}}>
                    <SearchResults conversationMessages={searchResults} key="message-search-results" />
                    <Flex>
                             <Button variant="primary" size="small" onClick={()=>{}}>
                            Self Assign
                            </Button>
                    </Flex>
                    </div>
              )
              
          }
        </Flex>
        </div>
      
  );
};

export default SearchPanel;
