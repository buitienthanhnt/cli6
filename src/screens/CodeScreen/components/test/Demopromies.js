import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { AppInstalledChecker, CheckPackageInstallation } from 'react-native-check-app-install';
import Config from "react-native-config";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { _css } from '@styles/css';
import { BottomTabs } from '@bottoms/Bottom';
import { HideBottom } from '@hooks/Navigate';

const Demopromies = ({ navigation }) => {

    const checkApp = () => {
        // truy xuất danh sách tên ứng dụng được hỗ trợ:
        let apps = AppInstalledChecker.getAppList();

        AppInstalledChecker
            .isAppInstalled('whatapp')
            .then((isInstalled) => {
                console.log('====', isInstalled);
                // isInstalled is true if the app is installed or false if not
            }).catch((error) => {
                console.log('---- can not check error of the package module');
            })
    }
    useEffect(() => {
        // checkApp();
        const promise1 = Promise.resolve(3);
        const promise2 = 42;
        const promise3 = new Promise((resolve, reject) => { setTimeout(resolve, 2000, 'foo'); });

        Promise.all([promise1, promise2, promise3]).then((values) => {
            console.log(values);
        });
        return ()=>{
            navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
        }
    }, []);

    return (
        <View>
            <Text>Demopromies</Text>
            <Text>config value from env: {Config.GOOGLE_MAPS_API_KEY}</Text>

            <Rating
                showRating={true}
                onFinishRating={() => { console.log(222); }}
                style={{ paddingVertical: 10 }}
            />

            <AirbnbRating
                count={11}
                reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                defaultRating={11}
                size={20}

            />

            <AirbnbRating onFinishRating={() => { console.log(222); }} />
            <TouchableOpacity style={_css.button} onPress={() => {
                navigation.getParent()?.setOptions({
                    tabBarStyle: {
                        display: "none"
                    },
                    tabBarVisible: false
                });
            }}>
                <Text>hide BottomTabs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={_css.button} onPress={() => {
                navigation.getParent()?.setOptions({
                    tabBarStyle: {
                        display: 'flex'
                    }
                });
            }}>
                <Text>show BottomTabs</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Demopromies;