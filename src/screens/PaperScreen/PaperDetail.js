import react, { useCallback, useEffect, useState, createContext, useRef } from "react";
import { Dimensions, Image, ScrollView, RefreshControl, Text, View, StyleSheet, Button } from "react-native";
import Config from "@config/Config";
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';   // npm install @native-html/iframe-plugin
import RenderHTML from 'react-native-render-html';                          // npm install react-native-render-html
import WebView from 'react-native-webview';                                 // npm install react-native-webview
import Wishlist from "@screens/AccountScreen/Wishlist";
import perf from "@react-native-firebase/perf";
import Comments from "./element/Comments";
import DetailLike from "./element/DetailLike";
import { PaperDetailContext } from "./PaperContext";
import CarolParax from "@screens/CodeScreen/components/animated/CarolParax";
import { layoutDimension } from "@styles/css";

const renderers = {
    iframe: IframeRenderer
};

const customHTMLElementModels = {
    iframe: iframeModel
};

const PaperDetail = ({ navigation, route }) => {
    // use custom hook
    // gan bien detail banfg gia tri bien data(detail = data)
    // const {isLoading, data: detail, error} = useFect(Config.url + Config.api_request.getPaperDetail + (route.params?.paper_id || route.params.data.id));
    const [detail, setDetail] = useState(null);
    const [showWebview, setShowwebview] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [commentParent, setCommentParent] = useState(null);
    const refRBSheet = useRef();

    useEffect(() => {
        // console.log(route.params.data.id);
        if (route.params.paper_id != undefined) {
            getDetailPaper(route.params.paper_id);
        } else {
            getDetailPaper(route.params.data.id);
        }
    }, [route.params]
    );

    const getDetailPaper = useCallback(async (paper_id = 0) => {
        const traceInitScreen = await perf().startTrace('detail_trace');
        traceInitScreen.putMetric("hits", 1);
        if (paper_id) {
            try {
                setRefreshing(true);
                const detail = await fetch(Config.url + Config.api_request.getPaperDetail + paper_id);
                var result = await detail.json();
                setRefreshing(false);
                if (result) {
                    setDetail(result);
                } else {
                    navigation.goBack();
                }
            } catch (error) {
                navigation.goBack();
            }
        }
        // console.log(traceInitScreen);
        await traceInitScreen.stop()
    }, []);

    const onRefresh = () => {
        if (route?.params?.data?.id) {
            getDetailPaper(route.params.data.id);
        }
    }

    if (detail) {
        if (showWebview) {
            return <WebView source={{ uri: "www.topsy-fashion.nl" }} />
        }
        return (
            <PaperDetailContext.Provider value={{paperId: detail.id, url: detail.url, title: detail.title, refRBSheet, commentParent, setCommentParent}}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={css.container}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <Text style={{ fontSize: 18, fontWeight: "600", color: "green", textDecorationLine: "underline" }}>{detail.title}</Text>
                    {/* <RenderHTML contentWidth={Dimensions.get("screen").width} source={{ html }}></RenderHTML> */}
                    <RenderHTML
                        renderers={renderers}
                        WebView={WebView}
                        source={{ html: detail?.conten || '' }}
                        contentWidth={Dimensions.get("screen").width}
                        customHTMLElementModels={customHTMLElementModels}
                        defaultWebViewProps={
                            {
                                /* Any prop you want to pass to all WebViews */
                            }
                        }
                        renderersProps={{
                            iframe: {
                                scalesPageToFit: true,
                                webViewProps: {
                                    /* Any prop you want to pass to iframe WebViews */
                                }
                            }
                        }}
                        onPress={(event) => { return undefined; }}
                    />
                    <DetailLike info={detail.info}></DetailLike>
                    <Comments paperId={detail.id}></Comments>
                    <View style={{ height: 1, backgroundColor: "black" }}></View> 

                    <CarolParax data={[
    {
      "id": 124,
      "title": "Tự mua Linux  Server và deploy một project Laravel",
      "url_alias": "tu-mua-linux--server-va-deploy-mot-project-laravel",
      "short_conten": "Tự mua Linux Server và deploy một project...",
      "active": 0,
      "show": 0,
      "show_time": null,
      "image_path": "http://192.168.100.156/laravel1/public/storage/files/shares/images up/error.PNG",
      "tag": null,
      "auto_hide": 0,
      "writer": "1",
      "show_writer": 0,
      "deleted_at": null,
      "created_at": "2024-02-16T09:55:06.000000Z",
      "updated_at": "2024-02-16T09:55:06.000000Z",
      "info": {
        "view_count": "1",
        "comment_count": 0,
        "like": "",
        "heart": ""
      }
    },
    {
      "id": 123,
      "title": "Người Việt làm chủ công nghệ xây cầu dây văng",
      "url_alias": "nguoi-viet-lam-chu-cong-nghe-xay-cau-day-vang---vnexpress",
      "short_conten": "Người Việt làm chủ công nghệ xây cầu dây văng",
      "active": 0,
      "show": 0,
      "show_time": null,
      "image_path": "http://192.168.100.156/laravel1/public/storage/files/shares/images up/d-1690812430.jpg",
      "tag": null,
      "auto_hide": 0,
      "writer": "1",
      "show_writer": 0,
      "deleted_at": null,
      "created_at": "2024-02-15T02:36:35.000000Z",
      "updated_at": "2024-02-15T02:47:23.000000Z",
      "info": {
        "view_count": "4",
        "comment_count": 0,
        "like": "1",
        "heart": "2"
      }
    },
    {
      "id": 122,
      "title": "Microsoft đưa ra cảnh báo về tấn công lừa đảo",
      "url_alias": "microsoft-dua-ra-canh-bao-ve-tan-cong-lua-dao",
      "short_conten": "Trong tuần qua, Microsoft đã thông báo rằng nhóm tấn công APT29, được...",
      "active": 0,
      "show": 0,
      "show_time": null,
      "image_path": "http://192.168.100.156/laravel1/public/storage/files/shares/images up/error.PNG",
      "tag": null,
      "auto_hide": 0,
      "writer": "1",
      "show_writer": 0,
      "deleted_at": null,
      "created_at": "2024-02-06T02:49:38.000000Z",
      "updated_at": "2024-02-06T02:49:38.000000Z",
      "info": {
        "view_count": "3",
        "comment_count": 2,
        "like": "1",
        "heart": "1"
      }
    },
    {
      "id": 121,
      "title": "NATO Có Thể Đẩy Xung Đột Nga-Ukraine Lên Cấp Độ Chiến Tranh Thế Giới",
      "url_alias": "nato-co-the-day-xung-dot-nga-ukraine-len-cap-do-chien-tranh-the-gioi",
      "short_conten": "Trong bối cảnh xung đột Nga - Ukraine đang diễn ra, tờ Global Times của...",
      "active": 0,
      "show": 0,
      "show_time": null,
      "image_path": "http://192.168.100.156/laravel1/public/storage/files/shares/images up/vom_sat_israel.jpg",
      "tag": null,
      "auto_hide": 0,
      "writer": "1",
      "show_writer": 0,
      "deleted_at": null,
      "created_at": "2024-02-06T02:47:41.000000Z",
      "updated_at": "2024-02-06T02:47:41.000000Z",
      "info": {
        "view_count": "4",
        "comment_count": 0,
        "like": "1",
        "heart": ""
      }
    },
    {
      "id": 120,
      "title": "Dự báo thời tiết hôm nay: Bắc Bộ đón rét đậm dịp Giao thừa, Tết Nguyên đán sẽ ra sao?",
      "url_alias": "du-bao-thoi-tiet-hom-nay-bac-bo-don-ret-dam-dip-giao-thua-tet-nguyen-dan-se-ra-sao",
      "short_conten": "Từ đêm mai 7/2, Bắc Bộ đón đợt không khí lạnh tăng cường, chuyển...",
      "active": 0,
      "show": 0,
      "show_time": null,
      "image_path": "http://192.168.100.156/laravel1/public/storage/files/shares/images up/175769184-4107544292648392-374037799264221685-n-jpeg-1690811733.jpg",
      "tag": null,
      "auto_hide": 0,
      "writer": "1",
      "show_writer": 0,
      "deleted_at": null,
      "created_at": "2024-02-06T02:16:48.000000Z",
      "updated_at": "2024-02-06T02:29:04.000000Z",
      "info": {
        "view_count": "15",
        "comment_count": 1,
        "like": "8",
        "heart": "3"
      }
    },
    {
      "id": 119,
      "title": "Nhất chi mai thân phủ đầy rêu giá chục triệu vẫn hút khách mua",
      "url_alias": "nhat-chi-mai-than-phu-day-reu-gia-chuc-trieu-van-hut-khach-mua",
      "short_conten": "Những ngày cận Tết, nhiều loại hoa, cây cảnh được bày bán nhiều...",
      "active": 0,
      "show": 0,
      "show_time": null,
      "image_path": "http://192.168.100.156/laravel1/public/storage/files/shares/images up/aj5i3496-47-1707017260535-17070172610271722167421.jpg",
      "tag": null,
      "auto_hide": 0,
      "writer": "1",
      "show_writer": 0,
      "deleted_at": null,
      "created_at": "2024-02-05T02:53:50.000000Z",
      "updated_at": "2024-02-05T02:53:50.000000Z",
      "info": {
        "view_count": "2",
        "comment_count": 0,
        "like": "",
        "heart": ""
      }
    }
  ]}></CarolParax>
                    <LastNews paper_id={route?.params?.data?.id || 1} navigation={navigation}></LastNews>
                    <View style={{ height: 1, backgroundColor: "black", marginBottom: 10 }}></View>
                    <Button title="view in webview" onPress={() => {
                        setShowwebview(true)
                    }}></Button>
                   
                </ScrollView>
            </PaperDetailContext.Provider>
        );
    } else {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <ActivityIndicator size="small" color="#0000ff" /> */}
                <Image source={require("@assets/Ripple-1s-200px.gif")} style={{ width: 60, height: 60 }}></Image>
            </View>);
    }
}

const LastNews = (props) => {
    const { paper_id, navigation } = props;
    const [data, setData] = useState(['1', "2", "3", "4", "5"]);

    const getRelatedPaper = async () => {
        try {
            let request_api = Config.url + Config.api_request.getRelatedPaper + paper_id;
            const response = await fetch(request_api);
            const _data = await response.json();
            setData(_data?.["items"]);
        } catch (error) { console.log(error); }
    }
    useEffect(() => {
        // console.log(paper_id);
    }, [])

    return (
        <View style={{ paddingBottom: 20 }}>
            <Wishlist navigation={navigation}></Wishlist>
        </View>
    );
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        paddingBottom: layoutDimension.bottomTabHeight,
        // backgroundColor: "#d6ffc6"
    }
})

export default PaperDetail;