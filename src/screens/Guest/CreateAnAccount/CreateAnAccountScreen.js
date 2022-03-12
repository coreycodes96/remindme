import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useCreateAnAccountScreen from './useCreateAccountScreen';

const CreateAnAccountScreen = ({ navigation }) => {
    const {
        input,
        setInput,
        inputErrors,
        isLoading,
        createAnAccount,
    } = useCreateAnAccountScreen(navigation);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled={true} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* Back Button */}
                    <View style={styles.backButton}>
                        <Pressable onPress={() => navigation.navigate('Home')}>
                            <Ionicons style={styles.backButtonText} name="arrow-back-outline" size={24} />
                        </Pressable>
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>create an account.</Text>

                    {/* Inputs */}
                    <View style={styles.inputContainer}>
                        {/* Username */}
                        <View>
                            <TextInput
                                value={input.username}
                                style={styles.input}
                                placeholder='Username...'
                                placeholderTextColor={'#FFFFFF'}
                                selectionColor='#FFFFFF'
                                onChangeText={text => setInput({ ...input, username: text })}
                                autoCorrect={false} />
                            <Text style={styles.inputErrors}>
                                {inputErrors.username ? (
                                    <>
                                        <Ionicons name="alert-circle-outline" size={18} />
                                        {inputErrors.username}
                                    </>
                                ) : null}
                            </Text>
                        </View>

                        {/* Password */}
                        <View>
                            <TextInput
                                value={input.password}
                                style={styles.input}
                                secureTextEntry={true}
                                placeholder='Password...'
                                placeholderTextColor={'#FFFFFF'}
                                selectionColor='#FFFFFF'
                                onChangeText={text => setInput({ ...input, password: text })}
                                autoCorrect={false} />
                            <Text style={styles.inputErrors}>
                                {inputErrors.password ? (
                                    <>
                                        <Ionicons name="alert-circle-outline" size={18} />
                                        {inputErrors.password}
                                    </>
                                ) : null}
                            </Text>
                        </View>

                        {/* Button */}
                        <View>
                            <Pressable
                                onPress={() => createAnAccount()}
                                disabled={isLoading}
                                style={styles.button}>
                                {!isLoading ? <Text style={styles.buttonText}>Create An Account</Text> : <ActivityIndicator color='#FFFFFF' size='small' />}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    backButton: {
        marginTop: 40,
        marginLeft: 5,
        paddingLeft: 5,
        width: '100%',
        height: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    backButtonText: {
        color: '#111111',
    },
    container: {
        flex: 1,
    },
    title: {
        marginTop: 40,
        marginLeft: 15,
        fontSize: 30,
        color: '#111111',
    },
    inputContainer: {
        marginTop: 130,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
        height: '40%',
    },
    input: {
        padding: 10,
        width: '100%',
        height: 50,
        borderRadius: 5,
        backgroundColor: '#581845',
        color: '#FFFFFF',
    },
    inputErrors: {
        marginTop: 5,
        marginBottom: 70,
        color: 'red',
        fontStyle: 'italic',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#581845',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    }
});

export default CreateAnAccountScreen;