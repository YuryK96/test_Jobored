import {Action, AnyAction, createSlice, isPending, ThunkDispatch} from "@reduxjs/toolkit";
import {InitialState} from "./vacancies-type";
import {getCategories, getVacancies} from "./vacancies-thunk";


const vacanciesReducer = createSlice({
        name: 'vacancies',
        initialState: {
            vacancies: null,
            categories: null,
            categoriesNamesKeys: [],
            error: null,
            isPending: {
                vacancies: null,
                categories: null
            },
        } as InitialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getCategories.fulfilled, (state, action) => {
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
            }).addCase(getVacancies.fulfilled, (state, action) => {
                state.vacancies = action.payload.objects
                state.isPending.vacancies = false
            }).addCase(getVacancies.pending, (state, action) => {
                state.isPending.vacancies = true
            }).addCase(getCategories.pending, (state, action) => {
                state.isPending.categories = true
            }).addMatcher((action: AnyAction) => action.type.endsWith('rejected'), (state, action) => {
                state.error = action.payload;
                state.isPending.categories = false
                state.isPending.vacancies = false

            })
        }

    }
)


export default vacanciesReducer.reducer