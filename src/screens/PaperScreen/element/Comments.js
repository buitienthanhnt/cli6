import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useComments } from "@hooks/usePapers";
import { capitalizeFirstLetter } from "@utils/textHelper";
import { useCallback, useContext, useState } from "react";
import { PaperDetailContext } from "../PaperDetail";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getComments } from "@queries/comments";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";

const Comments = ({ paperId }) => {
    const { data } = useComments(paperId, 0);
    const { commentForm } = useContext(PaperDetailContext);

    if (!data || !data.length) { return null; }
    return (
        <View style={{ paddingVertical: 10 }}>
            <Text style={css.title}>Comment{'                                 '}</Text>
            <CommentsRender comments={data} root={true}></CommentsRender>
            <Modal visible={commentForm} animationType="slide" transparent={false}>
                <CommentForm ></CommentForm>
            </Modal>
        </View>
    )
}

const CommentsRender = ({ comments, parentId, root }) => {
    const { useFirebase } = useSelector((state) => state.defRe);
    const { paperId } = useContext(PaperDetailContext);
    const [page, setPage] = useState(0);
    const [showMore, setShowMore] = useState(true);
    const [comment, setComment, setCommentParent] = useState(comments || []);

    const loadMoreComments = useCallback(async () => {
        const { data } = await getComments(paperId, parentId, page + 1);
        if (data && data.length < 4) {
            setShowMore(false);
        }
        setComment([...comment, ...data]);
        setPage(page + 1);
    }, [paperId, page, comment, parentId]);

    return (
        <View style={css.container}>
            <View style={css.content}>
                {!root && <View style={css.lineConten}></View>}
                {/* <FlatList
                    data={comment}
                    keyExtractor={(item, index) => index + "_" + item.id}
                    renderItem={({ item, index }) => {
                        return <CommentItem comment={item} root={root} index={index} />
                    }}
                    ItemSeparatorComponent={() => {
                        return (<View style={{ height: 8 }}></View>)
                    }}
                ></FlatList> */}

                <View style={{ gap: 4 }}>
                    {comment.map((item, index) => {
                        return <CommentItem comment={item} root={root} index={index} key={index} />
                    })}
                </View>
            </View>
            {comment.length >= 4 && showMore && !useFirebase &&
                <TouchableOpacity style={{ ...css.loadMore, }} onPress={loadMoreComments}>
                    <View style={{ ...css.moreBtn, transform: [{ translateX: !root ? -3 : 0 }] }}>
                        <Icon name='angle-double-down' size={16} color='#821ab2' />
                    </View>
                </TouchableOpacity>
            }
        </View>
    );
}

CommentItem = ({ comment, root }) => {
    const [childrents] = useState(comment.childrents || []);
    const [showRep, setShowRep] = useState(false);
    const { setCommentForm, setCommentParent } = useContext(PaperDetailContext);

    const openCommentForm = useCallback(() => {
        setCommentForm(true);
        setCommentParent(comment.id)
    }, [setCommentForm, setCommentParent, comment.id]);

    return (
        <View>
            <View style={css.row} >
                <TouchableOpacity onPress={() => {
                    setShowRep(false)
                }} style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {!root && <Text style={{ color: '#4e5ae0' }}>--</Text>}
                    <FontAwesome5Icon name='user' size={16} color='#4e5ae0' />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={css.userName}>{comment.name ? ' ' + comment.name : ''}: {' '}
                    </Text>
                    <TouchableOpacity style={{ ...css.moreBtn, alignItems: 'baseline', alignSelf: 'flex-end' }} onPress={openCommentForm}>
                        <Icon name='reply' size={12} color='#f770ff' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingLeft: 5 }}>
                <Text style={css.commentConten} numberOfLines={5}>
                    {comment.content && capitalizeFirstLetter(comment.content)}
                </Text>
            </View>
            {childrents.length >= 1 && (
                showRep ?
                    (<View style={{ paddingLeft: 15 }}>
                        <CommentsRender comments={childrents} parentId={comment.id} root={false}></CommentsRender>
                    </View>) : (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ ...css.moreBtn, marginLeft: 8, transform: [{ rotateZ: '180deg' }] }} onPress={() => {
                                setShowRep(true);
                            }}>
                                <Icon name='reply' size={16} color='#821ab2' />
                            </TouchableOpacity>
                        </View>
                    )
            )}
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row'
    },
    title: {
        textDecorationLine: 'underline',
        color: '#8524ff',
        fontSize: 16
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        gap: 3
    },
    loadMore: {
        borderRadius: 5,
        borderColor: '#ff00d9',
        // alignSelf: 'flex-start'
    },
    userName: {
        color: '#007cff',
        fontSize: 16,
        fontWeight: '600',
    },
    commentConten: {
        fontSize: 13,
        color: '#00a4ff',
    },
    lineConten: {
        width: 1,
        backgroundColor: '#999999',
        opacity: 0.8
    },
    moreBtn: {
        alignItems: 'flex-end',
        alignSelf: 'flex-start'
    },
});

export default Comments;