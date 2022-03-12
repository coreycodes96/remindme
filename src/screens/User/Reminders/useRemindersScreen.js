import { useRef, useEffect, useContext, useState, useMemo, } from 'react';
import { BottomTabFocusContext } from '../../../contexts/BottomTabFocusContext';
import * as StoreSecure from 'expo-secure-store';
import { createStore } from '../../../helpers/store_secure/index';

const useRemindersScreen = (route) => {
    const isMounted = useRef(false);
    const { setFocus } = useContext(BottomTabFocusContext);

    const [reminders, setReminders] = useState([]);

    const remindersValues = useMemo(() => ({ reminders, setReminders }), [reminders, setReminders]);

    //When the reminder screen has mounted
    useEffect(async () => {
        isMounted.current = true;

        if (isMounted.current) {
            setFocus('Reminders');

            const data = await StoreSecure.getItemAsync('reminderTimes');

            if (data === null) {
                createStore('reminderTimes', JSON.stringify([]));
            }
        }

        return () => isMounted.current = false;
    }, [])

    //When a reminder has been created
    useEffect(() => {
        if (route && route?.params) {
            setReminders([route?.params?.reminder, ...reminders]);
            route.params = {};
        }

        return () => {
            route.params = {};
        }
    }, [route])

    return { remindersValues };
}

export default useRemindersScreen;