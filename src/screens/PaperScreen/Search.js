import { search } from "@queries/paper";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, FlatList } from "react-native";

const Search = ({ route: { params: { value } } }) => {
    const [searchValue, setSearchValue] = useState([]);
    useEffect(() => {
        search(value).then((response) => {
            setSearchValue(response)
        })
    }, []);

    return (
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
            <Text>{value}</Text>
            <FlatList
                data={searchValue}
                keyExtractor={item => item.id}
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={{ backgroundColor: 'violet', borderRadius: 5, padding: 5 }} onPress={()=>{
                            console.log(item.title, item.id);
                        }}>
                            <Text style={{ fontSize: 16, width: '60%' }}>{item.title}</Text>
                        </TouchableOpacity>
                    )

                }}
                extraData={searchValue}>

            </FlatList>
        </View>
    )
}

export default Search;