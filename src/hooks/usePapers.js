import {getComments} from "@queries/comments";
import { useQuery } from "react-query";

const usePaperList = ()=>{
    const papersInFirebase = [];
    return {
        data: []
    }
}

const useComments = (paperId, parentId, page)=>{
    const {data} = useQuery({ queryKey: ['comments', paperId, parentId, page], queryFn: () => getComments(paperId, parentId, page || 0) });
    return {
        data
    }
}

export {usePaperList, useComments}