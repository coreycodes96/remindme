import { View, Text, Pressable, StyleSheet } from 'react-native';
import TopHeader from '../../../components/Headers/TopHeader/TopHeader';
import BottomHeader from '../../../components/Headers/BottomHeader/BottomHeader';
import useRemindersScreen from './useRemindersScreen';
import DisplayReminders from '../../../components/User/Reminders/DisplayReminders/DisplayReminders';
import { RemindersContext } from '../../../contexts/RemindersContext';

const RemindersScreen = ({ navigation, route }) => {
    const {
        remindersValues,
    } = useRemindersScreen(route);

    return (
        <>
            <TopHeader />

            <RemindersContext.Provider value={remindersValues}>
                <DisplayReminders />
            </RemindersContext.Provider>

            <BottomHeader navigation={navigation} />
        </>
    )
}

export default RemindersScreen;