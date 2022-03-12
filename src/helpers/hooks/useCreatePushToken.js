import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const useCreatePushToken = () => {
    const registerPushNotificationsToken = async () => {
        let token = null;

        //Checking device
        if (Device.isDevice) {
            //Getting permissions
            const { status: existingStatus } = await Notifications.getPermissionsAsync();

            //Getting the permission status
            let finalStatus = existingStatus;

            //Checking if the permission has been granted
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
                token = null;
            }

            //If the permission has still not been granted
            if (finalStatus !== 'granted') {
                alert('Please check that you have enabled push notifications');
                token = null;
                return;
            }

            //Set the notification token
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            //If the user isn't using a physical device
            alert('Must use physical device for Push Notifications');
            token = null;
        }

        //Android
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    return { registerPushNotificationsToken };
}

export default useCreatePushToken;