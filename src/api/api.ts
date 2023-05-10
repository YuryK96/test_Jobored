import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, AppStateType} from "../redux-toolkit/store";


const BASE_URL = 'https://startup-summer-2023-proxy.onrender.com/2.0/'


export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppStateType
    dispatch: AppDispatch
    rejectValue: string
    extra?: { s: string; n: number }
}>()


export const authAxios = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
    },
});
export const instance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
        "X-Api-App-Id":
            "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
    },
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});




