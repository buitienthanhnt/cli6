import react, { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, RefreshControl, Text, View, FlatList, ActivityIndicator, StyleSheet, Button } from "react-native";
import WebView from 'react-native-webview';
import { Linking } from 'react-native';
import { useQuery } from 'react-query'               // https://codestus.com/posts/su-dung-react-query-de-fetch-du-lieu
import fetchingPosts from '@screens/PaperScreen/api/fetchingPosts';
import axios from 'react-native-axios';

const fectData = async ()=>{
    // const { data, error, isError, isLoading } = useQuery(['articles'], fetchingPosts);
    // return {data, error, isError, isLoading};
    let url = "http://192.168.100.248/newpaper/public/index.php/api/getpaperdetail/32";
	const res = await axios.get(url);
    if (res.data) {
        Linking.openURL(`myapp://app/PaperDetail/12`);
    }
    console.log(res);
    return res;
}
const WebviewApp = () => {
    const linkPress = useCallback((request) => {
        console.log(request.url);
        if (request.url !== "about:blank") { // gọi khi nhấn vào 1 link trong webview
            const res = fectData();
            // console.log(request.url);
            // Linking.openURL(`myapp://app/PaperDetail/12`);
            // Linking.openURL(request.url)
            return false
        } else return true
    }, []);

    return (
        <WebView source={{ uri: "https://magento24.jmango360.com/" }}
            // onNavigationStateChange={event => {
            //     console.log("=====>", event);
            //     if (event.url !== uri) {
            //     Linking.openURL(event.url);
            //     }
            // }}

            // onShouldStartLoadWithRequest={(request) => {
            //     console.log('====<<<', request);
            //     if(request.url !== "about:blank" && request.navigationType == "click") { // gọi khi nhấn vào 1 link trong webview
            //         // console.log(request.url);
            //         // Linking.openURL(`myapp://app/PaperDetail/12`);
            //         //   Linking.openURL(request.url)
            //       return false
            //     } else return true
            // }}

            onShouldStartLoadWithRequest={linkPress}
        />
    );
}

export default WebviewApp;