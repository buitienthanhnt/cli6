import { AppState, Application } from "./AppState";
import actionReducer from "@utils/reduxActiontype";

const Reducer = (state = AppState, action) => {
    let newTaskList = state.data;
    switch (action.type) {
        case actionReducer.reFinish:
            newTaskList[action.value.atIndex].isFinished = true;
            return { ...state, data: newTaskList };
        case actionReducer.reDelete:
            newTaskList = newTaskList.filter((item, i) => i != action.value.atIndex);
            return { ...state, data: newTaskList };
        case actionReducer.reAdd:
            const newTask = { title: action.value.title, isFinished: false };
            return { ...state, data: [...newTaskList, newTask] };
        case actionReducer.reChangePaperId:
            return { ...state, paper_id: action.paper_id };
        case actionReducer.reUpdateSid:
            return {
                ...state, _tha_sid: action.value
            };
        case actionReducer.reUpdateCart:
            return {
                ...state, cart_data: action.value
            };
        case actionReducer.reLogin:
            return {
                ...state, user_data: action.value
            };
        case actionReducer.reLogOut:
            return {
                ...state, user_data: null
            };
        default:
    }
    return state;
};

const NumberReducer = (state = AppState, action) => {
    let new_num;
    switch (action.type) {
        case actionReducer.addNumber:
            new_num = state.number += action.value;
            return { ...state, number: new_num };
        case actionReducer.subNumber:
            new_num = state.number -= 1;
            return { ...state, number: new_num };
        default:
    }
    return state;
};

const PaperReducer = (state = AppState, action) => {
    switch (action.type) {
        case actionReducer.onMessage:
            return { ...state, message_count: state.message_count + 1 };
        default:
    }
    return state;
}

const AuthenReducer = (state = AppState, action) => {
    switch (action.type) {
        case actionReducer.setUser:
            return { ...state, user_data: action.value };
        case actionReducer.clearUser:
            return { ...state, user_data: null };
        default:
    }
    return state;
}

const AppliReducer = (state = Application, action) => {
    switch (action.type) {
        case actionReducer.setLang:
            return { ...state, lang: action.value };
        case actionReducer.setKey:
            return { ...state, key: action.value };
        default:
    }
    return state;
}

export { Reducer, NumberReducer, PaperReducer, AuthenReducer, AppliReducer };