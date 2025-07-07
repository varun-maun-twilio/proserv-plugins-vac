import ApiService from '../../../utils/serverless/ApiService';
import { EncodedParams } from '../../../types/serverless';
import logger from '../../../utils/logger';



class BulkSkillsMapperService extends ApiService {
 
  fetchWorkers = async (queryParams:any): Promise<any> => {


    const queryStr = (new URLSearchParams(queryParams)).toString();

    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(this.manager.user.token),
    };
    try {
      return await this.fetchJsonWithReject<any>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/bulk-skills-mapper/flex/search-workers?${queryStr}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.buildBody(encodedParams),
        },
      );
    } catch (error: any) {
      logger.error('[bulk-skills-mapper] Error fetchWorkers', error);
      throw error;
    }
  };

  
}

export default new BulkSkillsMapperService();
