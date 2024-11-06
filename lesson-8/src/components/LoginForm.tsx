import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { userActions } from "../store/actions";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const { error, token } = useAppSelector(state => ({
        error: state.userData.error,
        token: state.userData.token
    }));

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (token) {
            nav('/home');
        }
    }, [token, nav]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(userActions.login({ username, password }));
    };

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 400,
                mx: 'auto',
                px: 3,
                py: 4,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: 'center'
            }}
        >
            <Typography variant="h5" gutterBottom>Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
            </form>
            <Box mt={2}>
                <Link href="/register" variant="body2">Don't have an account? Register</Link>
                <br />
                <Link href="/" variant="body2">Back to Homepage</Link>
            </Box>
        </Box>
    );
};

export default LoginForm;