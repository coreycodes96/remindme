import { useRef, useEffect, useState } from 'react';
import { api } from '../../../api/config';

const useCreateAnAccountScreen = (navigation) => {
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

    const createAnAccount = () => {
        const errorState = { username: '', password: '' };

        //Username validation
        if (input.username === '') {
            errorState.username = 'Please enter your username.';
        } else if (input.username.length < 3) {
            errorState.username = 'Your username cannot be less than 3 characters.';
        } else {
            errorState.username = '';
        }

        //Password validation
        if (input.password === '') {
            errorState.password = 'Please enter your password.';
        } else if (input.password.length < 8) {
            errorState.password = 'Your password cannot be less than 8 characters';
        } else {
            errorState.password = '';
        }

        if (isMounted.current) setInputErrors({ ...errorState });

        if (inputErrors.username === '' && inputErrors.password === '') {
            if (isMounted.current) setIsLoading(prev => !prev);

            api().post('/user/create_an_account', {
                username: input.username,
                password: input.password,
            })
                .then(() => {
                    if (isMounted.current) setIsLoading(prev => !prev);
                    if (isMounted.current) setInput({ username: '', password: '' });
                    if (isMounted.current) setInputErrors({ username: '', password: '' });

                    navigation.navigate('Login');
                })
                .catch(error => {
                    if (isMounted.current) setIsLoading(prev => !prev);
                    console.log(error.response);
                })
        }
    }

    return { input, setInput, inputErrors, isLoading, createAnAccount };
}

export default useCreateAnAccountScreen;