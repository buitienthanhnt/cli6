import { createStore, combineReducers, applyMiddleware } from 'redux'; // npm install redux --save
import {Reducer , NumberReducer, PaperReducer, AuthenReducer, AppliReducer} from './AppReducer';

const stateByreduces = combineReducers({
	defRe: Reducer,  
	numberRe: NumberReducer, 
	paperRe: PaperReducer, 
	authenRe: AuthenReducer, 
	appRe: AppliReducer
});

const AppStore = createStore(stateByreduces);
export default AppStore;