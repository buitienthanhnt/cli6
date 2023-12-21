import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"; // gán lại giá trị mà không render lại đối tượng. https://www.w3schools.com/react/react_useref.asp
import { Button, Image, Text, View, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from "react-native";

// import { Ionicons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from "react-native-raw-bottom-sheet";  // npm i react-native-raw-bottom-sheet
import DeviceInfo from 'react-native-device-info';    // npm install --save react-native-device-info  && react-native link react-native-device-info
import DatePicker from 'react-native-date-picker'
import { Colors, DateTimePicker, Dialog } from 'react-native-ui-lib';  // npm i react-native-ui-lib // https://wix.github.io/react-native-ui-lib/docs/foundation/colors
import { useNetInfo } from "@react-native-community/netinfo";

import { BasicTable, TopTable } from "@screens/components/Table";
import { BasicSlider } from "@screens/components/Slider";
import { firebase } from "@react-native-firebase/auth";
import ActionSheet from 'react-native-actionsheet'     // https://www.npmjs.com/package/react-native-actionsheet

// useRef doc::    https://react.dev/reference/react/useRef#i-cant-get-a-ref-to-a-custom-component

Colors.loadColors({
    error: '#ff2442',
    success: '#00CD8B',
    text: '#20303C'
});

const AccountDetail = (props) => {
    const refRBSheet = useRef();
    const netInfo = useNetInfo();
    const [user, setUser] = useState(null);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const actionSheet = useRef(null);
    const actionOptions = useMemo(()=>{
        return [
            'Apple map',
            'Google map',
            'Custom map',
            'native app',
            'Cancel'
        ];
    }, [])
    // const { width, height } = Dimensions.get("screen");
    // DeviceInfo.getAndroidId().then((androidId) => {console.log(androidId);}); // https://www.npmjs.com/package/react-native-device-info#getandroidid
    DeviceInfo.getUniqueId().then((uniqueId) => {
        // console.log(uniqueId);
        // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
        // Android: "dd96dec43fb81c97"
        // Windows: "{2cf7cb3c-da7a-d508-0d7f-696bb51185b4}"
    });

    function onAuthStateChanged(user) {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(onAuthStateChanged);
    }, []);

    return (
        <ScrollView style={{ paddingHorizontal: 8 }}>
            <Text></Text>
            <Button title="show bottom" onPress={() => {
                refRBSheet.current.open();
            }}></Button>
            <Text></Text>

            <View>
                <Text>Type: {netInfo.type}</Text>
                <Text>Is Connected?: {netInfo.isConnected ? "conneted" : "not connected"}</Text>
            </View>

            <Button title="to Wishlist" onPress={() => {
                props.navigation.navigate("Wishlist");
            }}></Button>
            <Text></Text>

            <Button title="to test" onPress={() => {
                props.navigation.navigate("Test");
            }}></Button>
            <Text></Text>

            <Button title="to test firebase" onPress={() => {
                props.navigation.navigate("ExFirebase");
            }}></Button>
            <Text></Text>

            {!user && <Button title="to Login" onPress={() => {
                props.navigation.navigate("Login");
            }}></Button>}
            <Text></Text>

            {firebase.auth().currentUser && <Button title="to userDetail" onPress={() => {
                console.log(user);
                props.navigation.navigate("UserDetail");
            }}></Button>
            }

            {/* <Text></Text>
            <Button title="log user" onPress={()=>{
                console.log(user, '======', firebase.auth().currentUser);
            }}></Button>
            <Text></Text> */}

            <RBSheet ref={refRBSheet}
                //  height = {height/2}    // chiều cao popup modal
                closeOnDragDown={true} // kéo xuống để ẩn popup modal
            >
                {/* <View style={{flexDirection:row, padding: 8, justifyContent: "space-between"}}></View> */}
                <ScrollView style={{ padding: 8 }}
                    horizontal={true}                      // hiển thị theo chiều ngang
                    pagingEnabled={true}                   // lật trang
                    showsHorizontalScrollIndicator={false} // ẩn thanh scollBar
                    // scrollEventThrottle={1000}          // sau 1s call: onScroll
                    onScroll={(event) => {
                        // console.log(event.nativeEvent.contentOffset);  // tọa độ x và y khi scroll
                    }}
                >
                    <View style={{ marginRight: 8 }}>
                        <TouchableOpacity onPress={() => {
                            console.log(123);
                        }}>
                            <Image source={{ uri: "https://sohanews.sohacdn.com/thumb_w/1000/160588918557773824/2023/6/20/4-1687283405506869800315.jpg" }} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover"></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 8 }}>
                        <TouchableOpacity>
                            <Image source={{ uri: "https://sohanews.sohacdn.com/thumb_w/980/160588918557773824/2023/6/21/6-thi-xa-phu-my-16873146381691226222198.jpg" }} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover"></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 8 }}>
                        <TouchableOpacity>
                            <Image source={{ uri: "https://sohanews.sohacdn.com/thumb_w/1000/160588918557773824/2023/6/20/photo-2-1687283382097520843048.jpg" }} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover"></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 8 }}>
                        <TouchableOpacity onPress={() => {
                            console.log(123);
                        }}>
                            <Image source={{ uri: "https://sohanews.sohacdn.com/thumb_w/1000/160588918557773824/2023/6/20/4-1687283405506869800315.jpg" }} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover"></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 8 }}>
                        <TouchableOpacity>
                            <Image source={{ uri: "https://sohanews.sohacdn.com/thumb_w/980/160588918557773824/2023/6/21/6-thi-xa-phu-my-16873146381691226222198.jpg" }} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover"></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 8 }}>
                        <TouchableOpacity>
                            <Image source={{ uri: "https://sohanews.sohacdn.com/thumb_w/1000/160588918557773824/2023/6/20/photo-2-1687283382097520843048.jpg" }} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover"></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 8 }}>
                        <TouchableOpacity onPress={() => {
                            console.log(123);
                        }}>
                            <Image source={{ uri: "https://sohanews.sohacdn.com/thumb_w/1000/160588918557773824/2023/6/20/4-1687283405506869800315.jpg" }} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover"></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 8 }}>
                        <TouchableOpacity>
                            <Image source={{ uri: "https://sohanews.sohacdn.com/thumb_w/980/160588918557773824/2023/6/21/6-thi-xa-phu-my-16873146381691226222198.jpg" }} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover"></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginRight: 8 }}>
                        <TouchableOpacity>
                            <Image source={{ uri: "https://sohanews.sohacdn.com/thumb_w/1000/160588918557773824/2023/6/20/photo-2-1687283382097520843048.jpg" }} style={{ width: 60, height: 60, borderRadius: 30 }} resizeMode="cover"></Image>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </RBSheet>

            {/* <Image source={require("../../assets/Ripple-1s-200px.gif")} style={{ width: 60, height: 60 }}></Image> */}

            {/* <ActivityIndicator size="small" color="#0000ff" /> */}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <View style={{ width: 120 }}>
                    <Button title={date.toLocaleDateString() ? date.toLocaleDateString() : "select date"} onPress={() => setOpen(true)} />
                </View>
            </View>
            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

            <BasicSlider></BasicSlider>

            <Button title="open action sheet" onPress={() => {
                actionSheet.current.show();
            }}></Button>    

            <BasicTable></BasicTable>
            <TopTable></TopTable>

            <ActionSheet
                ref={actionSheet}
                title={'Which one do you like ?'} // https://www.npmjs.com/package/react-native-actionsheet
                message={'message you input'}
                options={actionOptions}
                cancelButtonIndex={actionOptions.length -1}
                destructiveButtonIndex={actionOptions.length-1}
                onPress={(index) => { console.log(index); }}
            />

        </ScrollView>
    )
}

export default AccountDetail;       