import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    FlatList, TouchableOpacity, Image, Dimensions, Text, ScrollView, StyleSheet,
    ImageBackground, RefreshControl, Button, TextInput, TouchableWithoutFeedback, Keyboard, Alert
} from "react-native";
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
import { openDetail, openSearch } from "@utils/paper";
import { Navigate } from "@hooks/Navigate";
import firebaseType from "@utils/firebaseType";
import { useSelector } from "react-redux";
import database from '@react-native-firebase/database';
import useDispatchState from '@hooks/redux/useDispatchState';
import { getAxios } from '@queries/NetWorking';
import remoteConfig from '@react-native-firebase/remote-config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatDate } from "@utils/helper";
import Carousel from "@elements/Carousel";

const useInfo = () => {
    const { useFirebase } = useSelector((state) => state.defRe);
    const [loadding, setLoadding] = useState(false);
    const [data, setData] = useState(null);
    const fetchData = useCallback(async () => {
        try {
            setLoadding(true);
            if (useFirebase || Config.useFirebase) {
                const onValueChange = database().ref(firebaseType.realTime.homeInfo).on('value', (snapshot) => {
                    if (snapshot.numChildren()) {
                        let _data = [];
                        snapshot.forEach(item => {
                            setData(item.val()?.data);
                            setLoadding(false);
                        })
                    };
                });
                return () => database().ref(firebaseType.realTime.homeInfo).off('value', onValueChange);
            } else {
                const url = Config.custom_url() + Config.api_request.getInfo;
                const response = await fetch(url);
                const value = await response.json();
                setData(value?.data);
            }
            setLoadding(false);
        } catch (error) {
            console.log('---||---', error);
            setLoadding(false);
        }
    }, [useFirebase]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return { loadding, data, fetchData }
}

const Home = ({ navigation }) => {
    const { actionReducer, updateState } = useDispatchState();
    const checkUseFirebase = useCallback(async () => {
        if (Config.useFirebase && __DEV__) {
            updateState(actionReducer.useFirebase, true)
            return;
        }
        try {
            const data = await getAxios(Config.custom_url() + Config.api_request.getInfo);
            if (data?.data.code < 200 || data?.data.code >= 300 || !data) {
                Alert.alert('server not active!, use data from firebase');
                updateState(actionReducer.useFirebase, true)
            }
        } catch (error) {
            Alert.alert('Đã hết thời gian yêu cầu');
            updateState(actionReducer.useFirebase, true)
        }
    }, [])

    useEffect(() => {
        checkUseFirebase()
    }, [checkUseFirebase]);

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
            <TopNew hit={data?.hit}></TopNew>
            <PopularNews data={data?.mostRecents}></PopularNews>
            <TopSearch search={data?.search}></TopSearch>
            <Forward value={data?.forward}></Forward>
            <ProposeList most={data?.mostPopulator}></ProposeList>
            <TimeLine timeLine={data?.timeLine}></TimeLine>
            <Yvideo video={data?.video}></Yvideo>
            <ImageParacel listImages={data?.listImages}></ImageParacel>
            <DemoChart map={data?.map}></DemoChart>
            <ListWriter writers={data?.writers}></ListWriter>
            <SearchAll></SearchAll>
            <ListCarousel data={data?.mostRecents}></ListCarousel>

            <Button title="to Process" onPress={() => {
                navigation.navigate("ExampleOne")
            }}></Button>
            {/* <Button title="to ExampleTwo" onPress={()=>{
                navigation.navigate("ExampleTwo")
            }}></Button> */}
            <Text></Text>
            {/* <Button title="to screen modal" onPress={() => {
                navigation.navigate('ExAnimated5')
            }}></Button> */}

        </ScrollView>
    )
}

const ListCarousel = ({ data }) => {
    if (!data) {
        return null;
    }
    return (
        <View style={{ padding: 5 }}>
            <Carousel data={data} onPress={openDetail}></Carousel>
        </View>
    )
}

