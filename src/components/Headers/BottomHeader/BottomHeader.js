import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useBottomHeader from './useBottomHeader';

const BottomHeader = ({ navigation }) => {
    const {
        focus,
        handleFocus,
    } = useBottomHeader();

    return (
        <View style={styles.container}>
            {/* Reminders */}
            <Pressable onPress={() => { navigation.navigate('Reminders'), handleFocus('Reminders') }}>
                <Ionicons name="apps-outline" size={24} color={focus === 'Reminders' ? '#863E71' : '#111111'} />
            </Pressable>

            {/* Post */}
            <Pressable onPress={() => { navigation.navigate('Post'), handleFocus('Post') }}>
                <Ionicons name="add-outline" size={34} color={focus === 'Post' ? '#863E71' : '#111111'} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        width: '100%',
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    postButton: {
        top: -20
    },
});

export default BottomHeader;