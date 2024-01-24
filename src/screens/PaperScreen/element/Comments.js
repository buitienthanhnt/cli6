import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useComments } from "@hooks/usePapers";
import { capitalizeFirstLetter } from "@utils/textHelper";
import { useCallback, useContext, useMemo, useState } from "react";
import { PaperDetailContext } from "../PaperDetail";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import getComments from "@queries/getComments";

const Comments = ({ paperId }) => {
    const { data } = useComments(paperId, 0);

    if (!data || data.data.length === 0) {
        return null
    }

    return (
        <View style={{ flex: 1 }}>
            {data && data.data && <CommentsRender comments={data.data}></CommentsRender>}
        </View>
    )
}

const CommentsRender = ({ comments, parentId }) => {
    const { paperId } = useContext(PaperDetailContext);
    const [page, setPage] = useState(0);
    const [comment, setComment] = useState(comments || []);

    const loadMoreComments = useCallback(async () => {
        const data = await getComments(paperId, parentId, page + 1);
        setComment([...comment, ...data.data]);
        setPage(old => page + 1);
    }, [paperId, page, comment, parentId]);

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={comment}
                keyExtractor={(item, index) => index + "_"}
                renderItem={({ item, index }) => {
                    return <CommentItem comment={item} onMore={loadMoreComments} />
                }}
            ></FlatList>
            {comment.length >= 1 && <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={loadMoreComments}>
                    <Icon name='sort-desc' size={16} color='tomato' />
                </TouchableOpacity>
            </View>}
        </View>
    );
}

CommentItem = ({ comment, onMore }) => {
    const [childrents, setChildrents] = useState(comment.childrents || []);

    return (
        <View>
            <View style={{ flexDirection: 'row', }}>
                <FontAwesome5Icon name='user' size={16} color='#007cff' />
                <Text style={{ color: '#007cff', fontSize: 16, fontWeight: '600' }}> {comment.name}:</Text>
            </View>
            <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14 }} numberOfLines={5}>{comment.content && capitalizeFirstLetter(comment.content)}</Text>
            </View>
            {childrents &&
                <View style={{ paddingLeft: 15 }}>
                    <CommentsRender comments={childrents} parentId={comment.id}></CommentsRender>
                    {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                       {childrents.length >= 1 &&  <TouchableOpacity onPress={onMore}>
                            <Icon name='sort-desc' size={16} color='#6800ff' />
                        </TouchableOpacity>}
                    </View> */}
                </View>
            }
        </View>
    )
}

export default Comments;