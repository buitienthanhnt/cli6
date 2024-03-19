import React from "react";
import { View, Text } from "react-native";
import ListPaper from "@screens/PaperScreen/element/ListPapers";
import { usePaperByWriter } from "@hooks/usePapers";

const PaperByWriter = ({ route: { params: { id, name } } }) => {
    const data = usePaperByWriter(id);
    return (
        <View style={{ flex: 1, padding: 5 }}>
            <Text style={{ fontSize: 18 }}>Writer: {name}</Text>
            {data?.papers && <ListPaper values={Object.values(data.papers)}></ListPaper>}
        </View>
    )
}

export default PaperByWriter;