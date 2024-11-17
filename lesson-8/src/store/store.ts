import {configureStore} from '@reduxjs/toolkit';
import userApi from '../api/actions/user.api'
import {reducer as userReducer} from './user/user'
import {addInterceptors} from "../api/axiosInstance";
import { userActions } from './actions';

const extraArgument = {
    userApi
};

const store = configureStore({
    reducer: {userData: userReducer},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument,
            },
        })
});

addInterceptors(()=>{store.dispatch(userActions.logout())});

export {store, extraArgument};
