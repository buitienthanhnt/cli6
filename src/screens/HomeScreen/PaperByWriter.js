import React from "react";
import { View, Text, Image } from "react-native";
import ListPaper from "@screens/PaperScreen/element/ListPapers";
import { usePaperByWriter } from "@hooks/usePapers";

const PaperByWriter = ({ route: { params: { id, name } } }) => {
    const { isLoading, data } = usePaperByWriter(id);
    return (
        <View style={{ flex: 1, padding: 5 }}>
            <Text style={{ fontSize: 18, color: '#db1cff' }}>Tác giả: <Text style={{ color: 'blue' }}>{name}</Text></Text>
            {
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require("@assets/Ripple-1s-200px.gif")} style={{ width: 60, height: 60 }}></Image>
                    </View>
                ) : (
                    data?.data?.papers && <ListPaper values={Object.values(data?.data?.papers)}></ListPaper>
                )
            }
        </View>
    )
}

export default PaperByWriter;