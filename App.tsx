/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { navigationRef } from '@hooks/Navigate'; // để di chuyển qua các màn hình
import { check, request, requestNotifications, PERMISSIONS, RESULTS } from 'react-native-permissions';

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

function App(): JSX.Element {

  const [token, setToken] = useState("");

  useEffect(() => {
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
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>} ref={navigationRef}>
          <SafeAreaView>
            <StatusBar backgroundColor="#61dafb" animated={true} networkActivityIndicatorVisible={true} />
          </SafeAreaView>
          <Stack.Navigator>
            <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
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
