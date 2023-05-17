import {AxiosError} from "axios";
import {auth} from "../../api/auth";
import {createAppAsyncThunk} from "../../api/api";
import {setRefreshTokenInLS, setTokenInLS} from "../../local-storage/local-storage";


export const authorization = createAppAsyncThunk('auth',
    async (_, {rejectWithValue}) => {
        try {
            const response = await auth().then((res) => {
                setTokenInLS(res.access_token)
                setRefreshTokenInLS(res.refresh_token)
            })
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message)
        }
    }
)