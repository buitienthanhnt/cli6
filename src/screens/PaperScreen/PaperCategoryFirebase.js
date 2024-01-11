import { useEffect } from "react";
import { FlatList } from "react-native";
import { ProductItem, ProductItemHost } from "./PaperList";
import { usePaperCategory } from "@hooks/Firebase";

const PaperCategoryFirebase = ({categoryId, navigation}) => {
    useEffect(() => {}, []);

    const {data} = usePaperCategory(categoryId);
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
    );
}

export default PaperCategoryFirebase;