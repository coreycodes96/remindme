import { useRef, useEffect, useState, useContext } from 'react';
import { format } from 'date-fns';
import * as StoreSecure from 'expo-secure-store';
import { updateStore } from '../../../helpers/store_secure';
import { api } from '../../../api/config';

const usePost = (navigation, Platform) => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => isMounted.current = false;
    }, [])

    const [input, setInput] = useState({
        body: '',
        time: '',
    })

    const [inputErrors, setInputErrors] = useState({
        body: '',
        time: '',
    })

    const [isLoading, setIsLoading] = useState(false);

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = event.nativeEvent.timestamp || selectedDate;
        const formattedTimeStamp = format(event.nativeEvent.timestamp, "HH:mm");

        if (isMounted.current) setShow(Platform.OS === 'ios');
        if (isMounted.current) setDate(new Date(currentDate));
        if (isMounted.current) setInput({ ...input, time: formattedTimeStamp });
    };

    const showMode = (currentMode) => {
        if (isMounted.current) setShow(true);
        if (isMounted.current) setMode(currentMode);
    };

    const showTimepicker = () => {
        if (isMounted.current) showMode('time');
    };

    const createReminder = () => {
        const errorState = { body: '', time: '' };

        //Body validation
        if (input.body === '') {
            errorState.body = 'Please enter a reminder';
        } else {
            errorState.body = '';
        }

        //Time validation
        if (input.time === '') {
            errorState.time = 'Please enter a time';
        } else {
            errorState.time = '';
        }

        if (isMounted.current) setInputErrors({ ...errorState });

        if (input.body !== '' && input.time !== '') {
            if (isMounted.current) setIsLoading(prev => !prev);

            api().post('/reminder/create', {
                body: input.body,
                time: input.time,
            })
                .then(async res => {
                    const reminderTimes = await StoreSecure.getItemAsync('reminderTimes');

                    const parsedReminderTimes = JSON.parse(reminderTimes);

                    if (isMounted.current) parsedReminderTimes.push({ _id: res.data._id, body: res.data.body, time: res.data.time });

                    if (isMounted.current) await updateStore('reminderTimes', JSON.stringify(parsedReminderTimes));

                    if (isMounted.current) setIsLoading(prev => !prev);

                    if (isMounted.current) setInput({ body: '', time: '' });
                    if (isMounted.current) setInputErrors({ body: '', time: '' });

                    if (isMounted.current) navigation.navigate('Reminders', { reminder: res.data });
                })
                .catch(error => {
                    if (isMounted.current) setIsLoading(prev => !prev);
                    console.log(error);
                })
        }
    }

    return { input, setInput, inputErrors, onChange, showTimepicker, mode, date, isLoading, createReminder, };
}

export default usePost;