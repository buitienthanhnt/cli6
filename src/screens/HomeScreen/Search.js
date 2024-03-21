import { openDetail } from "@utils/paper";
import { search } from "@queries/paper";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, FlatList } from "react-native";
import { useSearch } from "@hooks/useSearch";

const Search = ({ route: { params: { value } } }) => {
    const { isLoading, data } = useSearch(value);

    return (
        <View style={{ flex: 1, padding: 5, gap: 10 }}>
            <Text>tìm kiếm: <Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 16 }}>{value}</Text></Text>
            {
                !isLoading ? <FlatList
                    data={data || []}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'rgba(0, 255, 188, 0.9)',
                                    // borderWidth: 1, 
                                    borderRadius: 5,
                                    paddingHorizontal: 5,
                                    paddingVertical: 10
                                }}
                                onPress={() => {
                                    console.log(item.title, item.id);
                                    openDetail(item)
                                }}
                            >
                                <Text style={{ fontSize: 16, width: '100%', }}>{item.title}</Text>
                            </TouchableOpacity>
                        )

                    }}
                    extraData={data}>

                </FlatList> :
                    <Text>...loading</Text>
            }
        </View>
    )
}

export default Search;