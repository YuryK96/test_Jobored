import {AxiosError} from "axios";
import {auth} from "../../api/auth";
import {createAppAsyncThunk} from "../../api/api";


export const authorization = createAppAsyncThunk('auth',
    async (_, {rejectWithValue}) => {
        try {
            const response = await auth().then((res) => {
                localStorage.setItem("token", res.access_token);
                localStorage.setItem("refresh_token", res.refresh_token);
            })
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message)
        }
    }
)