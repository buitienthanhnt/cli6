import { Navigate } from "@hooks/Navigate"

export const openDetailNext = (params) => {
    Navigate('PaperScreen', {screen: 'PaperDetail', ...params })
};

export const openDetail = (params)=>{
    Navigate('PaperDetail', params);
}