import Config from "@config/Config";
import axios from "axios";

const getComments = (paperId, parentId, page)=>{
    const url = Config.custom_url()+Config.api_request.getPaperComments+paperId+'?limit=1'+'&p='+page;
    const waitData = axios.get(url, {
        parent_id: parentId || 0
    }).then((response)=>{
        return response.data;
    }).catch(
        (error) =>{
            console.log(error);
        }
    );
    return waitData;
}

export default getComments;