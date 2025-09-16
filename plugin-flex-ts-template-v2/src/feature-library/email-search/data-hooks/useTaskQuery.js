import { Manager } from "@twilio/flex-ui";
import { useState, useEffect, useCallback } from 'react';

import { TasksInstantQuery } from '../../../utils/index-query/InstantQueryHelper';

export default function useTaskQuery(initialParams = {}, itemsPerPage = 50) {


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [queryParams, setQueryParams] = useState(initialParams);

    const fetchData = useCallback(async () => {

        try {
            setLoading(true);
            setError(null);

            const tasksMap = await TasksInstantQuery(
                `data.channel_type != 'voice' AND data.status IN ["pending", "reserved","assigned"]`,
            );
            let taskItems = Object.keys(tasksMap).map(taskSid => tasksMap[taskSid]);
            console.error(taskItems);
            setData(prevData => {
                // If it's the first page, replace data. Otherwise, append.
                return [...prevData, ...taskItems];
            });

        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [queryParams, itemsPerPage]); 

    // Effect to fetch data when page or queryParams change
    useEffect(() => {
        fetchData();
    }, [fetchData]);


    // Function to refresh the data (e.g., after a search parameter changes)
    const refreshData = useCallback((newParams = {}) => {
        setData([]);
        setPage(1);
        setNextPageToken(null);
        setQueryParams(prevParams => ({ ...prevParams, ...newParams }));
    }, []);

    return {
        data,
        loading,
        error,
        refreshData,
        queryParams,
        setQueryParams, // Allow external components to update query parameters
    };

}