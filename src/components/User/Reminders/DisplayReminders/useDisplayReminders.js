import { useRef, useEffect, useState, useContext } from 'react';
import { RemindersContext } from '../../../../contexts/RemindersContext';
import { api } from '../../../../api/config';

const useDisplayReminders = () => {
    const isMounted = useRef(false);

    const { reminders, setReminders } = useContext(RemindersContext);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(async () => {
        isMounted.current = true;

        if (isMounted.current) {
            getReminders(abortReminders);
        }

        return () => {
            isMounted.current = false;
            abortReminders.abort();
        };
    }, [])

    //When a request has been aborted
    const abortReminders = new AbortController();

    //Getting all the users reminders
    const getReminders = async (abortReminders) => {
        try {
            if (isMounted.current) setIsLoading(prev => !prev);
            const { data } = await api().get('/reminder/', { signal: abortReminders.signal });

            if (!data) return;

            if (isMounted.current) setIsLoading(prev => !prev);

            if (isMounted.current) setReminders(data);
        } catch (error) {
            if (isMounted.current) setIsLoading(prev => !prev);
            console.log(error);
        }
    }

    //Refreshing the users reminders
    const getRemindersOnRefresh = () => {
        if (isMounted.current) setRefresh(prev => !prev);
        getReminders(abortReminders);
        if (isMounted.current) setRefresh(prev => !prev);
    }

    //Deleting a reminder
    const deleteReminder = id => {
        api().delete(`/reminder/delete/${id}`)
            .then(() => {
                const newReminders = reminders.filter(r => r._id !== id);

                if (isMounted.current) setReminders(newReminders);
            })
            .catch(error => console.log(error));
    }

    return { reminders, isLoading, refresh, getRemindersOnRefresh, deleteReminder };
}

export default useDisplayReminders;