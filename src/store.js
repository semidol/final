import { configureStore, createSlice } from "@reduxjs/toolkit";

let appState = JSON.parse(localStorage.getItem('appState'));
let initialState = appState ? {
    isAuth: appState.auth.isAuth,
    token: appState.auth.token,
    expire: appState.auth.expire
} :
{
    isAuth: false,
    token: '',
    expire: 0 
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        authorize: (state, action) => {
            state.isAuth = true;
            state.token = action.payload.token;
            state.expire = action.payload.expire;
        },
        logOut: (state) => {
            state.isAuth = false;
            state.token = '';
            state.expire = 0;
        }
    }
})

const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        console.log(getState())
        localStorage.setItem('appState', JSON.stringify(getState()));
        return result;
    };
};

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    middleware: ((getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware))
})

export const {authorize, logOut} = authSlice.actions