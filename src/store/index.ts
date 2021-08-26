import {createStore, combineReducers} from "redux";

// state
export interface loginStateType {
    login: boolean,
}

const loginState: loginStateType = {
    login: false,
}

// action
interface actionType<T> {
    type: string,
    payload: T
}

const SET_LOGIN: string = 'SET_LOGIN';
export const setLoginAction = (login: boolean): actionType<boolean> => ({
    type: SET_LOGIN,
    payload: login
});

// reducer
const loginReducer = (state = loginState, action: actionType<any>): loginStateType => {
    switch (action.type) {
        case SET_LOGIN:
            return {...state, login: action.payload};
        default:
            return state;
    }
}

const rootReducer = {
    loginReducer,
}

export interface rootStateType {
    loginReducer:loginStateType
}

const store = createStore(combineReducers(rootReducer));
export default store;

