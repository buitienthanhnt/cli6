import { useCategoryTop } from '@hooks/Firebase';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, TouchableOpacity, View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';

const CategoryTopFirebase = ({ navigation }) => {
    const [topRefresh, setTopRefresh] = useState(false);
    const { data } = useCategoryTop();

    return (
        <View>
            <ScrollView
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                refreshControl={
                    <RefreshControl refreshing={topRefresh} onRefresh={undefined} />}
            >
                {(
                    () => {
                        if (data) {
                            return data && data.map((item, index) => {
                                return (
                                    <View key={item.id + "top"} style={css.title_container}>
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate("PaperCategoryFirebase", { category_id: item.id })
                                        }}>
                                            <View style={{ flexDirection: "row", justifyContent: "center" }}><Text style={{ fontSize: 18, fontWeight: "600" }}>{item.name}</Text></View>
                                            <Image source={{ uri: item.image_path || remoteConfig().getValue('default_image').asString() }} style={css.top_image} resizeMode="cover" defaultSource={require('../../assets/favicon.png')}></Image>
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

export default CategoryTopFirebase;