import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

//--------------------------------- HomeScreen------------------------------------------//
import Home from '@screens/HomeScreen/Home';
import PaperByWriter from '@screens/HomeScreen/PaperByWriter';
//--------------------------------- HomeScreen------------------------------------------//

//--------------------------------- MoreScreen------------------------------------------//
import {CategoryTree} from '@screens/MoreScreen/CategoryTree';
//--------------------------------- MoreScreen------------------------------------------//

//--------------------------------- AccountScreen------------------------------------------//
import Login from '@screens/AccountScreen/Login';
import AccountDetail from '@screens/AccountScreen/AccountDetail';
import {UserDetail} from '@screens/AccountScreen/Authen/UserDetail';
//--------------------------------- AccountScreen------------------------------------------//

//--------------------------------- PaperScreen------------------------------------------//
import PaperHome from '@screens/PaperScreen/PaperHome';
import WebInApp from '@screens/PaperScreen/WebInApp';
import PaperList from '@screens/PaperScreen/PaperList';
import PaperListFunc from '@screens/PaperScreen/PaperListFunc';
import PaperDetail from '@screens/PaperScreen/PaperDetail';
import PaperDetailFirebase from '@screens/PaperScreen/PaperDetailFirebase';
import PaperCategory from '@screens/PaperScreen/PaperCategory';
import PaperCategoryFirebase from '@screens/PaperScreen/PaperCategoryFirebase';
import PaperListFirebase from '@screens/PaperScreen/PaperListFirebase';
import Search from '@screens/HomeScreen/Search';
//--------------------------------- PaperScreen------------------------------------------//

//--------------------------------- CodeScreen------------------------------------------//
import Code from '@screens/CodeScreen/Code';
import NotificationRegister from '@screens/CodeScreen/NotificationRegister';
//--------------------------------- CodeScreen------------------------------------------//

const globalScreen = [
  {
    name: 'PaperDetail',
    component: PaperDetail,
    options: {
      headerShown: true,
      headerTitleAlign: 'center',
      headerTitle: 'Nội dung chi tiết',
      headerBackTitleVisible: false,
    },
  },
  {
    name: 'PaperDetailFirebase',
    component: PaperDetailFirebase,
    options: ({route, navigation}) => {
      return {
        headerShown: true,
        headerTitle: 'Nội dung chi tiết',
        headerTitleAlign: 'center',
        headerTitleStyle: {marginLeft: 100},
        headerLeft: () => (
          <FontAwesome5Icon
            name={'chevron-left'}
            size={22}
            color="black"
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      };
    },
  },
  {
    name: 'PaperCategory',
    component: PaperCategory,
    options: {headerShown: true},
  },
  {
    name: 'PaperCategoryFirebase',
    component: PaperCategoryFirebase,
    options: {headerShown: true},
  },
  {
    name: 'PaperByWriter',
    component: PaperByWriter,
    options: {headerShown: true},
  },
  {
    name: 'Search',
    component: Search,
    options: {headerShown: true},
  },
];

export const screens = {
  homeTab: [
    {
      name: 'Home',
      component: Home,
      options: {headerShown: false},
    },
    ...globalScreen,
  ],
  moreTab: [
    {
      name: 'CategoryTree',
      component: CategoryTree,
      options: {headerShown: false},
    },
    ...globalScreen,
  ],
  accountTab: [
    {
      name: 'AccountDetail',
      component: AccountDetail,
      options: {headerShown: false},
    },
    {
      name: 'Login',
      component: Login,
      options: {headerShown: true},
    },
    {
      name: 'UserDetail',
      component: UserDetail,
      options: {headerShown: true},
    },
  ],
  paperTab: [
    {
      name: 'PaperHome',
      component: PaperHome,
      options: {headerShown: false},
    },
    {
      name: 'PaperList',
      component: PaperList,
      options: {headerShown: false},
    },
    {
      name: 'PaperListFunc',
      component: PaperListFunc,
      options: {headerShown: false},
    },
    {
      name: 'PaperListFirebase',
      component: PaperListFirebase,
      options: {headerShown: false},
    },
    {
      name: 'WebInApp',
      component: WebInApp,
      options: {headerShown: true},
    },
    ...globalScreen,
  ],
  codeTab: [
    {
      name: 'Code',
      component: Code,
      options: {headerShown: false},
    },
    {
      name: 'NotificationRegister',
      component: NotificationRegister,
      options: {headerShown: true},
    },
    ...globalScreen,
  ],
};
