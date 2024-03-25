import { openDetail } from "@utils/paper";
import { useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const ListPaper = ({ values }) => {

    const renderItem = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: 'rgba(0, 236, 0, 0.4)',
                    padding: 5,
                    borderRadius: 4
                }}
                onPress={() => { openDetail(item) }}
            >
                <Text style={{ fontSize: 16 }}>{item.title}</Text>
            </TouchableOpacity>
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
                ListEmptyComponent={() => {
                    return (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#951cff' }}>Không có kết quả phù hợp!</Text>
                        </View>
                    )
                }}
            >
            </FlatList>
        </View>
    )
}

export default ListPaper;