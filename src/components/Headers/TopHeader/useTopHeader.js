import { useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { removeStore } from '../../../helpers/store_secure/index';
import * as StoreSecure from 'expo-secure-store';
import * as Notifications from 'expo-notifications';

const useTopHeader = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        //When a notification has been received
        const addNotificationsubscription = Notifications.addNotificationReceivedListener(notification => {
            return notification;
        });

        //When a user gets a notification in the background
        const receivedNotificationsubscription = Notifications.addNotificationResponseReceivedListener(response => {
            return response;
        });

        return () => {
            Notifications.removeNotificationSubscription(addNotificationsubscription);
            Notifications.removeNotificationSubscription(receivedNotificationsubscription);
        };
    }, []);

    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        getNotifications();

        return () => isMounted.current = false;
    }, [])

    const { setUser } = useContext(UserContext);

    //Setting a reminder for the user
    const getNotifications = async () => {
        const data = await StoreSecure.getItemAsync('reminderTimes');
        const parsedData = JSON.parse(data);

        parsedData.map(async reminder => {
            const hour = +reminder?.time?.split(':')[0];
            const minute = +reminder?.time?.split(':')[1];

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Reminder",
                    body: reminder.body,
                },
                trigger: {
                    hour: hour,
                    minute: minute,
                },
            });
        })
    }

    //Logging the user out
    const logout = async () => {
        if (isMounted.current) await removeStore('user');
        if (isMounted.current) setUser(null);
    }

    return { logout };
}

export default useTopHeader;