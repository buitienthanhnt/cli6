import React, { useCallback, useEffect, useState } from "react";
import { Clipboard, View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tooltip } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';    // npm install --save react-native-device-info  && react-native link react-native-device-info
import { withExpoSnack } from 'nativewind';
import { styled, useColorScheme } from "nativewind";
import { Navigate } from "@hooks/Navigate";
import { connect } from "react-redux";
import { useRegisterFcm } from "@hooks/useNotification";
import LoadingBtn from "@elements/LoadingBtn";

const StyledView = styled(View);
const StyledText = styled(Text);

const NotificationRegister = (props) => {
    const [fcmtoken, setFcmtoken] = useState("");
    const [deviceId, setDeviceid] = useState("");
    const [loading, setLoading] = useState(false);
    const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();

    const onLoading = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    const {
        mutate: registerNotification,
        isLoading,
        isSuccess,
    } = useRegisterFcm();

    const getFcmtoken = async () => {
        const token = await AsyncStorage.getItem("fcmToken")
        if (token) {
            setFcmtoken(token);
        }
        return token;
    }

    // const registerNotification = async () => {
    //     const token = await AsyncStorage.getItem("fcmToken");
    //     if (token) {
    //         let url = Config.custom_url() + Config.api_request.registerFcm;
    //         const response = await anyAxios(url, {
    //             fcmToken: token,
    //             deviceId: deviceId,
    //             active: true
    //         }, "POST");
    //         console.log(response);
    //     }
    // }

    const implementDevice = async () => {
        let uniqueId = await DeviceInfo.getUniqueId().then((uniqueId) => {
            console.log(uniqueId);
            return uniqueId;
            // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
            // Android: "dd96dec43fb81c97"
            // Windows: "{2cf7cb3c-da7a-d508-0d7f-696bb51185b4}"
        });
        // console.log();
        setDeviceid(uniqueId);
    }

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
    };

    useEffect(() => {
        const tk = getFcmtoken();
        implementDevice();
        // console.log(tk);
    }, []);

    const changeTheme = () => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <View style={{ flex: 1, padding: 6, backgroundColor: 'rgba(0, 114, 0, 0.5)' }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>fcmToken: </Text>
                <Text>(click to coppy)</Text>
            </View>

            <Tooltip popover={<Text>coppied to Clipboard: </Text>}
                withOverlay={false}
                skipAndroidStatusBar={true}
                onOpen={() => {
                    copyToClipboard(`${fcmtoken}`);
                }}
            >
                <Text style={{ color: '#dd5fc0' }}><Icon name='copy' size={18} color='tomato' /> {fcmtoken}</Text>
            </Tooltip>
            <View>
                <Text>deviceId: {DeviceInfo.getDeviceId()} {props.g_data.number}</Text>
                <Text>uniqueId(check fcmToken in server): {deviceId}</Text>
            </View>

            <TouchableOpacity style={{ alignItems: 'center', backgroundColor: 'rgba(53, 102, 142, 0.4)', borderRadius: 6, padding: 6, }} onPress={registerNotification}>
                <Icon name='plane' size={36} color='black' />
                {isLoading ? <Text>loadding... </Text> : <Text>recived notification for device</Text>}
            </TouchableOpacity>

            <View style={{ height: 2, backgroundColor: 'black', marginVertical: 4 }}></View>

            <LoadingBtn
                loadding={loading}
                style={{ borderColor: 'violet', backgroundColor: 'rgba(32, 141, 211, 0.7)' }}
                onPress={onLoading}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>test loaddingBtn</Text>
            </LoadingBtn>

            <ListNoti g_data={props.g_data}></ListNoti>
        </View>
    )
}

const ListNoti = (props) => {
    const [data, setData] = useState([]);

    const getNoti = async () => {
        let noti = await AsyncStorage.getItem('listNotifi');
        const values = JSON.parse(noti).reverse();
        // console.log(values);
        setData(values);
    }

    const deleteItem = async (index) => {
        let noti = await AsyncStorage.getItem('listNotifi');
        if (noti) {
            noti = JSON.parse(noti);
            noti.splice(index, 1);
            await AsyncStorage.setItem('listNotifi', JSON.stringify(noti));
            getNoti();
        }
    };

    const openDetail = useCallback((paper_id) => {
        Navigate('PaperScreen', { screen: 'PaperDetail', initial: false, params: { id: paper_id } })
    }, [])

    useEffect(() => {
        getNoti();
    }, []);

    return (
        <StyledView style={{ flex: 1, paddingBottom: 10 }}>
            <StyledText className="dark:text-white text-white" style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }}>list notification: {props.g_data.number}g</StyledText>
            <FlatList
                data={data}
                extraData={data}
                keyExtractor={(item, index) => item?.messageId + "-" + index}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', flex: 1, }} onPress={() => {
                                openDetail(item?.data?.id);
                            }}>
                                <Image
                                    source={{ uri: item?.notification?.android?.imageUrl }}
                                    width={80} height={80} resizeMode="cover"
                                    style={{ borderRadius: 20, }}>
                                </Image>

                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    <Text numberOfLines={2}
                                        style={{ color: 'rgba(125, 0, 203, 0.5)', fontSize: 16, fontWeight: '500', }}
                                    >
                                        {item?.notification?.title}
                                    </Text>
                                    <Text numberOfLines={3}>{item?.notification?.body}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    deleteItem(index)
                                }}
                                style={{
                                    backgroundColor: 'rgba(255, 203, 0, 0.6)', justifyContent: 'center',
                                    alignItems: 'center', paddingHorizontal: 4, borderRadius: 6,
                                }}>
                                <Text>delete</Text>
                            </TouchableOpacity>

                        </View>
                    )
                }}
                refreshing={false}
                onRefresh={() => {
                    getNoti();
                }}
            ></FlatList>
        </StyledView>
    );
}
export default withExpoSnack(connect(
    state => {
        return { g_data: state.numberRe }
    },
    dispatch => {
        return {
            add_value: (value) => {
                dispatch({
                    type: 'ADD_NUMBER',
                    value: value,
                })
            },
            sub_value: () => {
                dispatch({
                    type: 'SUB_NUMBER',
                })
            },
        }
    }
)(NotificationRegister));
// export default withExpoSnack(NotificationRegister);