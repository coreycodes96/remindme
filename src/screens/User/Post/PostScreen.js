import {
    View,
    StyleSheet,
} from 'react-native';
import TopHeader from '../../../components/Headers/TopHeader/TopHeader';
import BottomHeader from '../../../components/Headers/BottomHeader/BottomHeader';
import Post from '../../../components/User/Post/Post';


const PostScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <TopHeader />

            <Post navigation={navigation} />

            <BottomHeader navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 100,
        marginLeft: 15,
        fontSize: 30,
        color: '#111111',
    },
    inputContainer: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
        height: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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

export default PostScreen;