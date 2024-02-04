import { useCallback, useContext, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PaperDetailContext } from "../PaperContext"
import FormInput from "@elements/FormInput";
import { addCommentServer } from "@queries/comments";
import { useComments } from "@hooks/usePapers";

const CommentForm = ({ parentId }) => {
    const { paperId, commentParent } = useContext(PaperDetailContext);
    const name = useRef(null);
    const email = useRef(null);
    const content = useRef(null);

    const { addComment } = useComments(paperId);

    const onChangeName = useCallback((text) => {
        name.current = text
    }, []);

    const onChangeEmail = useCallback((text) => {
        email.current = text
    }, []);

    const onChangeContent = useCallback((text) => {
        content.current = text
    }, []);

    return (
        <View style={css.container}>
            <Text style={css.title}>Send your comment:</Text>
            <View style={{ flexDirection: 'row', gap: 2 }}>
                <View style={{ flex: 1, height: 50 }}>
                    <FormInput label={'User name'} placeholder={'user name'} onChangeText={onChangeName}></FormInput>
                </View>

                <View style={{ flex: 1, height: 50 }}>
                    <FormInput label={'Email'} placeholder={'user email'} onChangeText={onChangeEmail}></FormInput>
                </View>
            </View>

            <View style={{ height: 80 }}>
                <FormInput label={'Content'} placeholder={'Content'} onChangeText={onChangeContent} numberOfLines={4}></FormInput>
            </View>


            <TouchableOpacity style={css.btn} onPress={() => {
                console.log(name.current, email.current, content.current, commentParent);
                return;
                
                addComment(paperId, {
                    content: content.current,
                    name: name.current,
                    email: email.current,
                    parent_id: commentParent
                })
            }}>
                <Text style={css.submitLabel}>send</Text>
            </TouchableOpacity>

            {/* <Button title="send" ></Button> */}
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        gap: 4,
        paddingBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        // justifyContent: 'flex-end',
        // marginBottom: 100
    },
    btn: {
        height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#62d9ff', borderRadius: 10
    },
    submitLabel: {
        fontSize: 18, fontWeight: 'bold', color: 'white'
    },
    title: {
        textDecorationLine: 'underline', color: '#cd62ff', fontSize: 16
    }
})

export default CommentForm;