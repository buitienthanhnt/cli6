import { Platform } from 'react-native';
import FontAwesome5Icon  from 'react-native-vector-icons/FontAwesome5';

//--------------------------------- HomeScreen------------------------------------------//
import Home from "@screens/HomeScreen/Home";
//--------------------------------- HomeScreen------------------------------------------//

//--------------------------------- MoreScreen------------------------------------------//
import ColorIcon        from '@screens/MoreScreen/ColorIcon';
import { CategoryTree } from '@screens/MoreScreen/CategoryTree';
import SwipeListViews   from '@screens/MoreScreen/SwipeListViews';
import SwiperComponent  from '@screens/MoreScreen/SwiperComponent';
//--------------------------------- MoreScreen------------------------------------------//

//--------------------------------- AccountScreen------------------------------------------//
import Login          from '@screens/AccountScreen/Login';
import Wishlist       from '@screens/AccountScreen/Wishlist';
import FireStore      from '@screens/AccountScreen/components/firebase/FireStore';
import AccountDetail  from '@screens/AccountScreen/AccountDetail';
import { UserDetail } from '@screens/AccountScreen/Authen/UserDetail';
import { Test, CloudFun, DataBase } from '@screens/AccountScreen/Test';
import ExFirebase     from '@screens/AccountScreen/components/firebase';
import ListData       from '@screens/AccountScreen/components/firebase/ListData';
import FsourceForm    from '@screens/AccountScreen/components/firebase/FsourceForm';
//--------------------------------- AccountScreen------------------------------------------//

//--------------------------------- PaperScreen------------------------------------------//
import Paper             from '@screens/PaperScreen/Paper';
import Detail            from '@screens/PaperScreen/Detail';
import { Sdetail }       from '@screens/PaperScreen/Sdetail';
import WebInApp          from '@screens/PaperScreen/WebInApp';
import PaperList         from '@screens/PaperScreen/PaperList';
import PaperDetail       from '@screens/PaperScreen/PaperDetail';
import PaperListCategory from '@screens/PaperScreen/PaperListCategory';
//--------------------------------- PaperScreen------------------------------------------//

//--------------------------------- CodeScreen------------------------------------------//
import Code                 from "@screens/CodeScreen/Code";
import Dark                 from "@screens/CodeScreen/Dark";
import Animate1             from "@screens/CodeScreen/Animate1";
import TestRedux            from "@screens/CodeScreen/components/test/TestRedux";
import RgbaColor            from "@screens/components/RgbaColor";
import SoundPlay            from "@screens/CodeScreen/SoundPlay";
import VideoPlay            from "@screens/CodeScreen/VideoPlay";
import ScanScreen           from "@screens/CodeScreen/ScanScreen";
import WebviewApp           from "@screens/components/WebviewApp";
import FadeInView           from "@screens/CodeScreen/components/animated/FadeInView";
import ScrollViews          from "@screens/CodeScreen/components/test/ScrollViews";
import QrGenerator          from "@screens/CodeScreen/QrGenerator";
import PanResponders        from "@screens/CodeScreen/components/animated/PanResponders";
import NotificationRegister from "@screens/CodeScreen/NotificationRegister";
import SwipeBtn             from "@screens/CodeScreen/components/animated/SwipeBtn";
import TabViewExample       from "@screens/CodeScreen/components/animated/TabViewExample";
import DemoUseCallBack      from "@screens/CodeScreen/components/test/DemoUseCallBack";
import DemoMemo             from "@screens/CodeScreen/components/test/DemoMemo";
import DemouseReduce        from "@screens/CodeScreen/components/test/DemouseReduce";
import FlatInScroll         from "@screens/CodeScreen/components/FlatInScroll";
import ExVirtualizedlist    from "@screens/CodeScreen/components/ExVirtualizedlist";
import ExForm               from "@screens/CodeScreen/components/ExForm";
import ExSvg                from '@screens/CodeScreen/components/ExSvg';
import ExUploadImg          from '@screens/CodeScreen/components/ExUploadImg';
import ExAnimated           from '@screens/CodeScreen/components/animated';
import { ExAnimated1, ExAnimated2, ExAnimated3, ExAnimated4, ExAnimated5 } from '@screens/CodeScreen/components/animated/ExAnimated1';
import Demopromies          from '@screens/CodeScreen/components/test/Demopromies';
import DemoTest             from '@screens/CodeScreen/components/test';
//--------------------------------- CodeScreen------------------------------------------//

