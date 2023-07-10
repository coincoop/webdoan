import axios from "axios";
import jwt_decode from 'jwt-decode'
import { API_URL } from "./config";


//maux
const refreshToken = async () => {
    try {
        await axios.post(`${API_URL}account/refresh`, {
            withCredentials: true,
        })
    } catch (e) {
        console.log(e);
    }
}

export const createAxios = (user, dispatch,stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                await axios.post(`${API_URL}account/logout`);
              
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    );
    return newInstance;
}
// export const createAxios = (user, dispatch,stateSuccess) => {
//     const newInstance = axios.create();
//     newInstance.interceptors.request.use(
//         async (config) => {
//             let date = new Date();
//             const decodedToken = jwt_decode(user?.accessToken);
//             if (decodedToken.exp < date.getTime() / 1000) {
//                 const data = await refreshToken();
//                 const refreshUser = {
//                     ...user,
//                     accessToken: data.accessToken
//                 };
//                 dispatch(stateSuccess(refreshUser));
//                 config.headers['token'] = data.accessToken;
//             }
//             return config
//         },
//         (err) => {
//             return Promise.reject(err)
//         }
//     );
//     return newInstance;
// }