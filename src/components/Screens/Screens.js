import { useState, useEffect, useMemo } from 'react';

import GuestNavigationStack from '../../navigation/Guest/GuestNavigationStack';
import UserNavigationStack from '../../navigation/User/UserNavigationStack';

import * as SecureStore from 'expo-secure-store';

import { UserContext } from '../../contexts/UserContext';
import { BottomTabFocusContext } from '../../contexts/BottomTabFocusContext';

const Screens = () => {
    //User Context
    const [user, setUser] = useState(null);
    const userValues = useMemo(() => ({ user, setUser }), [user, setUser]);
    const [focus, setFocus] = useState(null);
    const focusValues = useMemo(() => ({ focus, setFocus }), [focus, setFocus]);

    useEffect(() => {
        SecureStore.getItemAsync('user')
            .then(res => {
                if (res === null) return;
                const data = JSON.parse(res);
                setUser(data);
            })
    }, []);

    return (
        <UserContext.Provider value={userValues}>
            {user === null ? (
                <GuestNavigationStack />
            ) : (
                <BottomTabFocusContext.Provider value={focusValues}>
                    <UserNavigationStack />
                </BottomTabFocusContext.Provider>
            )}
        </UserContext.Provider>
    );
}

export default Screens;