import getComments from "@queries/getComments";
import { useQuery } from "react-query";

const usePaperList = ()=>{
    const papersInFirebase = [];
    return {
        data: []
    }
}

const useComments = (paperId, parentId)=>{
    const {data} = useQuery({ queryKey: ['comments', paperId, parentId], queryFn: () => getComments(paperId, parentId) });
    return {
        data
    }
}

export {usePaperList, useComments}