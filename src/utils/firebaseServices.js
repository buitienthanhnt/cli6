import remoteConfig from '@react-native-firebase/remote-config';

const fetchConfig = async ()=>{
    await remoteConfig().fetch(0);
    console.log('------------------->>>>>>>>');
    console.log(remoteConfig().getAll());
}

fetchConfig();