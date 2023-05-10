import {createSlice} from "@reduxjs/toolkit";
import {InitialState} from "./vacancies-type";
import {getCategories, getVacancies} from "./vacancies-thunk";


const vacanciesReducer = createSlice({
        name: 'vacancies',
        initialState: {
            vacancies: null,
            categories: null,
            categoriesNamesKeys: []
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
            }).addCase(getVacancies.fulfilled, (state, action) => {
                state.vacancies = action.payload.objects
            })
        }

    }
)

export default vacanciesReducer.reducer