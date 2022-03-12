import { View, Text, Pressable, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>remindme.</Text>

            {/* Description */}
            <Text style={styles.description}>remind yourself of when you have to make a payment</Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                {/* Create An Account Button */}
                <Pressable
                    onPress={() => navigation.navigate('CreateAnAccount')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Create An Account</Text>
                </Pressable>

                {/* Login Button */}
                <Pressable
                    onPress={() => navigation.navigate('Login')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#581845',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 70,
    },
    description: {
        marginTop: 7,
        width: '55%',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 90,
    },
    button: {
        marginVertical: 15,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#111111',
        textAlign: 'center',
    }
});

export default HomeScreen;