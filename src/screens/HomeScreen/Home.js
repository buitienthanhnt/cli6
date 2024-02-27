import React, { useCallback, useEffect, useState, useRef } from "react";
import { View, FlatList, TouchableOpacity, Image, Dimensions, Text, ScrollView, StyleSheet, ImageBackground, RefreshControl, Button } from "react-native";
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
} from "react-native-chart-kit";    // https://github.com/indiespirit/react-native-chart-kit 
//https://blog.logrocket.com/top-8-react-native-chart-libraries-2023/
import TimelineTwo from "./TimelineTwo";
import Config from "@config/Config";
import YoutubePlayer from "react-native-youtube-iframe"; // https://lonelycpp.github.io/react-native-youtube-iframe/

const useInfo = () => {
    const [loadding, setLoadding] = useState(false);
    const [data, setData] = useState(null);
    const fetchData = useCallback(async () => {
        try {
            setLoadding(true);
            const url = Config.custom_url() + Config.api_request.getInfo;
            const response = await fetch(url);
            const value = await response.json();
            setData(value?.data);
            setLoadding(false);
        } catch (error) {
            console.log('------', error);
            setLoadding(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return { loadding, data, fetchData }
}

const Home = ({ navigation }) => {
    const { loadding, data, fetchData } = useInfo();
    // console.log('', data.data.hit, data.data.mostPopulator, data.data.mostRecents);
    return (
        <ScrollView
            style={{ flex: 1, paddingHorizontal: 2, paddingTop: 4, }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={loadding}
                    onRefresh={async () => {
                        fetchData();
                    }}
                />
            }
        >
            <TopNew hit={data?.hit} navigation={navigation}></TopNew>
            <PopularNews data={data?.mostRecents} navigation={navigation}></PopularNews>
            <TopSearch search={data?.search}></TopSearch>
            <ProposeList most={data?.mostPopulator} navigation={navigation}></ProposeList>
            <TimeLine timeLine={data?.timeLine} navigation={navigation}></TimeLine>
            <Yvideo video={data?.video}></Yvideo>
            <ImageParacel listImages={data?.listImages} navigation={navigation}></ImageParacel>
            <DemoChart map={data?.map}></DemoChart>
            <ListWriter writers={data?.writers} navigation={navigation}></ListWriter>
        </ScrollView>
    )
}

const Yvideo = ({ video }) => {

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);
    if (!video) {
        return null;
    }
    return (
        <View style={{ flex: 1, padding: 4 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>Video nổi bật</Text>
                <FontAwesome5Icon name='video' size={16} color='#00afef' />
            </View>

            <View style={{ marginTop: 5 }}>
                <YoutubePlayer
                    {...video}
                    onChangeState={onStateChange}
                />
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#b600ff' }}>{video.title}</Text>
            </View>
        </View>
    );
}

const PopularNews = ({ data, navigation }) => {
    return (
        <View style={{ paddingTop: 5 }}>
            <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 5, alignItems: 'baseline', paddingBottom: 0 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }} >Phổ biến</Text>
                <FontAwesome5Icon name='newspaper' size={20} color='#00afef' />
            </View>
            <CarolParax data={data} hideIndicator={true} autoPlay={false} navigation={navigation}></CarolParax>
        </View>
    )
}

const ListWriter = ({ writers, navigation }) => {

    const renderItem = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity onPress={()=>{
                console.log(123);
            }}>
                <Image width={40} height={40} style={{ borderRadius: 40 }} source={{ uri: item.image_path }} keyExtractor={index} resizeMode="cover"></Image>
            </TouchableOpacity>
        )
    }, [])

    if (!writers) {
        return null;
    }
    return (
        <View style={{ width: '100%', padding: 5, alignItems: 'baseline' }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', marginBottom: 5, }}>Tác giả</Text>
                <FontAwesome5Icon name='user-edit' size={18} color='#00afef' />
            </View>

            <FlatList
                horizontal={true}
                data={writers}
                renderItem={renderItem}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ width: 8 }}></View>
                    )
                }}
                extraData={writers}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
            >
            </FlatList>
        </View>
    )
}

