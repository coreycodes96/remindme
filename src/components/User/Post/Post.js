import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import usePost from './usePost';
import { Ionicons } from '@expo/vector-icons';

const Post = ({ navigation }) => {
    const {
        input,
        setInput,
        inputErrors,
        onChange,
        showTimepicker,
        mode,
        date,
        isLoading,
        createReminder,
    } = usePost(navigation, Platform);
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled={true} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* Title */}
                    <Text style={styles.title}>post.</Text>
                    <>
                        {/* Post Input */}
                        <View style={styles.inputContainer}>
                            {/* Body */}
                            <View style={{ width: '100%' }}>
                                <TextInput
                                    value={input.username}
                                    style={styles.input}
                                    placeholder='Reminder...'
                                    placeholderTextColor={'#FFFFFF'}
                                    selectionColor='#FFFFFF'
                                    onChangeText={text => setInput({ ...input, body: text })}
                                    autoCorrect={false} />
                                <Text style={styles.inputErrors}>
                                    {inputErrors.body ? (
                                        <>
                                            <Ionicons name="alert-circle-outline" size={18} />
                                            {inputErrors.body}
                                        </>
                                    ) : null}
                                </Text>
                            </View>

                            {/* Time */}
                            <View style={{ width: '100%' }}>
                                <Text>Select Reminder Time: {input.time}</Text>
                                <DateTimePicker
                                    style={styles.input}
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={event => onChange(event, date)}
                                />
                                <Text style={styles.inputErrors}>
                                    {inputErrors.time ? (
                                        <>
                                            <Ionicons name="alert-circle-outline" size={18} />
                                            {inputErrors.time}
                                        </>
                                    ) : null}
                                </Text>
                            </View>
                        </View>

                        {/* Button */}
                        <View>
                            <Pressable
                                onPress={() => createReminder()}
                                disabled={isLoading}
                                style={styles.button}>
                                {!isLoading ? <Text style={styles.buttonText}>Create Reminder</Text> : <ActivityIndicator color='#FFFFFF' size='small' />}
                            </Pressable>
                        </View>
                    </>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    title: {
        marginTop: 100,
        marginLeft: 15,
        fontSize: 30,
        color: '#111111',
    },
    inputContainer: {
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
        height: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 50,
        backgroundColor: '#581845',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    }
});

export default Post;