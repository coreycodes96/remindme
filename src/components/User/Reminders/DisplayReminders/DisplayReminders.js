import { View, ScrollView, Text, Pressable, RefreshControl, StyleSheet, ActivityIndicator } from 'react-native';
import useDisplayReminders from './useDisplayReminders';
import * as StoreSecure from 'expo-secure-store';

const DisplayReminders = () => {
    const {
        reminders,
        isLoading,
        refresh,
        getRemindersOnRefresh,
        deleteReminder,
    } = useDisplayReminders();

    return (
        <>
            {!isLoading ? (
                <ScrollView 
                    style={{ marginTop: 150 }} 
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={getRemindersOnRefresh}
                        />
                    } 
                    showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}
                >
                    {reminders.length > 0 ? reminders.map(reminder => {
                        return (
                            <Pressable onLongPress={() => deleteReminder(reminder?._id)} style={styles.reminderContainer} key={reminder?._id}>
                                <Text style={styles.reminderBody}>Your reminder: {reminder?.body}</Text>
                                <Text style={styles.reminderTime}>Time Set: {reminder?.time}</Text>
                            </Pressable>
                        )
                    }) : (
                        <View style={styles.noReminders}>
                            <Text style={styles.noRemindersText}>Sorry you currently do not have any reminders</Text>
                        </View>
                    )}
                </ScrollView>
            ) : (
                <View style={styles.loader}>
                    <ActivityIndicator color={'black'} size={'large'} />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    reminderContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 20,
        padding: 15,
        width: '85%',
        borderRadius: 5,
        backgroundColor: '#581845',
    },
    noReminders: {
        flex: 1,
        width: '100%',
        height: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noRemindersText: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '70%',
        color: '#111111',
        fontSize: 20,
        textAlign: 'center',
    },
    reminderBody: {
        marginBottom: 10,
        fontSize: 18,
        color: '#FFFFFF',
    },
    reminderTime: {
        color: '#FFFFFF',
        fontStyle: 'italic',
    },
    loader: {
        flex: 1,
        width: '100%',
        height: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default DisplayReminders;