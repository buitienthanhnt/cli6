import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging"; // lưu ý cần bật tính năng firebase push notification trên firebase. test in: https://testfcm.com/
import { Linking } from 'react-native';
import notifee, { AndroidStyle, EventType } from '@notifee/react-native'; // https://notifee.app/react-native/docs/installation
import remoteConfig from '@react-native-firebase/remote-config';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import analytics from '@react-native-firebase/analytics';


//---------------------- firebase messaging ----------------------//
const addListNoti = async (message: FirebaseMessagingTypes.RemoteMessage) => {
	console.log('addListNoti...++++');
	let listNoti: any[] = [];
	const listNotiData: string | null = await AsyncStorage.getItem('listNotifi');
	if (listNotiData) {
		listNoti = JSON.parse(listNotiData);
	}
	if (message.ttl && message.sentTime) {
		listNoti.push(message);
		AsyncStorage.setItem('listNotifi', JSON.stringify(listNoti));
	}
};

// khi có tin nhắn tới khi app chạy nền.
messaging().setBackgroundMessageHandler(async message => {
	// console.log('__BackgroundMessageHandler___', message);
	addListNoti(message); // add message to listNotifi
});

async function onDisplayNotification(message: FirebaseMessagingTypes.RemoteMessage) {
	// Request permissions (required for iOS)
	// await notifee.requestPermission();

	// Create a channel (required for Android)
	const channelId = await notifee.createChannel({
		id: 'default',
		name: 'Default Channel',
	});

	// Display a notification
	const { data, notification } = message;
	if (notification) {
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
				style: { type: AndroidStyle.BIGPICTURE, picture: notification?.android?.imageUrl || 'https://images.viblo.asia/avatar/a5d3b76b-3102-40f8-a42f-d257c385e5d5.jpg' }// hình ảnh trên android
			},
			data: data
		});
	}
}

// chạy khi có thông báo gửi tới, kể  cả đang trong app(thường dùng cho: Notifee - React Native)
messaging().onMessage((message) => {
	addListNoti(message);
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
	console.log(messaging?.data?.screen, `myapp://app/${messaging?.data?.screen}`);
	Linking.openURL(`myapp://app/${messaging?.data?.screen}`);
});
//---------------------- firebase messaging ----------------------//


//---------------------- notifee ----------------------//
// khi có tin nhắn tới app chạy nền
notifee.onBackgroundEvent(async event => {
	// hành động khi mở tin nhắn
	if (event.type == EventType.PRESS) {
		Linking.openURL(`myapp://app/${event?.detail?.notification?.data?.screen}`);
	}
});

// khi có tin nhắn tới trong app
notifee.onForegroundEvent((event) => {
	// hành động khi mở tin nhắn
	if (event.type == EventType.PRESS) {
		Linking.openURL(`myapp://app/${event?.detail?.notification?.data?.screen}`);
	}
});
//---------------------- notifee ----------------------//