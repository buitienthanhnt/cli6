import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, Text, View, StyleSheet, Button } from "react-native";
import Config from "@config/Config";
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';   // npm install @native-html/iframe-plugin
import RenderHTML from 'react-native-render-html';                          // npm install react-native-render-html
import WebView from 'react-native-webview';                                 // npm install react-native-webview
import Wishlist from "@screens/AccountScreen/Wishlist";
import { usePaperDetailFirebase } from "@hooks/Firebase";
import RelatedFirebase from './element/RelatedFirebase';
import Comments from "./element/Comments";
import { PaperDetailContext } from "./PaperContext";

const renderers = {
    iframe: IframeRenderer
};

const customHTMLElementModels = {
    iframe: iframeModel
};

const PaperDetailFirebase = ({ navigation, route }) => {
    const { detail } = usePaperDetailFirebase(route.params.data.id)
    const [showWebview, setShowwebview] = useState(false);
    const [commentParent, setCommentParent] = useState(null);
    const refRBSheet = useRef();
    useEffect(() => { }, []);

    if (detail) {
        if (showWebview) {
            return <WebView source={{ uri: "www.topsy-fashion.nl" }} />
        }
        return (
            <PaperDetailContext.Provider value={{ paperId: detail.id, refRBSheet, commentParent, setCommentParent }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={css.container}
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
                    <Comments paperId={detail.id}></Comments>
                    <View style={{ height: 1, backgroundColor: "black" }}></View>
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

const LastNews = ({ paper_id, navigation }) => {
    return (
        <View style={{ paddingBottom: 20 }}>
            <RelatedFirebase navigation={navigation}></RelatedFirebase>
        </View>
    );
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        // backgroundColor: "#d6ffc6"
    }
})

export default PaperDetailFirebase;