/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  AppState,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Linking,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {navigationRef} from '@hooks/Navigate'; // để di chuyển qua các màn hình
import {check, request, RESULTS} from 'react-native-permissions';
import FlashMessage from 'react-native-flash-message';

// adb reverse tcp:9090 tcp:9090 (chạy lênh này nếu dùng qua android hay máy ảo android để kíck hoạt reactotron)
import Reactotron from 'reactotron-react-native';

// react-native-onesignal: lưu ý chỉ chạy trên máy thật(máy ảo sẽ không đăng ký được subrier) // https://documentation.onesignal.com/docs/react-native-sdk-setup
import {LogLevel, OneSignal} from 'react-native-onesignal';
if (__DEV__) {
  // adb reverse tcp:9090 tcp:9090
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

// https://viblo.asia/p/webpack-5-babel-plugin-module-resolver-djeZ1EN8ZWz tạo Alias trong webpack
// https://viblo.asia/p/webpack-5-webpack-resolve-alias-extensions-naQZRL4Q5vx
// https://nguyenvanphuoc.com/bai-viet/cau-hinh-path-alias-voi-react-typescript-craco

// import Icon from 'react-native-vector-icons/FontAwesome';  // npm install react-native-vector-icons --save && thêm: apply from: "../../node_modules/react-native-vector-icons/fonts.gradle" vào: android/app/build.gradle
// import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from '@bottoms/Bottom';
import {requestUserPermission} from '@utils/notificationHelper';
import linking from './linking';
import {QueryClient, QueryClientProvider} from 'react-query'; // dùng cho getdata api
import {Provider} from 'react-redux'; // npm install react-redux --save :tạo cầu nối giữa redux vào react
import AppStore from '@redux/AppStore';
import remoteConfig from '@react-native-firebase/remote-config';
import DeviceInfo from 'react-native-device-info';
import {ExAnimated5} from '@screens/CodeScreen/components/animated/ExAnimated1';
import Login from '@screens/AccountScreen/Login';
import LoadingX from '@screens/CodeScreen/components/animated/LoadingX';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '@config/Config';
import DeConfig from 'react-native-config';
import actionReducerType from '@constants/actionReducer';
import rApi from '@netWork/rApi';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

const initUserData = async () => {
  try {
    // @ts-ignore
    const result = await rApi.callRequest({
      method: 'GET',
      url: Config.api_request.userInfo,
    });

    if (result?.userData) {
      AppStore.dispatch({
        type: actionReducerType.setUser,
        value: result.userData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const initRoot = async (setInit: (value: boolean) => void) => {
  let token = await AsyncStorage.getItem('token');
  let refresh_token = await AsyncStorage.getItem('refresh_token');
  if (refresh_token && token) {
  } else {
    try {
      const {data} = await axios.get(Config.api_request.getToken, {
        baseURL: Config.custom_url(),
        params: {
          api_key: DeConfig.API_KEY || Config.api_key,
        },
      });
      if (data) {
        token = data.token.value;
        refresh_token = data.refresh_token.value;
        await AsyncStorage.setItem('token', token || '');
        await AsyncStorage.setItem('refresh_token', refresh_token || '');
      }
    } catch (e) {}
  }
  AppStore.dispatch({
    type: actionReducerType.setRefreshToken,
    value: refresh_token,
  });
  AppStore.dispatch({
    type: actionReducerType.setToken,
    value: token,
  });
  // @ts-ignore
  rApi.reSetCaxiosAu(token);
  setInit(true);
  initUserData();
};

function App(): JSX.Element {
  const appState = useRef(AppState.currentState);
  const [init, setInit] = useState(false);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    initRoot(setInit);
    // đăng ký cho OneSignal active in rootComponent
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize(DeConfig.ONESIGNAL_APP_ID || '');

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });
  }, []);

  const updateApp = useCallback(() => {
    const url = 'https://google.com';
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
        } else {
          setModalVisible(false);
          // return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  }, []);

  // check app state status: active, background
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        const remoteVersion = remoteConfig()
          .getValue('remote_version')
          .asString();
        const appVersion = DeviceInfo.getVersion();
        if (Number(remoteVersion) < Number(appVersion)) {
          // setModalVisible(true);
        }
      }

      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        /**
          Add code to check for the remote app version.
          Compare it with the local version. If they differ, i.e.,
          (remote version) !== (local version), then you can show a screen,
          with some UI asking for the user to update. (You can probably show
          a button, which on press takes the user directly to the store)
         */
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    Reactotron.log('hello rendering world');
    remoteConfig().setDefaults({
      default_image:
        'https://firebasestorage.googleapis.com/v0/b/newpaper-25148.appspot.com/o/demo%2FgBYNm4ke2I.png?alt=media&token=24057320-9c26-46cc-b1be-711c7296cc6b',
    });

    check('android.permission.POST_NOTIFICATIONS').then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          // console.log('This feature is not available (on this device / in this context)');
          request('android.permission.POST_NOTIFICATIONS').then(result => {
            console.log(result);
          });
          break;
        case RESULTS.DENIED:
        // console.log('The permission has not been requested / is denied but requestable');
        // break;
        case RESULTS.LIMITED:
        // console.log('The permission is limited: some actions are possible');
        // break;
        case RESULTS.GRANTED:
          // console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
        // console.log('The permission is denied and not requestable anymore');
        // break;
        default:
        //
      }
    });
    requestUserPermission();
  }, []);

  if (!init) {
    return <WaitLoading />;
  }

  return (
    <Provider store={AppStore}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        {/* linking dùng cho chuyển màn với schema hoặc Linking; ref dùng cho chuyển màn với hook(điều hướng ngoài component)  */}
        <NavigationContainer
          linking={linking}
          fallback={<WaitLoading />}
          ref={navigationRef}>
          <SafeAreaView>
            <StatusBar
              backgroundColor="#61dafb"
              animated={true}
              networkActivityIndicatorVisible={true}
            />
          </SafeAreaView>
          <Stack.Navigator>
            <Stack.Screen
              name="BottomTabs"
              component={BottomTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ExAnimated5"
              component={ExAnimated5}
              options={{presentation: 'transparentModal', headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false, presentation: 'transparentModal'}}
            />
            <Stack.Screen
              name="LoadingX"
              component={LoadingX}
              options={{
                headerShown: false,
                presentation: 'transparentModal',
                animationTypeForReplace: 'push',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
      <Modal visible={modalVisible} transparent={true}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 300,
              height: 220,
              backgroundColor: 'rgba(111, 148, 176, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <TouchableOpacity
              style={{
                height: 30,
                backgroundColor: 'violet',
                borderRadius: 4,
                justifyContent: 'center',
                padding: 5,
              }}
              onPress={() => {
                updateApp();
              }}>
              <Text>Update app now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlashMessage position="top" style={{zIndex: 999}} />
    </Provider>
  );
}

const WaitLoading = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('@assets/Ripple-1s-200px.gif')}
        style={{width: 60, height: 60}}
      />
    </View>
  );
};

export default App;
