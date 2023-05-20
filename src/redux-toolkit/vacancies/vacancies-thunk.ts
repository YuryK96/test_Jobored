import {AxiosError} from "axios/index";
import {createAppAsyncThunk} from "../../api/api";
import {vacanciesAPI} from "../../api/vacancies";
import {FilterType} from "../../api/api-type";


export const getCategoriesThunk = createAppAsyncThunk('categories',
    async (_, {rejectWithValue}) => {
        try {
            const response = await  vacanciesAPI.getCategories().then( (res)=> res )
            return  response
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message)
        }
    }
)
export const getVacanciesThunk = createAppAsyncThunk('vacancies',
    async (filter:FilterType, {rejectWithValue}) => {
        try {
            const response = await  vacanciesAPI.getVacancies(filter).then( (res)=> res )
            return  response
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message)
        }
    }
)