import { useComments } from "@hooks/usePapers";
import { FlatList, Text, View } from "react-native";

const Comments = ({ paperId }) => {
    const { data } = useComments(paperId, 0);

    if (data && data.data.lenght === 0) {
        return (
            <Text>the paper not has comments!!!</Text>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {data && <CommentsRender comments={data.data}></CommentsRender>}
        </View>
    )
}

const CommentsRender = ({comments}) => {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={comments}
                keyExtractor={(item, index) => index + "_"}
                renderItem={({ item, index }) => {
                    return <CommentItem comment={item} />
                }}
            ></FlatList>
            {/* {comments && comments.data.map((item)=>{
                return <CommentItem comment={item}/>
            })} */}
        </View>
    );
}

CommentItem = ({ comment }) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', }}>
                <Text style={{ color: '#00e9ff', fontSize: 16 }}>{comment.name} </Text>
                <Text style={{ color: '#f074ff', fontSize: 12, verticalAlign: 'bottom' }}>{comment.email}</Text>
            </View>
            <View style={{paddingLeft: 5}}>
            <Text>{comment.content}</Text>
            </View>
            {comment.childrents && 
            <View style={{paddingLeft: 15}}>
                <CommentsRender comments={comment.childrents}></CommentsRender></View>}
        </View>
    )
}

export default Comments;