import { useState, useEffect, useCallback } from 'react';
import * as Flex from '@twilio/flex-ui';

import {fetchEndpoint} from "./index"

const buildBodyParam = (encodedParams)=>{
    return Object.keys(encodedParams).reduce((result, paramName, idx) => {
      if (encodedParams[paramName] === undefined) {
        return result;
      }
      if (idx > 0) {
        return `${result}&${paramName}=${encodedParams[paramName]}`;
      }
      return `${paramName}=${encodedParams[paramName]}`;
    }, '');
  }

const useSkillGroupsAPI = ( initialParams = {}, itemsPerPage = 50) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const fetchData = useCallback(async () => {
    
   
    setLoading(true);
    setError(null);

    try {
      const endPoint = fetchEndpoint('/features/bulk-skills-mapper/flex/search-skill-groups');

      const url = new URL(endPoint);
     
    
      const encodedParams = {
        Token: encodeURIComponent(Flex.Manager.getInstance().user.token),
      };


      const response = await fetch(url.toString(),{
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: buildBodyParam(encodedParams),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const {skillGroups} = await response.json();

     

      setData(skillGroups);


    } catch (err) {
        console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [ ]); 


  useEffect(() => {
    fetchData();
  }, [fetchData]);





  return {
    data,
    loading,
    error
    
  };
};

export default useSkillGroupsAPI;