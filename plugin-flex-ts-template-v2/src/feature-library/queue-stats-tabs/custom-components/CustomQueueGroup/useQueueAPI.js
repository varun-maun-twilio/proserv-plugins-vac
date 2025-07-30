import { useState, useEffect, useCallback } from 'react';
import * as Flex from '@twilio/flex-ui';
import {getFeatureFlags} from "../../../../utils/configuration";

const fetchEndpoint = ()=>{
    const custom_data = getFeatureFlags() || {};

    // use serverless_functions_domain from ui_attributes, or .env or set as undefined

   let serverlessProtocol = 'https';
    let serverlessDomain = '';

    if (process.env?.FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN)
      serverlessDomain = process.env?.FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN;

    if (custom_data?.serverless_functions_domain) serverlessDomain = custom_data.serverless_functions_domain;

    if (custom_data?.serverless_functions_protocol) serverlessProtocol = custom_data.serverless_functions_protocol;

    if (custom_data?.serverless_functions_port) serverlessDomain += `:${custom_data.serverless_functions_port}`;


    return  `${serverlessProtocol}://${serverlessDomain}/features/bulk-skills-mapper/flex/search-queues`;
}

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

const useQueueAPI = ( initialParams = {}, itemsPerPage = 50) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [queryParams, setQueryParams] = useState(initialParams);

  const fetchData = useCallback(async () => {
    
    if (!nextPageToken && page > 1) return; // Stop fetching if no more pages and not the initial load
    setLoading(true);
    setError(null);

    try {
        const endPoint = fetchEndpoint();
        console.error(endPoint);
      const url = new URL(endPoint);
      // Append query parameters
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          url.searchParams.append(key, value);
        }
      });
      // Append pagination parameters
      
      if(nextPageToken){
        url.searchParams.append('PageToken', nextPageToken); 
      }
      url.searchParams.append('PageSize', itemsPerPage); 

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

      const {meta,task_queues} = await response.json();

      const newItems = task_queues || [];


      setData(prevData => {
        
       // return [...prevData, ...newItems.map(q=>q?.friendly_name)].sort((a,b) => ('' + a.toUpperCase()).localeCompare(b.toUpperCase()));
       return [...prevData, ...newItems].sort((a,b) => ('' + a.friendly_name.toUpperCase()).localeCompare(b.friendly_name.toUpperCase()));
      });

      

      if(meta.next_page_url!=null){
        setNextPageToken((new URLSearchParams(meta.next_page_url)).get("PageToken"));

        
      }
      
      



    } catch (err) {
        console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [ page, queryParams, itemsPerPage, nextPageToken]); // Add hasMore to dependencies

  // Effect to fetch data when page or queryParams change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to load the next page
  const loadNextPage = useCallback(() => {
    if (nextPageToken && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [nextPageToken, loading]);

  // Function to refresh the data (e.g., after a search parameter changes)
  const refreshData = useCallback((newParams = {}) => {
    setData([]); // Clear existing data
    setPage(1); // Reset to the first page
    setHasMore(true); // Assume there's more data to fetch
    setQueryParams(prevParams => ({ ...prevParams, ...newParams }));
  }, []);

  return {
    data,
    loading,
    error,
    loadNextPage,
    refreshData,
    nextPageToken,
    page, // Expose current page for debugging if needed
    setQueryParams, // Allow external components to update query parameters
  };
};

export default useQueueAPI;