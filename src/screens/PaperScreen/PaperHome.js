import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAxios } from '@hooks/NetWorking';
import useDispatchState from '@hooks/redux/useDispatchState';
import Config from '@config/Config';
import PaperListFirebase from './PaperListFirebase';
import PaperList from './PaperList';
import { Alert } from 'react-native';

const PaperHome = ({navigation}) => {
    const { useFirebase } = useSelector((state) => state.defRe);
    const { actionReducer, updateState } = useDispatchState();

    const checkUseFirebase = async () => {
        try {
            const data = await getAxios(Config.custom_url() + Config.api_request.getInfo);
            if (!data.success) {
                Alert.alert('use firebase data because server not response');
                console.log('use firebase');
                updateState(actionReducer.useFirebase, true)
            }
        } catch (error) {
          Alert.alert('use firebase data because server not response');
            updateState(actionReducer.useFirebase, true)
        }
    }

    useEffect(() => {
        checkUseFirebase()
        return ()=>{}
    }, []);

    if (useFirebase) {
        return <PaperListFirebase navigation={navigation}></PaperListFirebase>
    }
    return <PaperList navigation={navigation}></PaperList>
}

export default PaperHome;