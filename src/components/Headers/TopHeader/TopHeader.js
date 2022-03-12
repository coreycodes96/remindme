import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTopHeader from './useTopHeader';

const TopHeader = () => {
    const {
        logout,
    } = useTopHeader();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>remindme.</Text>

            <Pressable onPress={() => logout()}>
                <Ionicons name="power" size={20} color='red' />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        paddingHorizontal: 15,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: '600',
        color: '#111111'
    },
});

export default TopHeader;