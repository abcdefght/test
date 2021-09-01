import {createStore, combineReducers} from "redux";


// state
export interface loginStateType {
    login: boolean,
    productList: any[]
}

const loginState: loginStateType = {
    login: false,
    productList: []
}

// action
interface actionType<T> {
    type: string,
    payload: T
}

const SET_LOGIN: string = 'SET_LOGIN';
const SET_PRODUCT_LIST: string = 'SET_PRODUCT_LIST'

export const setLoginAction = (login: boolean): actionType<boolean> => ({
    type: SET_LOGIN,
    payload: login
});

export const setProductListAction = (productList: any[]) => ({
    type: SET_PRODUCT_LIST,
    payload: productList
})

// reducer
const loginReducer = (state = loginState, action: actionType<any>): loginStateType => {
    switch (action.type) {
        case SET_LOGIN:
            return {...state, login: action.payload};
        case SET_PRODUCT_LIST:
            return {...state, productList: action.payload}
        default:
            return state;
    }
}


const rootReducer = {
    loginReducer,
}

export interface rootStateType {
    loginReducer: loginStateType
}

const store = createStore(combineReducers(rootReducer));
export default store;

