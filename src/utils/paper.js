import { Navigate } from "@hooks/Navigate"

export const openDetail =(params) => {
    // console.log(params);
    Navigate('PaperDetail', params.params )
};