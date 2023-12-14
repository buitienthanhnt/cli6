import {AppState, Application} from "./AppState";

const Reducer = (state = AppState, action) => {
    let newTaskList = state.data;
    switch (action.type) {
        case 'FINISH':
            newTaskList[action.atIndex].isFinished = true;
            return { ...state, data: newTaskList };
            break;
        case 'DELETE':
            newTaskList = newTaskList.filter((item, i) => i != action.atIndex);
            return { ...state, data: newTaskList };
            break;
        case 'ADD':
            const newTask = { title: action.title, isFinished: false };
            return { ...state, data: [...newTaskList, newTask] };
            break;
        case 'CHANGE_PAPER_ID':
            return { ...state, paper_id: action.paper_id };
            break;
        case 'UPDATE_SID':
            return {
                ...state, _tha_sid: action.sid
            };
            break;
        case 'UPDATE_CART':
            return {
                ...state, cart_data: action.cart_data
            };
            break;
        case 'LOGIN':
            return {
                ...state, user_data: action.user_data
            };
            break;
        case 'LOGOUT':
            return {
                ...state, user_data: null
            };
            break;
        default:
            break;
    }
    return state;
};

const NumberReducer = (state = AppState, action) => {
    let new_num;
    switch (action.type) {
        case "ADD_NUMBER":
            new_num = state.number += action.value;
            return { ...state, number: new_num };
            break;
        case "SUB_NUMBER":
            new_num = state.number -= 1;
            return { ...state, number: new_num };
            break;
        default:
            break;
    }
    return state;
};

const PaperReducer = (state = AppState, action)=>{
    switch (action.type) {
        case "ON_MESSAGE":
            return {...state, message_count: state.message_count + 1};
            break;
    
        default:
            break;
    }
    return state;
}

const AuthenReducer = (state = AppState, action)=>{
    switch (action.type) {
        case "SET_USER":
            return {...state, user_data: action.user_data};
            break;
        case "CLEAR_USER":
            return {...state, user_data: null};
            break;
        default:
            break;
    }
    return state;
}

const AppliReducer = (state = Application, action)=>{
    switch (action.type) {
        case "SET_LANG":
            return {...state, lang: action.lang};
            break;
        case "SET_KEY":
            return {...state, key: action.key};
            break;
        default:
            break;
    }
    return state;
}

export { Reducer, NumberReducer, PaperReducer, AuthenReducer, AppliReducer};