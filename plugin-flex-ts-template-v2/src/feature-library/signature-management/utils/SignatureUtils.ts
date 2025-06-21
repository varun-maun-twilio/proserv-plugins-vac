import client,{getAllSyncMapItems} from '../../../utils/sdk-clients/sync/SyncClient';
import logger from '../../../utils/logger';

import { SyncClient, SyncMap, SyncMapItem } from 'twilio-sync';

class SignatureUtils {


  // Getting the Sync Map Items
  getSyncMap =  (syncMapName: string): any => {
    return new Promise((resolve) => {
      client.map(syncMapName).then(async (syncMap:SyncMap)=>{
const syncMapItems = await getAllSyncMapItems(syncMap); 



        resolve(syncMapItems.map(item=>{return {key:item.key,data:item.data}}));

      }).catch((error: any) => {
          logger.error('[signature-management] Signature Util: getSyncMap: Error calling this function', error);
        });
    });
  };


  // Saving the Sync Map Items
  saveSyncMapItem =  (syncMapName: string,syncMapItemKey: string,syncMapItemData:any): any => {
    return new Promise((resolve) => {
      client.map(syncMapName).then(async (syncMap:SyncMap)=>{


        syncMap.set(syncMapItemKey,syncMapItemData)

        resolve({status:"ok"});

      }).catch((error: any) => {
          logger.error('[signature-management] Signature Util: saveSyncMapItem: Error calling this function', error);
        });
    });
  };

  deleteSyncMapItem =  (syncMapName: string,syncMapItemKey: string): any => {
    return new Promise((resolve) => {
      client.map(syncMapName).then(async (syncMap:SyncMap)=>{


        syncMap.remove(syncMapItemKey);

        resolve({status:"ok"});

      }).catch((error: any) => {
          logger.error('[signature-management] Signature Util: deleteSyncMapItem: Error calling this function', error);
        });
    });
  };
  
}

export const signatureUtils = new SignatureUtils();
