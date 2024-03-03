import { Navigate } from "@hooks/Navigate"

export const openDetail =(params) => {
    Navigate('PaperScreen', {screen: 'PaperDetail', ...params })
};