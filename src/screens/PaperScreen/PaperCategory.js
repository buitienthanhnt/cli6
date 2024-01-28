import { Component } from "react";
import { FlatList, StyleSheet, View, Dimensions, Image, LogBox } from "react-native";
import Config from "@config/Config";
import { ProductItem, ProductItemHost } from "./element";

class PaperCategory extends Component {
    constructor(props) { // https://viblo.asia/p/superprops-trong-constructor-cua-react-component-gGJ59eA15X2
        super(props);
        this.state = {
            items: [],
            refreshing: false,
            page: 1,
            end: false,
            category_id: null
        };
    }

    componentDidMount() {
        this.getSourceData();
        // tắt cảnh báo màu vàng trên màn hình dùng: LogBox.
        LogBox.ignoreAllLogs(); // cho tất cả các cảnh báo.
        // LogBox.ignoreLogs(["Failed %s type: %s%s, prop, Invalid prop `color` supplied to `Text`", 'The "source" tag is a valid HTML element but is not handled by this library']);
    }

    getSourceData = async function (paper = false, refresh = false) {
        if (!this.state.refreshing) {
            try {
                this.setState({ refreshing: true, category_id: this.props.route.params.category_id });
                // console.log(Config.url + Config.api_request.getPaperCategory + this.props.route.params.category_id + Config.buy_params({ page: paper !== false ? paper : this.state.page }));
                const data = await fetch(Config.url + Config.api_request.getPaperCategory + this.props.route.params.category_id + Config.buy_params({ page: paper !== false ? paper : this.state.page }));
                const result = await data.json();
                // console.log(result);
                var items = this.state.items;
                if (result.length) {
                    if (refresh) {
                        items = result;
                    } else {
                        items.push(...result)
                    }
                    await this.setState({
                        items: items,
                        page: refresh ? 2 : this.state.page += 1,
                        refreshing: false,
                    });
                } else {
                    this.setState({
                        refreshing: false,
                        end: true
                    });
                }
            } catch (error) {
                console.log('====================================');
                console.log(error);
            }

        }
    }

    componentDidUpdate() {
        // console.log("componentDidUpdate");
        if (this.props.route.params.category_id != this.state.category_id) {
            console.log("====>", this.state.category_id, this.props.route.params.category_id);
            if (this.state.items) {
                this.setState({ items: [] });
                this.getSourceData(1, true);
            }
        }
        var items_count = this.state.items.length;
        if (!this.state.refreshing && !this.state.end && (items_count * Dimensions.get("screen").height / 7 < Dimensions.get("screen").height)) {
            this.getSourceData();
        }
    }

    render() { // https://viblo.asia/p/react-native-lifecycle-gAm5yXY8ldb
        if (!this.state.items.length) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {/* <ActivityIndicator size="small" color="#0000ff" /> */}
                    <Image source={require("../../assets/Ripple-1s-200px.gif")} style={{ width: 60, height: 60 }}></Image>
                </View>
            );
        }

        return (
            <View style={css.container}>
                {this.state.items.length && <FlatList
                    data={this.state.items}
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
                ></FlatList>}
            </View>
        );
    }
}

const css = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default PaperCategory;