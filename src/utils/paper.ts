import Config from '@config/Config';
import {Navigate} from '@hooks/Navigate';
import AppStore from '@redux/AppStore';

export const openDetailNext: (params: any) => void = params => {
  Navigate('PaperScreen', {screen: 'PaperDetail', ...params});
};

export const openDetail: (params: any) => void = params => {
  const {defRe} = AppStore.getState();
  Navigate(
    defRe.useFirebase || Config.useFirebase
      ? 'PaperDetailFirebase'
      : 'PaperDetail',
    params,
  );
};
export const openSearch: (params: any) => void = params => {
  if (params.value.length >= 3) {
    Navigate('Search', params);
  }
};
