/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  AppState,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { navigationRef } from '@hooks/Navigate'; // để di chuyển qua các màn hình
import { check, request, requestNotifications, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Reactotron from 'reactotron-react-native' // adb reverse tcp:9090 tcp:9090 (chạy lênh này nếu dùng qua android hay máy ảo android để kíck hoạt reactotron)

if(__DEV__) { // adb reverse tcp:9090 tcp:9090
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

// https://viblo.asia/p/webpack-5-babel-plugin-module-resolver-djeZ1EN8ZWz tạo Alias trong webpack
// https://viblo.asia/p/webpack-5-webpack-resolve-alias-extensions-naQZRL4Q5vx
// https://nguyenvanphuoc.com/bai-viet/cau-hinh-path-alias-voi-react-typescript-craco

// import Icon from 'react-native-vector-icons/FontAwesome';  // npm install react-native-vector-icons --save && thêm: apply from: "../../node_modules/react-native-vector-icons/fonts.gradle" vào: android/app/build.gradle
// import Icon from 'react-native-vector-icons/Ionicons';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '@bottoms/Bottom';
import { requestUserPermission } from '@utils/notificationHelper';
import linking from './linking';
import { QueryClient, QueryClientProvider } from 'react-query'  // dùng cho getdata api
import { Provider } from 'react-redux'; // npm install react-redux --save :tạo cầu nối giữa redux vào react
import AppStore from '@redux/AppStore';
import remoteConfig from '@react-native-firebase/remote-config';
import PaperDetail from '@screens/PaperScreen/PaperDetail';
import PaperDetailFirebase from '@screens/PaperScreen/PaperDetailFirebase';
const queryClient = new QueryClient()

const Stack = createNativeStackNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const HomeDemo = ()=>{
  return(
    <View>
      <Text>HomeDemo...</Text>
    </View>
  )
}

function App(): JSX.Element {

  const [token, setToken] = useState("");
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // check app state status: active, background
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
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
      default_image: 'https://firebasestorage.googleapis.com/v0/b/newpaper-25148.appspot.com/o/demo%2FgBYNm4ke2I.png?alt=media&token=24057320-9c26-46cc-b1be-711c7296cc6b',
    });

    check('android.permission.POST_NOTIFICATIONS').then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          // console.log('This feature is not available (on this device / in this context)');
          request('android.permission.POST_NOTIFICATIONS').then((result) => { })
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
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    const token = await AsyncStorage.getItem("fcmToken");
    console.log("token in app: ", token);
    if (token) {
      setToken(token);
    }
  };
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={AppStore}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        {/* linking dùng cho chuyển màn với schema hoặc Linking; ref dùng cho chuyển màn với hook(điều hướng ngoài component)  */}
        <NavigationContainer linking={linking} fallback={<WaitLoading></WaitLoading>} ref={navigationRef}>
          <SafeAreaView>
            <StatusBar backgroundColor="#61dafb" animated={true} networkActivityIndicatorVisible={true} />
          </SafeAreaView>
          <Stack.Navigator>
            <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name="HomeDemo" component={HomeDemo} />
            <Stack.Screen name="PaperDetail" component={PaperDetail} />
            <Stack.Screen name="PaperDetailFirebase" component={PaperDetailFirebase} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}

const WaitLoading = ()=>{
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={require("@assets/Ripple-1s-200px.gif")} style={{ width: 60, height: 60 }}></Image>
    </View>
  )
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
