import messaging from "@react-native-firebase/messaging"; // lưu ý cần bật tính năng firebase push notification trên firebase. test in: https://testfcm.com/
import { Linking } from 'react-native';
import notifee, {AndroidStyle, EventType} from '@notifee/react-native'; // https://notifee.app/react-native/docs/installation
import remoteConfig from '@react-native-firebase/remote-config';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import analytics from '@react-native-firebase/analytics';


//---------------------- firebase messaging ----------------------//
// khi có tin nhắn tới khi app chạy nền.
messaging().setBackgroundMessageHandler(async message => {
	// navigation to screen
	console.log('__setBackgroundMessageHandler___', message);
	addListNoti(message);
});

const addListNoti = async (message)=>{
	console.log('addListNoti++++');
	listNoti = [];
	let listNotiData = await AsyncStorage.getItem('listNotifi');
	if (listNotiData) {
		listNoti = JSON.parse(listNotiData);
	}
	listNoti.push(message);
	AsyncStorage.setItem('listNotifi', JSON.stringify(listNoti));
};

// chạy khi có thông báo gửi tới, kể  cả đang trong app(thường dùng cho: Notifee - React Native)
messaging().onMessage((message) => {
	addListNoti(message);
	// setdefault(Một ví dụ về điều này là không có mạng hoặc bạn chưa tìm nạp chúng trong mã của riêng bạn.)
	remoteConfig()
      .setDefaults({
        show_message: true,
      })
      .then((response) => {
        console.log('Default values set.', response);
      });
	  
	const show_message = remoteConfig().getValue('show_message'); // get remote config firebase setting
	if (show_message) {
		console.log(message);
	}
	onDisplayNotification(message); // push notification by: notifee
});

messaging().onNotificationOpenedApp(messaging => {
	// mở app và điều hướng vào screen nào đó
	// {
	// 	"collapseKey": "com.cli4",
	// 	"data": {
	// 		"pid": "123"
	// 	},
	// 	"from": "515691323092",
	// 	"messageId": "0:1696262980305161%d89f2361d89f2361",
	// 	"notification": {
	// 		"android": {
	// 			"imageUrl": "https://cdnstoremedia.com/adt/adn/2017/01/anh2-adx5886b6d7ca7ac.jpg"
	// 		},
	// 		"body": "ooo",
	// 		"title": "ppp"
	// 	},
	// 	"sentTime": 1696262728039,
	// 	"ttl": 2419200
	// }
	console.log(messaging.data.screen, `myapp://app/${messaging.data.screen}`);
	Linking.openURL(`myapp://app/${messaging.data.screen}`);
});
//---------------------- firebase messaging ----------------------//


//---------------------- notifee ----------------------//
// khi có tin nhắn tới app chạy nền
notifee.onBackgroundEvent(async event => {
	// hành động khi mở tin nhắn
	if (event.type == EventType.PRESS) {
		Linking.openURL(`myapp://app/${event.detail.notification.data.screen}`);
	}
});	

// khi có tin nhắn tới trong app
notifee.onForegroundEvent((event)=>{
	// hành động khi mở tin nhắn
	if (event.type == EventType.PRESS) {
		Linking.openURL(`myapp://app/${event.detail.notification.data.screen}`);
	}
});

async function onDisplayNotification(message) {

	// Request permissions (required for iOS)
	// await notifee.requestPermission();

	// Create a channel (required for Android)
	const channelId = await notifee.createChannel({
		id: 'default',
		name: 'Default Channel',
	});

	// Display a notification
	const {data, notification} = message;
	await notifee.displayNotification({
		title: notification.title,
		body: notification.body,
		android: {
			channelId,
			smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
			// https://topdev.vn/blog/cach-tao-icon-tuong-thich-tren-android-bang-android-studio/
			// pressAction is needed if you want the notification to open the app when pressed
			pressAction: {
				id: 'default',
			},
			style: { type: AndroidStyle.BIGPICTURE, picture: notification.android.imageUrl } // hình ảnh trên android
		},
		data: data
	});
}
//---------------------- notifee ----------------------//