export const screens = {
    homeTab: [
        {
            name: "Home",
            component: Home,
            options: {headerShown: false}
        }
    ],
    moreTab: [
        {
            name: "CategoryTree",
            component: CategoryTree,
            options: {headerShown: false}
        },
        {
            name: "ColorIcon",
            component: ColorIcon,
            options: {headerShown: Platform.OS == 'ios'}
        },
        {
            name: "SwipeListViews",
            component: SwipeListViews,
            options: {headerShown: true}
        },
        {
            name: "SwiperComponent",
            component: SwiperComponent,
            options: {headerShown: true}
        }
    ],
    accountTab: [
        {
            name: "AccountDetail",
            component: AccountDetail,
            options: {headerShown: false}
        },
        {
            name: "Login",
            component: Login,
            options: {headerShown: true}
        },
        {
            name: "Wishlist",
            component: Wishlist,
            options: {headerShown: true}
        },
        {
            name: "FireStore",
            component: FireStore,
            options: {headerShown: true}
        },
        {
            name: "UserDetail",
            component: UserDetail,
            options: {headerShown: true}
        },
        {
            name: "CloudFun",
            component: CloudFun,
            options: {headerShown: true}
        },
        {
            name: "Test",
            component: Test,
            options: {headerShown: true}
        },
        {
            name: "DataBase",
            component: DataBase,
            options: {headerShown: true}
        },
        {
            name: "ExFirebase",
            component: ExFirebase,
            options: {headerShown: true}
        },
        {
            name: "ListData",
            component: ListData,
            options: {headerShown: true}
        },
        {
            name: "FsourceForm",
            component: FsourceForm,
            options: {headerShown: true}
        },
    ],
    paperTab: [
        {
            name: "PaperList",
            component: PaperList,
            options: {headerShown: false}
        },
        {
            name: "PaperDetail",
            component: PaperDetail,
            options: {headerShown: true}
        },
        {
            name: "PaperListCategory",
            component: PaperListCategory,
            options: {headerShown: true}
        },
        {
            name: "Paper",
            component: Paper,
            options: {headerShown: true}
        },
        {
            name: "Detail",
            component: Detail,
            options: {headerShown: true}
        },
        {
            name: "WebInApp",
            component: WebInApp,
            options: {headerShown: true}
        },
        {
            name: "Sdetail",
            component: Sdetail,
            options: { // custom header of page xem: https://reactnavigation.org/docs/header-buttons && https://reactnavigation.org/docs/headers
                headerShown: true,
                title: "Bekijk Winkelvoorraad",
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#939393',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerLeft: () => (
                    <FontAwesome5Icon name={'chevron-left'} size={22} color='#ffffff' onPress={()=>{
                    }} />
                ),
            }
        },
    ],
    codeTab: [
        {
            name: "Code",
            component: Code,
            options: {headerShown: false}
        },
        {
            name: "PanResponders",
            component: PanResponders,
            options: {headerShown: true}
        },
        {
            name: "FadeInView",
            component: FadeInView,
            options: {headerShown: true}
        },
        {
            name: "ScrollViews",
            component: ScrollViews,
            options: {headerShown: true}
        },
        {
            name: "Animate1",
            component: Animate1,
            options: {headerShown: true}
        },
        {
            name: "RgbaColor",
            component: RgbaColor,
            options: {headerShown: true}
        },
        {
            name: "ScanScreen",
            component: ScanScreen,
            options: {headerShown: true}
        },
        {
            name: "WebviewApp",
            component: WebviewApp,
            options: {headerShown: true}
        },
        {
            name: "QrGenerator",
            component: QrGenerator,
            options: {headerShown: true}
        },
        {
            name: "SoundPlay",
            component: SoundPlay,
            options: {headerShown: true}
        },
        {
            name: "VideoPlay",
            component: VideoPlay,
            options: {headerShown: true}
        },
        {
            name: "Dark",
            component: Dark,
            options: {headerShown: true}
        },
        {
            name: "TestRedux",
            component: TestRedux,
            options: {headerShown: true}
        },
        {
            name: "NotificationRegister",
            component: NotificationRegister,
            options: {headerShown: true}
        },
        {
            name: "SwipeBtn",
            component: SwipeBtn,
            options: {headerShown: true}
        },
        {
            name: "TabViewExample",
            component: TabViewExample,
            options: {headerShown: true}
        },
        {
            name: "DemoUseCallBack",
            component: DemoUseCallBack,
            options: {headerShown: true}
        },
        {
            name: "DemoMemo",
            component: DemoMemo,
            options: {headerShown: true}
        },
        {
            name: "DemouseReduce",
            component: DemouseReduce,
            options: {headerShown: true}
        },
        {
            name: "FlatInScroll",
            component: FlatInScroll,
            options: {headerShown: true}
        },
        {
            name: "ExVirtualizedlist",
            component: ExVirtualizedlist,
            options: {headerShown: true}
        },
        {
            name: "ExForm",
            component: ExForm,
            options: {headerShown: true}
         },
         {
            name: "ExSvg",
            component: ExSvg,
            options: {headerShown: true}
         },
         {
            name: "ExUploadImg",
            component: ExUploadImg, 
            options: {headerShown: true}
         },
         {
            name: "ExAnimated",
            component: ExAnimated,
            options: {headerShown: true}
         },
         {
            name: "ExAnimated1",
            component: ExAnimated1,
            options: {headerShown: true}
         },
         {
            name: "ExAnimated2",
            component: ExAnimated2,
            options: {headerShown: true}
         },
         {
            name: "ExAnimated3",
            component: ExAnimated3,
            options: {headerShown: true}
         },
         {
            name: "ExAnimated4",
            component: ExAnimated4,
            options: {headerShown: true}
         },
         {
            name: "ExAnimated5",
            component: ExAnimated5,
            options: {headerShown: true}
         },
         {
            name: "Demopromies",
            component: Demopromies,
            options: {headerShown: true}
         },
         {
            name: "DemoTest",
            component: DemoTest,
            options: {headerShown: true}
         },
    ]
}
