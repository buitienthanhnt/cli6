import { FlatList, Text, View, Image } from 'react-native';
import { ProductItem, ProductItemHost } from './element';
import { usePapersFirebase } from '@hooks/Firebase';
import CategoryTopFirebase from './CategoryTopFirebase';

const PaperListFirebase = ({navigation})=>{
    return (
        <View style={{ flex: 1 }}>
            <CategoryTopFirebase navigation={navigation} ></CategoryTopFirebase>
            <PaperListFirebaseData navigation={navigation}></PaperListFirebaseData>
        </View>
    );
}

const PaperListFirebaseData = ({ navigation }) => {
    const { data } = usePapersFirebase();
    if (data.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image 
                    source={require("@assets/Ripple-1s-200px.gif")} 
                    style={{ width: 60, height: 60 }}
                >
                </Image>
            </View>);
    }
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    if (index % 5 == 0) {
                        return <ProductItemHost data={item} isFirebase={true} navigation={navigation}></ProductItemHost>
                    }
                    return <ProductItem data={item} isFirebase={true} navigation={navigation}></ProductItem>;
                }}
            ></FlatList>
        </View>
    )
}

export default PaperListFirebase;