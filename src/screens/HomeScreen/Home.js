import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";

import PageList from "@config/PageList";

const Home = (props) => {
    const [load, setLoad] = useState(false);
    const [data, setData] = useState(PageList);
    const [width, setWidth] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setData({ values: data.values.reverse() });
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
        console.log("ON LAYOUT", width, height);
        setWidth(width)
      }, []); 

    return (
        <View style={{ flex: 1 }} >
            <View style={{ flex: 8 }} onLayout={onPageLayout}>
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