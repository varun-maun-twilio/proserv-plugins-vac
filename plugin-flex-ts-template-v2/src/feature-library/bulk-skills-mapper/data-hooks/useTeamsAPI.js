import { useState, useEffect, useCallback } from 'react';
import * as Flex from '@twilio/flex-ui';

const fetchEndpoint = ()=>{
    return  `https://switchboard.cx-tools.vacasa.io/flex/fetch-worker-attributes`;
}



const useTeamsAPI = ( initialParams = {}, itemsPerPage = 50) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [queryParams, setQueryParams] = useState(initialParams);

  const fetchData = useCallback(async () => {
    
   
    setLoading(true);
    setError(null);

    try {
        const endPoint = fetchEndpoint();
      const url = new URL(endPoint);
  

      const response = await fetch(url.toString(),{
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'X-FLEX-JWE': Flex.Manager.getInstance().user.token,
         }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const {agentGroups} = await response.json();

     

      setData(agentGroups || []);
      




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

export default useTeamsAPI;