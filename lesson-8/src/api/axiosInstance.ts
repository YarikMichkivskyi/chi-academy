import axios from 'axios';
// import {store} from "../store/store";
// import {userActions} from "../store/actions";
// store.dispatch(userActions.logout());

const axiosInstance = axios.create({
    baseURL: 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com',
    timeout: 10000,
});

const addInterceptors = (handleLogOut:()=>void) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                //перегрузка страницы стора слетает, смотрим на пример
                handleLogOut();
            }
            return error.response;
        }
    );
}

const setToken: (newToken: string) => void = (newToken: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
}

export {setToken, addInterceptors, axiosInstance};