import Config from "@config/Config";
import { addCommentServer, getComments } from "@queries/comments";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import firebaseType from "@utils/firebaseType";
import database from '@react-native-firebase/database';
import { useSelector } from "react-redux";

const usePaperList = () => {
    const papersInFirebase = [];
    return {
        data: []
    }
}

const useComments = (paperId, parentId, page) => {
    const { useFirebase } = useSelector((state) => state.defRe);
    const [value, setValue] = useState([]);

    const commentServer = useCallback(async () => {
        const { data } = await getComments(paperId, parentId, page || 0);
        setValue(data || [])
    }, [paperId, parentId, page, setValue])

    useEffect(() => {
        if (useFirebase) {
            const onValueChange = database().ref(firebaseType.realTime.commentPaper + "/" + paperId).on('value', (snapshot) => {
                if (snapshot.numChildren()) {
                    let _data = [];
                    snapshot.forEach(item => {
                        _data = item.val();
                    })
                    setValue(_data);
                };
            });
            return () => database().ref(firebaseType.realTime.commentPaper + "/" + paperId).off('value', onValueChange);
        } else {
            commentServer();
        }
    }, [setValue, paperId])

    const addComment = useCallback((paperId, params) => {
        if (useFirebase) {
            let ref = database().ref(firebaseType.realTime.addComments).push();
            ref.set({ paper_id: paperId, ...params });
            console.log(123123213);
        } else {
            addCommentServer(paperId, params);
        }
    }, []);

    return {
        data: value,
        addComment
    }
}

export { usePaperList, useComments }
