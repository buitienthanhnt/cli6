import react, { Component, useCallback } from "react";
import { FlatList, StyleSheet, View, Dimensions, Image, Text, TouchableOpacity, LogBox, ScrollView, RefreshControl, Button } from "react-native";
import Config from "@config/Config";
import perf from "@react-native-firebase/perf";
import { ProductItem, ProductItemHost } from "./element";

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
                <View >
                    <ScrollView
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        refreshControl={
                            <RefreshControl refreshing={this.state.topRefresh} onRefresh={onRefresh} />}
                    >
                        {(
                            () => {
                                if (this.state.topCategory) {
                                    return this.state.topCategory && this.state.topCategory.map((item, index) => {
                                        return (
                                            <View key={item.id} style={css.title_container}>
                                                <TouchableOpacity onPress={() => {
                                                    this.props.navigation.navigate("PaperCategory", { category_id: item.id })
                                                }}>
                                                    <View style={{ flexDirection: "row", justifyContent: "center" }}><Text style={{ fontSize: 18, fontWeight: "600" }}>{item.name}</Text></View>
                                                    <Image source={{ uri: item.image_path }} style={css.top_image} resizeMode="cover" defaultSource={require('../../assets/favicon.png')}></Image>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    });
                                } else {
                                    return <Image source={require("../../assets/Ripple-1s-200px.gif")} style={{ width: 60, height: 60 }}></Image>;
                                }
                            }
                        )()}
                    </ScrollView>
                </View>

                <FlatList // use online api server
                    data={this.state?.items}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.getSourceData(1, true);
                    }}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        if (index % 5 == 0) {
                            return <ProductItemHost data={item} navigation={this.props.navigation}></ProductItemHost>
                        }
                        return <ProductItem data={item} navigation={this.props.navigation}></ProductItem>;
                    }}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                        this.getSourceData();
                    }}
                ></FlatList>
            </View>
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
});

export default PaperList;