const Forward = ({ value }) => {
    if (!value) {
        return null;
    }
    return (
        <View style={{ flex: 1, padding: 4, paddingBottom: 20 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 5 }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>Góc nhìn</Text>
                <FontAwesome5Icon name='compass' size={16} color='#00afef' />
            </View>
            <View style={{ flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
                    <Image source={{ uri: value?.writer?.image_path }} style={{ width: 40, height: 40, borderRadius: 20 }}></Image>
                    <View style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '600' }}>{value?.writer?.name}</Text>
                        <Text>{formatDate(value?.created_at, 'vi-VN')}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ alignItems: 'center', paddingHorizontal: 5 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>...</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ marginTop: 10, paddingHorizontal: 10 }} onPress={() => {
                openDetail(value)
            }}>
                <Text style={{ marginBottom: 5 }}>{value.title}</Text>
                <Image source={{ uri: value.image_path }} style={{ width: 'auto', height: 210, borderRadius: 20 }}></Image>
                <View style={{
                    position: 'absolute',
                    bottom: -20,
                    left: Dimensions.get('screen').width / 2 - 130,
                    backgroundColor: 'rgba(181, 151, 246, 0.6)',
                    borderRadius: 20,
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 300
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='thumbs-up' size={15} color={'red'} />
                        <Text style={{ fontWeight: 600 }}> 123 likes</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontWeight: 600 }}>123 <Icon name='comment' size={15} color='tomato' /></Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const SearchAll = () => {
    const [search, setSearch] = useState('');
    return (
        <View
            style={{
                flex: 1,
                borderColor: 'blue',
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10
            }}
        >
            {search.length >= 3 && <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                setSearch('')
            }}>
                <FontAwesome5Icon name='trash-alt' size={20} color='#00afef' />
            </TouchableOpacity>}
            <TextInput
                style={{ height: 40, fontSize: 18, flex: 1 }}
                placeholder="seach in news"
                onChangeText={(text) => {
                    setSearch(text);
                }}
                value={search}
            ></TextInput>

            <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                Keyboard.dismiss();
                if (search.length >= 3) {
                    openSearch({ value: search })
                }
            }}>
                <FontAwesome5Icon name='search' size={24} color='#00afef' />
            </TouchableOpacity>

        </View>
    )
}

const Yvideo = ({ video }) => {
    if (!video) {
        return null;
    }

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    return (
        <View style={{ flex: 1, padding: 4 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>Video nổi bật</Text>
                <FontAwesome5Icon name='video' size={16} color='#00afef' />
            </View>

            <View style={{ marginTop: 5 }}>
                <YoutubePlayer
                    {...video}
                    videoId="hJ7Rg1821Q0"
                    onChangeState={onStateChange}
                />
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#b600ff' }}>{video.title}</Text>
            </View>
        </View>
    );
}

const PopularNews = ({ data }) => {
    if (!data) {
        return null;
    }

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

const ListWriter = ({ writers }) => {
    if (!writers) {
        return null;
    }

    const renderItem = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                Navigate('PaperByWriter', item);
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
    if (!search) {
        return null;
    }

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
                                Navigate('Search', { value: item });
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

const ProposeList = ({ most }) => {
    if (!most) {
        return null;
    }

    return (
        <View style={{ flex: 1, padding: 5, gap: 6 }}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#00afef', fontWeight: '600', }}>Đề xuất</Text>
                <FontAwesome5Icon name='wifi' size={16} color='#00afef' />
            </View>
            {most && most.map((item, index) => {
                return (
                    <TouchableOpacity style={{ flexDirection: 'row', width: '100%', gap: 6 }} key={index} onPress={() => {
                        openDetail(item)
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
    if (!listImages) {
        return null;
    }

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
                renderItem={({ item, index }) => {
                    let height = 145;
                    if (index === listImages.length - 1 && index % 2 == 0) {
                        height = Math.ceil(Dimensions.get('screen').height / 5 + 20)
                    }
                    return (
                        <TouchableOpacity style={{ flex: 1, }} onPress={() => {
                            openDetail(item)
                        }}>
                            <View style={{ width: "100%", height: height, padding: 1, }}>
                                <ImageBackground
                                    style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 4, paddingLeft: 4, }}
                                    defaultSource={require('../../assets/splash.png')}
                                    resizeMode="cover"
                                    source={{
                                        uri: item.image_path,
                                        // priority: FastImage.priority.normal,
                                    }}
                                    borderRadius={4}
                                >
                                    <Text style={{ fontSize: 14, color: 'white', fontWeight: 500 }} numberOfLines={2}>{item.title}</Text>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    );
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
                <TimelineTwo timeLine={timeLine}></TimelineTwo>
            </View>
        </View>
    )
}

const TopNew = ({ hit }) => {
    if (!hit) {
        return null;
    }

    return (
        <TouchableOpacity style={{ flex: 1, }} onPress={() => {
            // openDetail({
            //     initial: false,
            //     params: hit
            // })
            Navigate('PaperDetail', hit);
        }}>
            <Image
                style={{ borderRadius: 4, width: '100%' }}
                height={Dimensions.get('screen').height / 5 + 30}
                source={{ uri: hit?.image_path }}></Image>
            <Text
                style={{ flex: 1, paddingHorizontal: 8, fontSize: 18, fontWeight: 600, color: '#84a9ff', marginTop: 2, }}
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