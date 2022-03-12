import { useRef, useEffect, useState, useContext } from 'react';
import { api } from '../../../api/config';
import { UserContext } from '../../../contexts/UserContext';
import { createStore } from '../../../helpers/store_secure';
import useCreatePushToken from '../../../helpers/hooks/useCreatePushToken';

const useLoginScreen = () => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;


        return () => isMounted.current = false;
    }, [])

    const [input, setInput] = useState({
        username: '',
        password: '',
    })

    const [inputErrors, setInputErrors] = useState({
        username: '',
        password: '',
    })

    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useContext(UserContext);

    const { registerPushNotificationsToken } = useCreatePushToken();

    const login = async () => {
        const errorState = { username: '', password: '' };

        //Username validation
        if (input.username === '') {
            errorState.username = 'Please enter your username.';
        } else {
            errorState.username = '';
        }

        //Password validation
        if (input.password === '') {
            errorState.password = 'Please enter your password.';
        } else {
            errorState.password = '';
        }

        if (isMounted.current) setInputErrors({ ...errorState });

        if (inputErrors.username === '' && inputErrors.password === '') {
            //Push notification token
            const token = await registerPushNotificationsToken();

            if (isMounted.current) setIsLoading(prev => !prev);

            api().post('/user/login', {
                username: input.username,
                password: input.password,
            })
                .then(res => {
                    if (isMounted.current) setIsLoading(prev => !prev);
                    if (isMounted.current) setInput({ username: '', password: '' });
                    if (isMounted.current) setInputErrors({ username: '', password: '' });

                    if (isMounted.current) createStore('user', JSON.stringify({ ...res.data, token }));
                    if (isMounted.current) setUser({ ...res.data });
                })
                .catch(error => {
                    if (isMounted.current) setIsLoading(prev => !prev);
                    console.log(error.response);
                })
        }
    }

    return { input, setInput, inputErrors, isLoading, login };
}

export default useLoginScreen;