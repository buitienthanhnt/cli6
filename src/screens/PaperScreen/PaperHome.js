import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { getAxios } from '@hooks/NetWorking';
import useDispatchState from '@hooks/redux/useDispatchState';
import Config from '@config/Config';
import PaperListFirebase from './PaperListFirebase';
import PaperList from './PaperList';
import { Alert } from 'react-native';

const PaperHome = ({ navigation }) => {
    const { useFirebase } = useSelector((state) => state.defRe);
    const { actionReducer, updateState } = useDispatchState();

    const checkUseFirebase = useCallback(async () => {
        if (Config.useFirebase && __DEV__) {
            updateState(actionReducer.useFirebase, true)
            return;
        }
        try {
            const data = await getAxios(Config.custom_url() + Config.api_request.getInfo);
            if (!data.success) {
                Alert.alert('Server response not value!, use data from firebase');
                updateState(actionReducer.useFirebase, true)
            }
        } catch (error) {
            Alert.alert('Server not active!, use data from firebase');
            updateState(actionReducer.useFirebase, true)
        }
    }, [actionReducer.useFirebase])

    useEffect(() => {
        checkUseFirebase()
        return () => { }
    }, []);

    if (useFirebase) {
        return <PaperListFirebase navigation={navigation}></PaperListFirebase>
    }
    return <PaperList navigation={navigation}></PaperList>
}

export default PaperHome;