import {createNavigationContainerRef} from '@react-navigation/native';
import {Linking} from 'react-native';

export const navigationRef = createNavigationContainerRef();

// Doc: Điều hướng mà không cần hỗ trợ điều hướng
// https://reactnavigation.org/docs/navigating-without-navigation-prop/
export function Navigate(name: string, params: any) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  }
}

export function HideBottom() {
  if (navigationRef.isReady()) {
    console.log(navigationRef.getCurrentRoute());
    // @ts-ignore
    navigationRef?.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
      tabBarVisible: false,
    });
  }
}

// redirect with Linking
export const LinkingNavigate = (homeScreen = '') => {
  Linking.openURL(`myapp://app/${homeScreen}`);
};
