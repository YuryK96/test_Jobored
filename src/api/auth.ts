import {instance} from "./api";
import {AxiosResponse} from "axios";
import {AuthResponseType} from "./api-type";

export const authApi = {
    auth() {
        return instance
            .get(
                "oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0"
            )
            .then((res: AxiosResponse<AuthResponseType>) => res.data
            )
    },
    updateToken(refreshToken: string) {
        return instance.get(`oauth2/refresh_token/?refresh_token=${refreshToken}&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948`).then((res: AxiosResponse<AuthResponseType>) => res.data)
    }

}


