import { FlatList, Text, View, Image } from 'react-native';
import { ProductItem, ProductItemHost } from './PaperList';
import { usePapersFirebase } from '@hooks/Firebase';

const PaperListFirebase = ({ navigation }) => {
    const { data } = usePapersFirebase();
    if (data.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("@assets/Ripple-1s-200px.gif")} style={{ width: 60, height: 60 }}></Image>
            </View>);
    }
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
                if (index % 5 == 0) {
                    return <ProductItemHost data={item} navigation={navigation}></ProductItemHost>
                }
                return <ProductItem data={item} navigation={navigation}></ProductItem>;
            }}
        ></FlatList>
    )
}

export default PaperListFirebase;