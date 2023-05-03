import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  headers: {
    "x-secret-key": "GEU4nvd3rej*jeh.eqp",
  },
});
const instance2 = axios.create({
  withCredentials: true,
  headers: {
    "X-Api-App-Id":
      "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
    "x-secret-key": "GEU4nvd3rej*jeh.eqp",
  },
});

export const auth = () =>
  instance
    .get(
      "https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948"
    )
    .then((res) => {
      localStorage.setItem("token", res.data.access_token);
      console.log(res);
    });

instance2.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const getVac = () =>
  instance2
    .get(
      "https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?published=1&keyword=консультант&payment_from=1&payment_to=300000&catalogues=1"
    )
    .then((res) => {
      console.log(res);
      return res;
    });
export const getCat = () =>
  instance2
    .get("https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/")
    .then((res) => {
      console.log(res);
      return res;
    });
