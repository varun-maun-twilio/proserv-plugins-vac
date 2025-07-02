//https://conversation-search-adapter-2737-dev.twil.io/searchMessages

import * as Flex from '@twilio/flex-ui';

import {  
    ConversationMessage,
    SearchMessagesRequest,
  SearchMessagesResponse,
} from '../types';
import { EncodedParams } from '../../../types/serverless';
import ApiService from '../../../utils/serverless/ApiService';
import logger from '../../../utils/logger';

class MessageFilterService extends ApiService {
  readonly messageSearchServerlessDomain: string;

  // eslint-disable-next-line no-restricted-syntax
  constructor() {
    super();
    this.messageSearchServerlessDomain = "conversation-search-adapter-2737-dev.twil.io";
  }

  async search(query:SearchMessagesRequest): Promise<ConversationMessage[] | null> {
    try {
      return await this.#search(query);
    } catch (error: any) {
      logger.error('[schedule-manager] Unable to list config', error);
      return null;
    }
  }

  #search = async (query:SearchMessagesRequest): Promise<ConversationMessage[]> => {
    const manager = Flex.Manager.getInstance();

    
    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(manager.user.token),
      freeText:query.freeText,
      contact:query.contact
    };
    
    const response = await this.fetchJsonWithReject<SearchMessagesResponse>(
      `https://${this.messageSearchServerlessDomain}/searchMessages`,
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

}

export default new MessageFilterService();