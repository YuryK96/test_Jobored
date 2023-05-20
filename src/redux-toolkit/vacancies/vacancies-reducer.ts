import {AnyAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialState, VacancyHeaderType} from "./vacancies-type";
import {getCategoriesThunk, getVacanciesThunk} from "./vacancies-thunk";
import {authorizationThunk} from "../auth/auth-thunk";


const vacanciesReducer = createSlice({
        name: 'vacancies',
        initialState: {
            vacancies: null,
            categories: null,
            categoriesNamesKeys: [],
            favorites: [],
            error: null,
            isPending: {
                vacancies: null,
                categories: null,
                auth: false,

            },
        } as InitialState,
        reducers: {
            addFavoritesAC ( state, action: PayloadAction<VacancyHeaderType[]> ){

                state.favorites = action.payload
            },
        },
        extraReducers: (builder) => {
            builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
                if (action.payload) {
                    state.categories = action.payload

                    if (state.categoriesNamesKeys.length === 0) {
                        action.payload.forEach((category) => {
                            state.categoriesNamesKeys.push({
                                title: category.title_rus,
                                key: category.key
                            })
                        })
                    } else if (state.categoriesNamesKeys.length !== action.payload.length) {
                        action.payload.forEach((category) => {
                            state.categoriesNamesKeys.find((item) =>
                                item.key !== category.key ? state.categoriesNamesKeys.push({
                                    title: category.title_rus,
                                    key: category.key
                                }) : false)
                        })
                    }


                }
                state.isPending.categories = false
            }).addCase(getVacanciesThunk.fulfilled, (state, action) => {
                state.vacancies = action.payload.objects
                state.isPending.vacancies = false
            }).addCase(getVacanciesThunk.pending, (state, action) => {
                state.isPending.vacancies = true
            }).addCase(getCategoriesThunk.pending, (state, action) => {
                state.isPending.categories = true
            }).addCase(authorizationThunk.pending, (state, action) => {
                state.isPending.auth = true
            }).addCase(authorizationThunk.fulfilled, (state, action) => {
                state.isPending.auth = false
            }).addMatcher((action: AnyAction) => action.type.endsWith('rejected'), (state, action) => {
                state.error = action.payload;
                state.isPending.categories = false
                state.isPending.vacancies = false
                state.isPending.auth = false

            })
        }

    }
)

export const { addFavoritesAC} = vacanciesReducer.actions
export default vacanciesReducer.reducer