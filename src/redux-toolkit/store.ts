import {combineReducers, configureStore} from "@reduxjs/toolkit";
import vacanciesReducer from "./vacancies/vacancies-reducer";


const rootReducer = combineReducers( {
    vacanciesBranch: vacanciesReducer
} );


export const store = configureStore({
    reducer: rootReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch