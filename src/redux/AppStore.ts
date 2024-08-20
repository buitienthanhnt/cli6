import {createStore, Reducer} from 'redux'; // npm install redux --save
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {stateByreduces} from './AppReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
};

const pReducer = persistReducer(
  persistConfig,
  stateByreduces as unknown as Reducer,
);

const AppStore = createStore(pReducer);
export const persistor = persistStore(AppStore);
export default AppStore;
