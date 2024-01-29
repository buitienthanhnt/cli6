import Config from "@config/Config";
import { getComments } from "@queries/comments";
import { useEffect, useState } from "react";
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

    useEffect(() => {
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
    }, [setValue, paperId])

    if (!useFirebase) {
        const { data } = useQuery({ queryKey: ['comments', paperId, parentId, page], queryFn: () => getComments(paperId, parentId, page || 0) });
        return {
            data: data?.data || []
        }
    }

    return {
        data: value
    }
}

export { usePaperList, useComments }