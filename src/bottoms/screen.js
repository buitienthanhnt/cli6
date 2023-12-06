import { Platform } from 'react-native';
// import FontAwesome5Icon  from 'react-native-vector-icons/FontAwesome5';

//--------------------------------- HomeScreen------------------------------------------//
import Home from "@screens/HomeScreen/Home";
//--------------------------------- HomeScreen------------------------------------------//

//--------------------------------- MoreScreen------------------------------------------//
// import ColorIcon        from '@screens/MoreScreen/ColorIcon';

// import SwipeListViews   from '@screens/MoreScreen/SwipeListViews';
// import SwiperComponent  from '@screens/MoreScreen/SwiperComponent';
//--------------------------------- MoreScreen------------------------------------------//

//--------------------------------- AccountScreen------------------------------------------//
// import Login          from '../screens/AccountScreen/Login';
// import Wishlist       from '@screens/AccountScreen/Wishlist';
// import FireStore      from '@screens/AccountScreen/components/firebase/FireStore';
// import AccountDetail  from '@screens/AccountScreen/AccountDetail';
// import { UserDetail } from '@screens/AccountScreen/Authen/UserDetail';
// import { Test, CloudFun, DataBase } from '@screens/AccountScreen/Test';
// import ExFirebase     from '@screens/AccountScreen/components/firebase';
// import ListData       from '@screens/AccountScreen/components/firebase/ListData';
//--------------------------------- AccountScreen------------------------------------------//

//--------------------------------- PaperScreen------------------------------------------//
// import Paper             from '@screens/PaperScreen/Paper';
// import Detail            from '@screens/PaperScreen/Detail';
// import { Sdetail }       from '@screens/PaperScreen/Sdetail';
// import WebInApp          from '@screens/PaperScreen/WebInApp';
import PaperList         from '@screens/PaperScreen/PaperList';
import PaperDetail       from '@screens/PaperScreen/PaperDetail';
// import PaperListCategory from '@screens/PaperScreen/PaperListCategory';
//--------------------------------- PaperScreen------------------------------------------//

//--------------------------------- CodeScreen------------------------------------------//
// import Code                 from "../screens/CodeScreen/Code";
// import Dark                 from "@screens/CodeScreen/Dark";
// import Animate1             from "@screens/CodeScreen/Animate1";
// import TestRedux            from "@screens/CodeScreen/components/test/TestRedux";
// import RgbaColor            from "@screens/components/RgbaColor";
// import SoundPlay            from "@screens/CodeScreen/SoundPlay";
// import VideoPlay            from "@screens/CodeScreen/VideoPlay";
// import ScanScreen           from "@screens/CodeScreen/ScanScreen";
// import WebviewApp           from "@screens/components/WebviewApp";
// import FadeInView           from "@screens/CodeScreen/components/animated/FadeInView";
// import ScrollViews          from "@screens/CodeScreen/components/test/ScrollViews";
// import QrGenerator          from "@screens/CodeScreen/QrGenerator";
// import PanResponders        from "@screens/CodeScreen/components/animated/PanResponders";
// import NotificationRegister from "@screens/CodeScreen/NotificationRegister";
// import SwipeBtn             from "@screens/CodeScreen/components/animated/SwipeBtn";
// import TabViewExample       from "@screens/CodeScreen/components/animated/TabViewExample";
// import DemoUseCallBack      from "@screens/CodeScreen/components/test/DemoUseCallBack";
// import DemoMemo             from "@screens/CodeScreen/components/test/DemoMemo";
// import DemouseReduce        from "@screens/CodeScreen/components/test/DemouseReduce";
// import FlatInScroll         from "@screens/CodeScreen/components/FlatInScroll";
// import ExVirtualizedlist    from "@screens/CodeScreen/components/ExVirtualizedlist";
// import ExForm               from "@screens/CodeScreen/components/ExForm";
// import ExSvg                from '@screens/CodeScreen/components/ExSvg';
// import ExUploadImg          from '@screens/CodeScreen/components/ExUploadImg';
// import ExAnimated           from '@screens/CodeScreen/components/animated';
// import { ExAnimated1, ExAnimated2, ExAnimated3, ExAnimated4, ExAnimated5 } from '@screens/CodeScreen/components/animated/ExAnimated1';
// import Demopromies          from '@screens/CodeScreen/components/test/Demopromies';
// import DemoTest             from '@screens/CodeScreen/components/test';
//--------------------------------- CodeScreen------------------------------------------//

export const screens = {
    homeTab: [
        {
            name: "Home",
            component: Home,
            options: {headerShown: false}
        }
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
            options: {headerShown: false}
        },
    ],
    moreTab: [],
    accountTab: [],
    codeTab:[],
  
}
