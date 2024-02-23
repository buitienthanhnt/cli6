import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Image, Dimensions, Text, ScrollView, StyleSheet } from "react-native";

import PageList from "@config/PageList";
import { caroll, topSearch } from "../PaperScreen/api/datatest";
import CarolParax from "../CodeScreen/components/animated/CarolParax";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import PaperInfo from '@screens/PaperScreen/element/PaperInfo';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";                       // https://github.com/indiespirit/react-native-chart-kit
import Timeline from 'react-native-timeline-flatlist'  // https://www.npmjs.com/package/react-native-timeline-flatlist
import TimelineTwo from "./TimelineTwo";

const Home = (props) => {
    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 2, paddingTop: 4, }} showsVerticalScrollIndicator={false}>
            <TopNew></TopNew>
            <PopularNews data={caroll}></PopularNews>
            <TopSearch></TopSearch>
            <ProposeList></ProposeList>
            <TimeLine></TimeLine>
            <ImageParacel></ImageParacel>
            <DemoChart></DemoChart>
            <ListWriter></ListWriter>
        </ScrollView>
    )
}

const PopularNews = ({ data }) => {
    return (
        <View style={{ paddingTop: 5 }}>
            <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 5, alignItems: 'baseline', paddingBottom: 0 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }} >Phổ biến</Text>
                <FontAwesome5Icon name='newspaper' size={20} color='#00afef' />
            </View>
            <CarolParax data={data} hideIndicator={true} autoPlay={false}></CarolParax>
        </View>
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
        <View style={{ width: '100%', padding: 5, alignItems: 'baseline' }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', marginBottom: 5, }}>Tác giả</Text>
                <FontAwesome5Icon name='user-edit' size={18} color='#00afef' />
            </View>

            <FlatList
                horizontal={true}
                data={[
                    { name: 'a 1', id: 1, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708609866107-1708609867186388771070-0-96-315-600-crop-1708609921962319267918.jpg' },
                    { name: 'a 2', id: 2, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708601588197-1708601588540176911232.jpg' },
                    { name: 'a 3', id: 3, img: 'https://sohanews.sohacdn.com/zoom/268_166/160588918557773824/2024/2/22/avatar1708586416481-1708586417474263407992.jpg' },
                    { name: 'a 4', id: 4, img: 'https://sohanews.sohacdn.com/zoom/563_352/160588918557773824/2024/2/22/base64-170859501305245802858-463-0-1713-2000-crop-170859510994215803343.jpeg' },
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
                keyExtractor={item => item.id}
            >
            </FlatList>
        </View>
    )
}

const TopSearch = () => {
    return (
        <View style={{ flex: 1, padding: 5 }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', marginBottom: 5 }}>Tìm kiếm</Text>
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
                            index={index}
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
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, flex: 1 }}>{item.title}</Text>
                            <PaperInfo info={{ like: 2, view_count: 1, comment_count: 3 }}></PaperInfo>
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
    // const [width, setWidth] = useState(null);

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
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>Ấn tượng</Text>
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
                        <TouchableOpacity style={{ flex: 1, padding: 1 }} onPress={() => {
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

const DemoChart = () => {
    return (
        <View style={{ paddingHorizontal: 5 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', paddingLeft: 5 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>Thống kê</Text>
                <FontAwesome5Icon name='chart-pie' size={16} color='#00afef' />
            </View>
            <LineChart
                data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 10} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#ff7cc0", // 82baff
                    backgroundGradientTo: "#82baff",   // ffa726
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: "white"
                    }
                }}
                bezier
                style={{
                    marginVertical: 4,
                    borderRadius: 16
                }}
            />
        </View>
    )
}

const TimeLine = () => {
    const data = [
        { time: '09:00', title: 'Event 1', description: 'Event 1 Description' },
        { time: '10:45', title: 'Event 2', description: 'Event 2 Description' },
        { time: '12:00', title: 'Event 3', description: 'Event 3 Description' },
        { time: '14:00', title: 'Event 4', description: 'Event 4 Description' },
        { time: '16:30', title: 'Event 5', description: 'Event 5 Description' },
    ];

    return (
        <View style={{flex: 1}}>
            <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 5, alignItems: 'baseline', paddingBottom: 0 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }} >Sự Kiện</Text>
                <FontAwesome5Icon name='assistive-listening-systems' size={20} color='#00afef' />
            </View>
           <View style={{flex: 1, justifyContent: 'center',}}>
           <TimelineTwo></TimelineTwo>
           </View>
        </View>
    )
}

const TopNew = (props) => {
    return (
        <View style={{ flex: 1, }}>
            <Image
                style={{ borderRadius: 4 }}
                width={'100%'}
                height={Dimensions.get('screen').height / 5}
                source={{ uri: 'https://sohanews.sohacdn.com/160588918557773824/2024/2/22/quy-hoach-tinh-quang-ninh-3-170859382997330062774.jpg' }}></Image>
            <Text
                style={{ flex: 1, paddingHorizontal: 5, fontSize: 16, fontWeight: 600, color: '#84a9ff' }}
                numberOfLines={2}>
                Khám phá viễn cảnh 'hóa rồng' của tỉnh giáp Trung Quốc sẽ có nhiều thành phố nhất Việt Nam
            </Text>
        </View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop:65,
      backgroundColor:'white'
    },
    list: {
      flex: 1,
      marginTop:20,
    },
    title:{
      fontSize:16,
      fontWeight: 'bold'
    },
    descriptionContainer:{
      flexDirection: 'row',
      paddingRight: 50
    },
    image:{
      width: 50,
      height: 50,
      borderRadius: 25
    },
    textDescription: {
      marginLeft: 10,
      color: 'gray'
    }
  });

export default Home;