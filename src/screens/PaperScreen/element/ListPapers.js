import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";

const ListPaper = ({ values }) => {

    const renderItem = useCallback(({ item, index }) => {
        return (
            <View style={{backgroundColor: '#00ff86', padding: 5}}>
                <Text>{item.title}</Text>

            </View>
        )
    }, [])

    return (
        <View style={{ flex: 1, }}>
            <FlatList
                contentContainerStyle={{ gap: 10 }}
                data={values}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                extraData={values}
            >
            </FlatList>
        </View>
    )
}

export default ListPaper;