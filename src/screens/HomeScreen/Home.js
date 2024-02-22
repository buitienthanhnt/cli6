import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Image, ImageBackground, Text, ScrollView } from "react-native";

import PageList from "@config/PageList";
import { caroll, topSearch } from "../PaperScreen/api/datatest";
import CarolParax from "../CodeScreen/components/animated/CarolParax";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import PaperInfo from '@screens/PaperScreen/element/PaperInfo';

const Home = (props) => {
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <CarolParax data={caroll} hideIndicator={true} autoPlay={false}></CarolParax>
            <TopSearch></TopSearch>
            <ProposeList></ProposeList>
            <ImageParacel></ImageParacel>
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
        <View style={{ width: '100%', padding: 5, }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', marginBottom: 5 }}>Nhiều tác giả</Text>
                <FontAwesome5Icon name='user-edit' size={18} color='#00afef' />
            </View>

            <FlatList
                horizontal={true}
                data={[
                    { name: 'a 1', id: 1, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708609866107-1708609867186388771070-0-96-315-600-crop-1708609921962319267918.jpg' },
                    { name: 'a 2', id: 2, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708601588197-1708601588540176911232.jpg' },
                    { name: 'a 3', id: 3, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708586416481-1708586417474263407992.jpg' },
                    { name: 'a 4', id: 4, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708570997205-17085709973822036199424-0-70-271-504-crop-1708571023124605747496.png' },
                    { name: 'a 5', id: 5, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708607370482-1708607370843731064543.jpeg' },
                    { name: 'a 1', id: 11, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708607370482-1708607370843731064543.jpeg' },
                    { name: 'a 2', id: 21, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708601588197-1708601588540176911232.jpg' },
                    { name: 'a 3', id: 31, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708586416481-1708586417474263407992.jpg' },
                    { name: 'a 4', id: 41, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708570997205-17085709973822036199424-0-70-271-504-crop-1708571023124605747496.png' },
                    { name: 'a 5', id: 51, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708607370482-1708607370843731064543.jpeg' }
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
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', marginBottom: 5 }}>Tìm kiếm nhiều</Text>
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
        <View style={{ flex: 1, padding: 5, gap: 6 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>Đề xuất</Text>
                <FontAwesome5Icon name='wifi' size={16} color='#00afef' />
            </View>
            {caroll.map((item, index) => {
                return (
                    <TouchableOpacity style={{ flexDirection: 'row', width: '100%', gap: 6 }} key={index} onPress={() => {
                        console.log(item.title);
                    }}>
                        <Image width={60} height={60} style={{ borderRadius: 4 }} source={{ uri: item.image_path }}></Image>
                        <View style={{flex: 1}}>
                            <Text style={{ fontSize: 14, flex: 1 }}>{item.title}</Text>
                            <PaperInfo info={{like: 2, view_count: 1, comment_count: 3}}></PaperInfo>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const ImageParacel = () => {
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
        <View style={{ flex: 8, paddingVertical: 5 }} onLayout={onPageLayout}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', paddingLeft: 5 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>Ảnh ấn tượng</Text>
                <FontAwesome5Icon name='images' size={16} color='#00afef' />
            </View>
            <FlatList
                data={data.values.slice(10)}
                numColumns={2}
                horizontal={false}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={{ flex: 1, padding: 2 }} onPress={() => {
                            console.log(123);
                        }}>
                            <View style={{ width: "100%", height: 120, }}>
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
        </View>
    )
}

export default Home;