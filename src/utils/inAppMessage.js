import {Linking } from 'react-native';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import Config from '../config/Config';

let scheme = 'exampleapp';
const handleOpenURL = (event) => {
	console.log("===---------=>", "handleOpenURL", event.url);
	if (event.url) {
		redireactUrl(event.url);
	}

	// Linking.openURL(event.url);
	// if (event.url && event.url.indexOf(scheme + '://') === 0) {
	//     crossroads.parse(event.url.slice(scheme.length + 3));clearImmediate
	// 	console.log('<------------');
	// }
}

// https://viblo.asia/p/deep-linking-voi-react-native-GrLZDXGVZk0
// https://reactnative.dev/docs/linking
const redireactUrl = async (_url) => {
	// var myRe = /product_url=[a-z].*/g; // or: (product_url|category_url)=[a-z].*
	var myRe = /(product_url|category_url)=[a-z].*/g;
	var myArray = myRe.exec(_url);
	console.log(myArray);
	if (myArray) {
		let value = myArray[0].replace(/(product_url|category_url)=/g, "");
		let paper_data = await fetch(Config.custom_url()+Config.api_request.parseUrl+Config.buy_params({url: value}));
		let data = await paper_data.json();
		console.log(data);
		Linking.openURL(`myapp://app/PaperDetail/${data.id}`);

	}
};

// Dùng linking lắng nghe khi người dùng clich vào 1 url app link nào đó: ví dụ: url = 'myapp://app/WebInApp/www.topsy-fashion.nl' (không dùng được dạng: http://google.com mà chỉ dùng cho app link schema) .
// Linking.getInitialURL().then(url => handleOpenURL({ url })).catch(console.error);
Linking.addEventListener('url', handleOpenURL);
	// bật tính năng: in-app-messaging trên firebase(thì nó mới gửi in-app-message):   
	// vào: https://console.cloud.google.com/apis/library/firebaseinappmessaging.googleapis.com?project=[project_name]
	// ví dụ:  https://console.cloud.google.com/apis/library/firebaseinappmessaging.googleapis.com?project=react-cli4
    // https://viblo.asia/p/firebase-in-app-messaging-in-android-XL6lA6Xr5ek

// inAppMessage nếu dùng url link thường sẽ mở webview, nên để mở app screen cần dùng dạng linking: myapp://do_something ví dụ: myapp://app/WebInApp/www.topsy-fashion.nl
// https://stackoverflow.com/questions/64891125/rnfirebase-in-app-messaging-how-to-handle-button-clicks