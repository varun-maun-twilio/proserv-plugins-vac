import ApiService from '../../../utils/serverless/ApiService';
import { EncodedParams } from '../../../types/serverless';
import logger from '../../../utils/logger';



class BulkSkillsMapperService extends ApiService {
 
  updateSkills = async (operation:string,workerSid:string,skills:any[],activity:string|undefined): Promise<any> => {
    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(this.manager.user.token),
      operation,
      workerSid,
      activity,
      skills:JSON.stringify(skills)
    };
    try {
      return await this.fetchJsonWithReject<any>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/bulk-skills-mapper/flex/update-worker-skills`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.buildBody(encodedParams),
        },
      );
    } catch (error: any) {
      logger.error('[bulk-skills-mapper] Error updateSkills', error);
      throw error;
    }
  };

  
}

export default new BulkSkillsMapperService();
