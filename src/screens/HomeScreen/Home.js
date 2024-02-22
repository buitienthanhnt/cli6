import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Image, ImageBackground, Text, ScrollView } from "react-native";

import PageList from "@config/PageList";
import { caroll, topSearch } from "../PaperScreen/api/datatest";
import CarolParax from "../CodeScreen/components/animated/CarolParax";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Home = (props) => {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState(PageList);
    const [width, setWidth] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setData({ values: data.values.reverse() });
        }, 3000);
    }, []);

    // You can maybe pass the data as props, 
    // and take the prop data from the store. 
    // You are right in that onLayout will only be triggered after everything is rendered, 
    // but that simply means that you have to pass the props with a null value on the first render. 
    // For instance: Hàm onLayout để lấy kisck thước của 1 thẻ mà nó được gán khi thẻ đó được render xong.
    // điều kiện là trong thể đó phải đã có chứa nội dung ban đầu.
    // thường dùng trong trường hợp dùng trong thẻ con cần lấy kích thước thẻ cha.
    const onPageLayout = useCallback((event) => {
        const { width, height } = event.nativeEvent.layout;
        // console.log("ON LAYOUT", width, height);
        // setWidth(width)
    }, []);

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {/* <View style={{ flex: 8 }} onLayout={onPageLayout}>
                <FlatList
                    data={data.values}
                    numColumns={2}
                    horizontal={false}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ flex: 1, padding: 3 }} onPress={() => {
                                console.log(123);
                            }}>
                                <View style={{ width: "100%", height: 120, borderWidth: 1 }}>
                                    <Image
                                        style={{ flex: 1 }}
                                        defaultSource={require('../../assets/splash.png')}
                                        resizeMode="cover"
                                        source={{
                                            uri: item.img_path,
                                            // priority: FastImage.priority.normal,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    refreshing={load}
                    onRefresh={() => {
                        setLoad(true);
                        console.log(123123);
                        setLoad(false);
                    }}

                ></FlatList>
            </View> */}

            <CarolParax data={caroll} hideIndicator={true} autoPlay={false}></CarolParax>
            <TopSearch></TopSearch>
            <ProposeList></ProposeList>
            <ListWriter></ListWriter>
           
        </ScrollView>
    )
}

const ListWriter = () => {

    const renderItem = useCallback(({ item, index }) => {
        return (
            <View>
                <Image width={40} height={40} style={{ borderRadius: 40 }} source={{ uri: item.img }} keyExtractor={index} resizeMode="cover"></Image>
            </View>
        )
    }, [])
    return (
        <View style={{ width: '100%', paddingHorizontal: 5, }}>
            <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', marginBottom: 5 }}>List writer</Text>
            <FlatList
                horizontal={true}
                data={[
                    { name: 'a 1', id: 1, img: 'http://192.168.100.156/laravel1/public/storage/files/shares/images up/d-1690812430.jpg' },
                    { name: 'a 2', id: 2, img: 'http://192.168.100.156/laravel1/public/storage/files/shares/images up/vom_sat_israel.jpg' },
                    { name: 'a 3', id: 3, img: 'http://192.168.100.156/laravel1/public/storage/files/shares/images up/175769184-4107544292648392-374037799264221685-n-jpeg-1690811733.jpg' },
                    { name: 'a 4', id: 4, img: 'http://192.168.100.156/laravel1/public/storage/files/shares/images up/aj5i3496-47-1707017260535-17070172610271722167421.jpg' },
                    { name: 'a 5', id: 5, img: 'http://192.168.100.156/laravel1/public/storage/files/shares/images up/d-1690812430.jpg' },
                    { name: 'a 1', id: 11, img: 'http://192.168.100.156/laravel1/public/storage/files/shares/images up/d-1690812430.jpg' },
                    { name: 'a 2', id: 21, img: 'http://192.168.100.156/laravel1/public/storage/files/shares/images up/vom_sat_israel.jpg' },
                    { name: 'a 3', id: 31, img: 'http://192.168.100.156/laravel1/public/storage/files/shares/images up/175769184-4107544292648392-374037799264221685-n-jpeg-1690811733.jpg' },
                    { name: 'a 4', id: 41, img: 'http://192.168.100.156/laravel1/public/storage/files/shares/images up/aj5i3496-47-1707017260535-17070172610271722167421.jpg' },
                    { name: 'a 5', id: 51, img: 'http://192.168.100.156/laravel1/public/storage/files/shares/images up/d-1690812430.jpg' }
                ]}
                renderItem={renderItem}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ width: 8 }}></View>
                    )
                }}
                showsHorizontalScrollIndicator={false}
            >
            </FlatList>
        </View>
    )
}

const TopSearch = () => {
    return (
        <View style={{ flex: 1, padding: 5 }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', marginBottom: 5 }}>top search</Text>
                <FontAwesome5Icon name='chart-line' size={24} color='#00afef' />
            </View>
            <View style={{
                gap: 4,
                flexDirection: 'row',
                flexWrap: 'wrap', // để tự động co dãn xuống dòng.

            }}>
                {topSearch.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={{
                                backgroundColor: '#bababa',
                                alignSelf: 'flex-start', height: 32, borderRadius: 8,
                                paddingHorizontal: 4, justifyContent: 'center', marginHorizontal: 4
                            }}
                            onPress={() => {
                                console.log(item.value);
                            }}
                        >
                            <Text style={{ fontSize: 16, }}>{item.value}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const ProposeList = () => {
    return (
        <View style={{ flex: 1, paddingHorizontal: 5, gap: 6 }}>
            <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>de xuat</Text>
            {caroll.map((item, index) => {
                return (
                    <TouchableOpacity style={{ flexDirection: 'row', width: '100%', gap: 6}} key={index} onPress={()=>{
                        console.log(item.title);
                    }}>
                        <Image width={60} height={60} source={{ uri: item.image_path }}></Image>
                        <Text style={{fontSize: 14}}>{item.title}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default Home;