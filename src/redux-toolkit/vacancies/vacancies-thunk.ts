import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, AppStateType} from "../store";
import {auth} from "../../api/auth";
import {AxiosError} from "axios/index";
import {createAppAsyncThunk} from "../../api/api";
import {vacanciesAPI} from "../../api/vacancies";
import {FilterType} from "../../api/api-type";




export const getCategories = createAppAsyncThunk('categories',
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
export const getVacancies = createAppAsyncThunk('vacancies',
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