import client,{getAllSyncMapItems} from '../../../utils/sdk-clients/sync/SyncClient';
import logger from '../../../utils/logger';

import { SyncClient, SyncMap, SyncMapItem } from 'twilio-sync';

class DraftUtils {




  // Saving the Sync Map Items
  saveSyncMapItem =  (syncMapName: string,syncMapItemKey: string,syncMapItemData:any): any => {
    return new Promise((resolve) => {
      client.map(syncMapName).then(async (syncMap:SyncMap)=>{


        syncMap.set(syncMapItemKey,syncMapItemData)

        resolve({status:"ok"});

      }).catch((error: any) => {
          logger.error('[draft-management] DraftUtils: saveSyncMapItem: Error calling this function', error);
        });
    });
  };

  fetchSyncMapItem =  (syncMapName: string,syncMapItemKey: string): any => {
    return new Promise((resolve) => {
      client.map(syncMapName).then(async (syncMap:SyncMap)=>{


        const item =  await syncMap.get(syncMapItemKey);

        resolve({status:"ok",item:item.data});

      }).catch((error: any) => {
          logger.error('[draft-management]DraftUtils: fetchSyncMapItem: Error calling this function', error);
        });
    });
  };
  
}

export const draftUtils = new DraftUtils();
