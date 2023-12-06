import React, { Component } from "react";
import { Button, Text, View, Image, ScrollView } from "react-native";
import Config from "@config/Config";

class Paper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            items: []
        };
    }

    getTestData = async function () {
        // console.log(Config.url + Config.api_request.getpapers + Config.buy_params({ page: this.state.page }));
        const data = await fetch(Config.url + Config.api_request.getpapers + Config.buy_params({ page: this.state.page }));
        const result = await data.json();
        // console.log(result);
        var items = this.state.items;
        items.push(...result.data)
        this.setState({
            items: items,
            page: this.state.page += 1
        });
    }

    render() {
        return (
            <ScrollView 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <Text>account detail</Text>
                {/* render nhiều phần tử */}
                {(() => {
                    if (this.state.items) {
                        var res = [];
                        for (let index = 0; index < this.state.items.length; index++) {
                            res.push(
                                <View key={index}>
                                    <View style={{ flexDirection: "row", padding: 5 }}>
                                        <>
                                            <Image source={{ uri: this.state.items[index].image_path }} style={{ width: 120, height: 120 }} resizeMode="cover"></Image>
                                        </>
                                        <View style={{ paddingLeft: 5, width: 200}}>
                                            <Text>{this.state.items[index].title}</Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, backgroundColor: "blue", margin: 6 }}></View>
                                </View>
                            );
                        }
                        return res;
                    } else {
                        return (<></>)
                    }
                })()}

                {/* <Button title="to Detail product" onPress={() => {
                    this.props.navigation.navigate("ProductScreen", { screen: "Detail" });
                }}></Button> */}

                {/* render có điều kiện */}
                {/* {false && <Text>eeeeee</Text>} */}

                {/* render thường */}
                {/* {<Text>bbbb</Text>} */}

                {/* render với 1 thẻ cha trống */}
                {/* <>
                    <Text>zxc</Text>
                    <Text>ppppppppp</Text>
                </> */}

                {/* <>
                    <Button title="to Paper" onPress={() => {
                        this.props.navigation.navigate("Paper");
                    }}></Button>
                </> */}

                {/* <Text>{"\n"}</Text> */}
                <Button title="load more" onPress={
                    () => {
                        this.getTestData();
                    }
                }></Button>
            </ScrollView>
        );
    }
}

export default Paper;