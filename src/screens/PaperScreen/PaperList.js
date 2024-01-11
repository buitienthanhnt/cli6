import react, { Component, useCallback } from "react";
import { FlatList, StyleSheet, View, Dimensions, Image, Text, TouchableOpacity, LogBox, ScrollView, RefreshControl, Button } from "react-native";
import Config from "@config/Config";
import perf from "@react-native-firebase/perf";
import PaperListFirebase from "./PaperListFirebase";
import remoteConfig from '@react-native-firebase/remote-config';
import CategoryTopFirebase from "./CategoryTopFirebase";

class PaperList extends Component {
    constructor(props) { // https://viblo.asia/p/superprops-trong-constructor-cua-react-component-gGJ59eA15X2
        super(props);
        this.state = {
            items: [],
            refreshing: false,
            topRefresh: false,
            page: 1,
            topCategory: [],
            end: false
        };
    }

    componentDidMount() {
        this.getCategoryTop();
        this.getSourceData();
        // tắt cảnh báo màu vàng trên màn hình dùng: LogBox.
        LogBox.ignoreAllLogs(); // cho tất cả các cảnh báo.
        // LogBox.ignoreLogs(["Failed %s type: %s%s, prop, Invalid prop `color` supplied to `Text`", 'The "source" tag is a valid HTML element but is not handled by this library']);
    }

    getSourceData = async function (paper = false, refresh = false) {
        const listTrace = await perf().startTrace('paper_list_trace');
        listTrace.putMetric("hits", 1);
        if (!this.state.refreshing) {
            this.setState({ refreshing: true });
            // console.log(Config.url + Config.api_request.getpapers + Config.buy_params({ page: this.state.page }));
            const _url = Config.url + Config.api_request.getpapers + Config.buy_params({ page: paper !== false ? paper : this.state.page });
            const data = await fetch(_url);
            const result = await data.json();
            var items = this.state.items;
            if (result.data.length) {
                if (refresh) {
                    items = result.data;
                } else {
                    items.push(...result.data)
                }
                await this.setState({
                    items: items,
                    page: refresh ? 2 : this.state.page += 1,
                    refreshing: false
                });
            } else {
                this.setState({
                    refreshing: false,
                    end: true
                });
            }
        }
        await listTrace.stop();
    }

    getCategoryTop = async () => {
        try {
            const data = await fetch(Config.url + Config.api_request.getCategoryTop);
            const result = await data.json();
            this.setState({
                topCategory: result,
                topRefresh: false
            })
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }

    }

    componentDidUpdate() {
        var items_count = this.state.items.length;
        if (!this.state.refreshing && !this.state.end && (items_count * Dimensions.get("screen").height / 7 < Dimensions.get("screen").height)) {
            this.getSourceData();
        }
    }

    render() { // https://viblo.asia/p/react-native-lifecycle-gAm5yXY8ldb
        const height = Dimensions.get("screen").height;
        const width = Dimensions.get("screen").width;
        const onRefresh = () => {
            this.setState({ topRefresh: true });
            this.getCategoryTop();
            // setTimeout(() => {
            //     this.setState({topRefresh: false});
            // }, 2000);
        }
        return (
            <View style={css.container}>
                <CategoryTopFirebase navigation={this.props.navigation} ></CategoryTopFirebase>
                <PaperListFirebase navigation={this.props.navigation}></PaperListFirebase>
            </View>
        );
    }
}

export class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("PaperDetail", { data: this.props.data });
            }}
            >
                <View style={css.pro_item}>
                    <View style={{ width: "40%" }}>
                        <Image
                            source={{ uri: this.props.data.image_path || remoteConfig().getValue('default_image').asString() }}
                            defaultSource={require('@assets/defaul.png')}
                            style={{ flex: 1, borderRadius: 6 }}></Image>
                    </View>
                    <View style={css.pro_item_title}>
                        <Text style={{ color: "green", fontSize: 16 }} ellipsizeMode='tail' numberOfLines={2}>{this.props.data.title}</Text>
                        <View style={{ paddingLeft: 5 }}>
                            <Text ellipsizeMode='tail' numberOfLines={3}>{this.props.data.short_conten ? this.props.data.short_conten : ""}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export class ProductItemHost extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("PaperDetail", { data: this.props.data });
            }}>
                <View style={css.pro_item_host}>
                    <Image
                        source={{ uri: this.props.data.image_path || remoteConfig().getValue('default_image').asString() }}
                        style={{ flex: 1, borderRadius: 6 }} resizeMode="cover"
                        defaultSource={require('@assets/defaul.png')}
                    ></Image>
                    <Text style={css.pro_item_host_title} ellipsizeMode='tail' numberOfLines={2}>{this.props.data.title}</Text>
                    <View style={{ paddingLeft: 8 }}>
                        <Text ellipsizeMode='tail' numberOfLines={2}>{this.props.data.short_conten}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const css = StyleSheet.create({
    container: {
        flex: 1
    },
    title_container: {
        width: Dimensions.get("screen").width,
        // height: (Dimensions.get("screen").height / 8)+20
    },
    top_title: {
        fontSize: 18,
        fontWeight: "700",
        color: "green"
    },
    top_image: {
        // flex: 1,
        width: "100%",
        height: Dimensions.get("screen").height / 6
    },
    pro_item: {
        width: "100%",
        height: Dimensions.get("screen").height / 7,
        flexDirection: "row",
        padding: 5,
        elevation: 3, //: zindex (works on android)
    },
    pro_item_host: {
        width: "100%",
        height: Dimensions.get("screen").height / 4, padding: 5
    },
    pro_item_host_title: {
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
        color: "blue"
    },
    pro_item_title: {
        width: "60%",
        paddingLeft: 8,
        paddingRight: 8
    }
});

export default PaperList;
