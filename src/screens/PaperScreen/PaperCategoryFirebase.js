import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { ProductItem, ProductItemHost } from "./element";
import { usePaperCategory } from "@hooks/Firebase";

const PaperCategoryFirebase = ({navigation, route: {params}}) => {
    useEffect(() => { }, []);
    const { data } = usePaperCategory(params.category_id);

    return (
        <View style={{ flex: 1 }}>
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
        </View>
    );
}

export default PaperCategoryFirebase;