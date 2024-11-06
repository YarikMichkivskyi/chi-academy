import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "./layouts/Login.page";
import RegisterPage from "./layouts/Register.page";
import NewPost from "./layouts/NewPost.page";
import ProtectedRoute from "./components/ProtectedRoute";
import StripePage from "./layouts/Stripe.page";
import HomePage from "./layouts/Home.page";
import {Box, CssBaseline} from "@mui/material";
import {useAppDispatch} from "./hooks/hooks";
import {userActions} from "./store/actions";

export default function App() {
    const dispatch = useAppDispatch();

    const [isLsChecked, setIsLsChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(userActions.setToken(token));
        }
        setIsLsChecked(true);
    }, []);

    return (
        <>
            <CssBaseline/>
            {
                isLsChecked &&
                <Box sx={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Routes>
                        <Route path="/" element={<StripePage/>} />
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
                        <Route path="/new-post" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
                    </Routes>
                </Box>
            }
        </>
    );
};