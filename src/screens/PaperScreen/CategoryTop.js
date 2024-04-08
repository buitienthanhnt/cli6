import Config from "@config/Config";
import { Component } from "react";
import { Dimensions, Image, LogBox, RefreshControl, ScrollView, Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";

class CategoryTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topRefresh: false,
            topCategory: [],
        }
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
            console.log('===', error);
        }
    }

    componentDidMount() {
        this.getCategoryTop();
        // tắt cảnh báo màu vàng trên màn hình dùng: LogBox.
        LogBox.ignoreAllLogs(); // cho tất cả các cảnh báo.
        // LogBox.ignoreLogs(["Failed %s type: %s%s, prop, Invalid prop `color` supplied to `Text`", 'The "source" tag is a valid HTML element but is not handled by this library']);
    }

    render() {
        const onRefresh = () => {
            this.setState({ topRefresh: true });
            this.getCategoryTop();
            // setTimeout(() => {
            //     this.setState({topRefresh: false});
            // }, 2000);
        }
        
        return (
            <View>
                <ScrollView
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    // decelerationRate={0.5}
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
        )
    }
}

const css = StyleSheet.create({
    title_container: {
        width: Dimensions.get("screen").width,
        // height: (Dimensions.get("screen").height / 8)+20
    },
    top_image: {
        // flex: 1,
        width: "100%",
        height: Dimensions.get("screen").height / 6
    },
});

export default CategoryTop;