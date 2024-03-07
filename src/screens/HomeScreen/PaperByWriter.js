import { View, Text } from "react-native";
import ListPaper from "@screens/PaperScreen/element/ListPapers";
import { usePaperByWriter } from "@hooks/usePapers";

const PaperByWriter = ({route: {params: {id}}})=>{
    const data = usePaperByWriter(id);

    return(
        <View style={{flex: 1}}>
            <Text>writer get paper</Text>
            <ListPaper values={Object.values(data.papers)}></ListPaper>
        </View>
    )
}

export default PaperByWriter;