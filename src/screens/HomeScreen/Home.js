import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";

import PageList from "@config/PageList";

const Home = (props) => {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState(PageList);

    useEffect(() => {
        setTimeout(() => {
            setData({ values: data.values.reverse() });
        }, 3000);
    }, [])

    return (
        <View style={{ flex: 1 }}>
           
            <View style={{ flex: 8 }}>
                <FlatList
                    data={data.values}
                    numColumns={2}
                    horizontal={false}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{ flex: 1, padding: 3 }} onPress={() => {
                                console.log(123);
                            }}>
                                <View style={{ width: "100%", height: 120, borderWidth: 1 }}>
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
        </View>
    )
}

export default Home;