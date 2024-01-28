import { useRelatedPaper } from '@hooks/Firebase';
import {
    Text,
    View,
    SafeAreaView, TouchableOpacity, StyleSheet, Image
} from 'react-native';
//   npm install --save react-native-snap-carousel ||(type Typescript) npm install --save @types/react-native-snap-carousel
import Carousel from 'react-native-snap-carousel'; // https://www.npmjs.com/package/react-native-snap-carousel#example
import remoteConfig from '@react-native-firebase/remote-config';

const RelatedFirebase = ({ navigation }) => {
    const { data } = useRelatedPaper();
    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={css.item} activeOpacity={1} // không làm mờ khi nhấn vào.
                onPress={() => {
                    navigation.push("PaperDetailFirebase", { data: item }); // dùng push để  chuyển hướng trong cùng trang với props thay đổi.  
                }}
            >
                <View style={{ paddingLeft: 8 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#5877f4" }}>{item.title}</Text>
                </View>
                <Image source={{ uri: item.image_path || remoteConfig().getValue('default_image').asString() }} style={{ flex: 1 }}></Image>
            </TouchableOpacity>
        )
    }

    if (data.length == 0) {
        return <View style={{ flexDirection: "row", justifyContent: "center" }}><Image source={require("../../../assets/Ripple-1s-200px.gif")} style={{ width: 60, height: 60 }}></Image></View>;
    }
    return (
        <SafeAreaView style={css.area}>
            <View style={{ paddingLeft: 8, marginBottom: 8 }}>
                <Text style={{ color: "#d31bd6", fontSize: 16, fontWeight: 600 }}>Tin liên quan:</Text>
            </View>
            <View style={css.container1}>
                <Carousel
                    layout={"stack"}
                    data={data}
                    sliderWidth={400}
                    itemWidth={360}
                    renderItem={_renderItem}
                    onSnapToItem={index => { }}
                />
            </View>
        </SafeAreaView>
    );
}

const css = StyleSheet.create({
    area: {
        flex: 1,
        paddingTop: 8,
        borderRadius: 12,
    },
    item: {
        borderRadius: 5,
        height: 250,
        backgroundColor: '#ffdc9b',
    },
    container1: {
        flex: 1, flexDirection: 'row',
        justifyContent: 'center',
        paddingRight: 4
    }
});

export default RelatedFirebase;

