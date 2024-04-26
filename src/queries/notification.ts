import Config from '@config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {anyAxios} from '@queries/NetWorking';

const registerNotification = async (): Promise<any> => {
  const token = await AsyncStorage.getItem('fcmToken');
  let uniqueId = await DeviceInfo.getUniqueId().then(uniqueId => {
    return uniqueId;
  });
  if (token) {
    let url = Config.custom_url() + Config.api_request.registerFcm;
    const response = await anyAxios(
      url,
      {
        fcmToken: token,
        deviceId: uniqueId,
        active: true,
      },
      'POST',
    );
    return response.data;
  }
  return null;
};

export {registerNotification};
