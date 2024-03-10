import { Navigate } from "@hooks/Navigate"
import AppStore from "@redux/AppStore";

export const openDetailNext = (params) => {
    Navigate('PaperScreen', { screen: 'PaperDetail', ...params })
};

export const openDetail = (params) => {
    const { defRe } = AppStore.getState();
    Navigate(defRe.useFirebase ? 'PaperDetailFirebase' : 'PaperDetail', params);
}
export const openSearch = (params)=>{
    Navigate('Search', params);
}