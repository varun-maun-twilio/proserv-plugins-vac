import ApiService from '../../../utils/serverless/ApiService';
import { EncodedParams } from '../../../types/serverless';
import logger from '../../../utils/logger';



class WorkerCapacityService extends ApiService {
  updateCapacity = async (workerSid:string): Promise<boolean> => {
    const encodedParams: EncodedParams = {
      workerSid: encodeURIComponent(workerSid),
      Token: encodeURIComponent(this.manager.user.token),
    };
    try {
      return await this.fetchJsonWithReject<any>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/worker-capacity/flex/update-capacity`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.buildBody(encodedParams),
        },
      );
    } catch (error: any) {
      logger.error('[update-capacity] Error updateCapacity', error);
      throw error;
    }
  };
  fetchQueueWorkers = async (queueName:string): Promise<any> => {
    const encodedParams: EncodedParams = {
      queueName: encodeURIComponent(queueName),
      Token: encodeURIComponent(this.manager.user.token),
    };
    try {
      return await this.fetchJsonWithReject<any>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/worker-capacity/flex/fetchQueueWorkers`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.buildBody(encodedParams),
        },
      );
    } catch (error: any) {
      logger.error('[update-capacity] Error updateCapacity', error);
      throw error;
    }
  };

  
}

export default new WorkerCapacityService();
