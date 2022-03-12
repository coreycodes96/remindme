import { useRef, useEffect, useContext } from 'react';
import { BottomTabFocusContext } from '../../../contexts/BottomTabFocusContext';

const useBottomHeader = () => {
    const isMounted = useRef(false);
    const { focus, setFocus } = useContext(BottomTabFocusContext);

    useEffect(() => {
        isMounted.current = true;

        return () => isMounted.current = false;
    }, [])

    //Focus on a certain tab
    const handleFocus = name => {
        setFocus(name);
    }

    return { focus, handleFocus };
}

export default useBottomHeader;