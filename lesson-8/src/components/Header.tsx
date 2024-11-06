import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { userActions } from '../store/actions';
import userApi from '../api/actions/user.api';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.userData.token);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (token) {
            userApi.getUserByToken().then((res) => {
                setUsername(res.data.username);
            });
        } else {
            setUsername('');
        }
    }, [token]);

    const handleLogout = () => {
        dispatch(userActions.logout());
        navigate('/login');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>Exhibit App</Typography>

                {token ? (
                    <>
                        <Box display="flex" alignItems="center" ml={3}>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/home')}
                                sx={{ mr: 1 }}
                            >
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/')}
                                sx={{ mr: 1 }}
                            >
                                Stripe
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/new-post')}
                                sx={{ mr: 1 }}
                            >
                                New Post
                            </Button>
                        </Box>

                        <Box ml="auto" display="flex" alignItems="center">
                            <Typography variant="body1" sx={{ mr: 2 }}>{username}</Typography>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </Box>
                    </>
                ) : (
                    <Box ml="auto">
                        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;