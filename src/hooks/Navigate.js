import { createNavigationContainerRef } from '@react-navigation/native';
import { Linking } from 'react-native';

export const navigationRef = createNavigationContainerRef();

// https://reactnavigation.org/docs/navigating-without-navigation-prop/
export function Navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// redirect with Linking
export const LinkingNavigate = (homeScreen = '', options = {})=>{
	Linking.openURL(`myapp://app/${homeScreen}`);
}