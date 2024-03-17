import remoteConfig from '@react-native-firebase/remote-config';

const fetchConfig = async ()=>{
    // dùng: fetchAndActivate để lấy được giá trị config mới nhất không cache.
    // lưu ý là cần dùng cả 2 await fetch(0) và fetchAndActivate()
    // await remoteConfig().fetch(0); 
    // await remoteConfig().fetchAndActivate();
    // console.log('---------->>>', remoteConfig().getAll());
}
fetchConfig();