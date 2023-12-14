import { createStore, combineReducers, applyMiddleware } from 'redux'; // npm install redux --save
import {Reducer , NumberReducer, PaperReducer, AuthenReducer, AppliReducer} from './AppReducer';

const reduces = combineReducers({
	defRe: Reducer,  
	numberRe: NumberReducer, 
	paperRe: PaperReducer, 
	authenRe: AuthenReducer, 
	appRe: AppliReducer
});
const AppStore = createStore(reduces);
export default AppStore;