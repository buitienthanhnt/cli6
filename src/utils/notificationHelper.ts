
import AsyncStorage from "@react-native-async-storage/async-storage";
import  messaging from "@react-native-firebase/messaging";


export const requestUserPermission = async ()=>{
	const authStatus = await messaging().requestPermission();
	const enable = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
	// console.log(enable);
	if (enable) {
		getFcmToken();
	}
}

export const getFcmToken = async ()=>{
	let fcmToken = await AsyncStorage.getItem("fcmToken");
	if (!fcmToken) {
		try {
			const token = await messaging().getToken();
			// console.log("====>", token);
			if (token) {
				await AsyncStorage.setItem("fcmToken", token);
			}
			
		} catch (error) {
			console.log("can not get token");
			
		}
	}
}