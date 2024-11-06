import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { login, register } from './actions';

//По-хорошему тоже вынести, но пока забил
interface UserState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const {reducer, actions, name} = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
        setToken: (state, action:PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access_token;
                state.isAuthenticated = true;
                localStorage.setItem('token', state.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export {reducer, actions, name};