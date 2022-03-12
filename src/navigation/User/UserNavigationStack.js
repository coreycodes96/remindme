import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RemindersScreen from '../../screens/User/Reminders/RemindersScreen';
import PostScreen from '../../screens/User/Post/PostScreen';

const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        primary: '#FFFFFF',
    },
};

const UserNavigationStack = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ gestureEnabled: false, animation: 'none' }}>
                    {/* Reminders Screen */}
                    <Stack.Screen
                        name="Reminders"
                        component={RemindersScreen}
                        options={{ headerShown: false }}
                        theme={MyTheme} />

                    {/* Post Screen */}
                    <Stack.Screen
                        name="Post"
                        component={PostScreen}
                        options={{ headerShown: false }}
                        theme={MyTheme} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default UserNavigationStack;