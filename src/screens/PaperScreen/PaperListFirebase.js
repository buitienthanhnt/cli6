import { FlatList } from 'react-native';
import { ProductItem, ProductItemHost } from './PaperList';
import { usePapersFirebase } from '@hooks/Firebase';

const PaperListFirebase = ({navigation}) => {
    const {data} = usePapersFirebase();
    return (
        <FlatList
            data={data}
            // onRefresh={() => {
            //     this.getSourceData(1, true);
            // }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
                if (index % 5 == 0) {
                    return <ProductItemHost data={item} navigation={navigation}></ProductItemHost>
                }
                return <ProductItem data={item} navigation={navigation}></ProductItem>;
            }}   
            // onEndReachedThreshold={0.1}
            // onEndReached={() => {
            //     this.getSourceData();
            // }}
        ></FlatList>
    )
}

export default PaperListFirebase;