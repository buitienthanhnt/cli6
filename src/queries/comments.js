import Config from "@config/Config";
import axios from "axios";

const getComments = async (paperId, parentId, page) => {
    const url = Config.custom_url() + Config.api_request.getPaperComments + paperId + '?limit=4' + '&p=' + page + (parentId ? '&parent_id=' + parentId : '');
    // console.log(url);
    const waitData = axios.get(url).then((response) => {
        return response.data;
    }).catch(
        (error) => {
            console.log(error);
        }
    );
    return waitData;
}

const addCommentServer = (paperId, params) => {
    const url = Config.custom_url() + Config.api_request.paperAddComment + paperId;
    // console.log(url);
    const waitData = axios.post(url, params).then((response) => {
        return response.data;
    }).catch(
        (error) => {
            console.log(error);
        }
    );
    return waitData;
}

export { getComments, addCommentServer };