import { configureStore, createSlice } from "@reduxjs/toolkit";

let appState = JSON.parse(localStorage.getItem('appState'));
let initialStateAuth = appState ? {
    isAuth: appState.auth.isAuth,
    token: appState.auth.token,
    expire: appState.auth.expire
} :
{
    isAuth: false,
    token: '',
    expire: 0 
}

let initialStateDocs = appState && appState.documents ? {
    issueDateInterval: {
        startDate: appState.documents.issueDateInterval.startDate,
        endDate: appState.documents.issueDateInterval.endDate
    },
    inn: appState.documents.inn,
    tonality: appState.documents.tonality,
    limit: appState.documents.limit,
} :
{
    issueDateInterval: {
        startDate: '',
        endDate: ''
    },
    inn: 0,
    tonality: '',
    limit: 0, 
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateAuth,
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

const documentsSlice = createSlice({
    name: 'documents',
    initialState: initialStateDocs,
    reducers: {
        setDocs: (state, action) => {
            state.issueDateInterval.startDate = action.payload.issueDateInterval.startDate;
            state.issueDateInterval.endDate = action.payload.issueDateInterval.endDate;
            state.inn = action.payload.inn;
            state.tonality = action.payload.tonality;
            state.limit = action.payload.limit;
        }
    }
})

const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        localStorage.setItem('appState', JSON.stringify(getState()));
        return result;
    };
};

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        documents: documentsSlice.reducer
    },
    middleware: ((getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware))
})

export const {authorize, logOut} = authSlice.actions;
export const {setDocs} = documentsSlice.actions;