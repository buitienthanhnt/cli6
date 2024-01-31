import Config from "@config/Config"
import axios from "axios";

export const addLike = async (paperId, params) => {
    const url = Config.custom_url()+Config.api_request.paperAddLike+paperId;
    console.log(url, params);
    return axios.post(url, params).then((response)=>{
        console.log(response.data);
        return response.data
    }).catch((error)=>{
        console.log(error);
    });
}