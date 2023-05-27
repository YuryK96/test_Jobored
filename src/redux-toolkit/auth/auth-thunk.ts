import {AxiosError} from "axios";
import {authApi} from "../../api/auth";
import {createAppAsyncThunk} from "../../api/api";
import {getRefreshTokenInLS, setRefreshTokenInLS, setTokenInLS} from "../../local-storage/local-storage";


export const authorizationThunk = createAppAsyncThunk('auth',
    async (_, {rejectWithValue}) => {
        try {
            const response = await authApi.auth().then((res) => {
                setTokenInLS(res.access_token)
                setRefreshTokenInLS(res.refresh_token)
            })
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(String(err.response?.status) || err.message)

        }
    }
)


export const sendRefreshTokenThunk = createAppAsyncThunk('refresh',
    async (_, {rejectWithValue}) => {
        try {
            const refreshToken = getRefreshTokenInLS()
            if (refreshToken) {
                const response = await authApi.updateToken(refreshToken).then(
                    (res) => {
                        setTokenInLS(res.access_token)
                        setRefreshTokenInLS(res.refresh_token)
                    })
            }
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(String(err.response?.status) || err.message)
        }

    })