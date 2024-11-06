import axios from 'axios';
import {store} from "../store/store";
import {userActions} from "../store/actions";


const axiosInstance = axios.create({
    baseURL: 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().userData.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(userActions.logout());
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;