const TopSearch = ({ search }) => {
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
                {search && search.map((item, index) => {
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
                                console.log(item);
                            }}
                        >
                            <Text style={{ fontSize: 16, }}>{item}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const ProposeList = ({ most, navigation }) => {
    return (
        <View style={{ flex: 1, padding: 5, gap: 6 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>Đề xuất</Text>
                <FontAwesome5Icon name='wifi' size={16} color='#00afef' />
            </View>
            {most && most.map((item, index) => {
                return (
                    <TouchableOpacity style={{ flexDirection: 'row', width: '100%', gap: 6 }} key={index} onPress={() => {
                        navigation.navigate("PaperDetail", { data: item })
                    }}>
                        <Image width={60} height={60} style={{ borderRadius: 4 }} source={{ uri: item.image_path }}></Image>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, flex: 1 }} numberOfLines={2}>{item.title}</Text>
                            <PaperInfo info={{ like: item?.info?.like, view_count: item?.info?.view_count, comment_count: item?.info?.comment_count }}></PaperInfo>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const ImageParacel = ({ listImages, navigation }) => {
    const [load, setLoad] = useState(false);
    // const [width, setWidth] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            // setData({ values: data.values.reverse() });
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
        <View style={{ flex: 8, }} onLayout={onPageLayout}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', paddingLeft: 5 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>Ấn tượng</Text>
                <FontAwesome5Icon name='images' size={16} color='#00afef' />
            </View>
            <FlatList
                data={listImages}
                numColumns={2}
                horizontal={false}
                scrollEnabled={false}  // VirtualizedLists should never be nested inside plain ScrollViews
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={{ flex: 1, }} onPress={() => {
                            navigation.navigate("PaperDetail", { data: item })
                        }}>
                            <View style={{ width: "100%", height: 120, padding: 1 }}>
                                <ImageBackground
                                    style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 4, paddingLeft: 4 }}
                                    defaultSource={require('../../assets/splash.png')}
                                    resizeMode="cover"
                                    source={{
                                        uri: item.image_path,
                                        // priority: FastImage.priority.normal,
                                    }}
                                >
                                    <Text style={{ fontSize: 14, color: 'white', fontWeight: 500 }} numberOfLines={2}>{item.title}</Text>
                                </ImageBackground>
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

const DemoChart = ({ map }) => {

    if (!map) {
        return (null);
    }
    return (
        <View style={{ paddingHorizontal: 5 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', paddingLeft: 5 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>Thống kê</Text>
                <FontAwesome5Icon name='chart-pie' size={16} color='#00afef' />
            </View>
            <LineChart
                {...map}
                width={Dimensions.get("window").width - 10} // from react-native
                height={220}
                chartConfig={{
                    ...map.chartConfig,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 8
                    },
                    propsForDots: {
                        r: "2",
                        strokeWidth: "2",
                        stroke: "white"
                    }
                    // backgroundColor: "#e26a00",
                    // backgroundGradientFrom: "#ff7cc0", // 82baff
                    // backgroundGradientTo: "#82baff",   // ffa726
                    // decimalPlaces: 2, // optional, defaults to 2dp
                }}
                style={{
                    marginVertical: 4,
                    borderRadius: 16
                }}
                onDataPointClick={({ index, dataset, value, x, y }) => {
                    console.log('....', index, dataset, value, x, y);
                }}
                renderDotContent={({ x, y, index, indexData }) => {
                    return (
                        <View key={index} style={{ position: 'absolute', left: x + 4, top: y - 4 }}>
                            <Text style={{ fontSize: 11 }}>{Math.floor(indexData)}</Text>
                        </View>
                    )
                }}
            // yAxisInterval={1} // số các đường thằng chia ô, defaults to 1
            // yAxisLabel="$"
            // yAxisSuffix="k"
            // hidePointsAtIndex={[1,2]} // ẩn các nút trong mảng này.
            // bezier={false} // true sẽ làm cong các đường dẫn.
            />
        </View>
    )
}

const TimeLine = ({ timeLine, navigation }) => {
    if (!timeLine) {
        return null;
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 5, alignItems: 'baseline', paddingBottom: 0 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }} >Sự Kiện</Text>
                <FontAwesome5Icon name='assistive-listening-systems' size={20} color='#00afef' />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <TimelineTwo timeLine={timeLine} navigation={navigation}></TimelineTwo>
            </View>
        </View>
    )
}

const TopNew = ({ hit, navigation }) => {
    return (
        <TouchableOpacity style={{ flex: 1, }} onPress={() => {
            navigation.navigate("PaperDetail", { data: hit })
        }}>
            <Image
                style={{ borderRadius: 4, width: '100%' }}
                height={Dimensions.get('screen').height / 5 + 20}
                source={{ uri: hit?.image_path }}></Image>
            <Text
                style={{ flex: 1, paddingHorizontal: 5, fontSize: 16, fontWeight: 600, color: '#84a9ff' }}
                numberOfLines={2}>
                {hit?.title}
            </Text>
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 65,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50
    },
    image: {
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