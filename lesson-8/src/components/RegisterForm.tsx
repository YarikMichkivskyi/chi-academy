import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import {useAppDispatch} from "../hooks/hooks";
import {userActions} from "../store/actions";

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(userActions.register({ username:name, password }));
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
            component="form"
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" gutterBottom>Register</Typography>
            {/*{error && <Typography color="error">{error}</Typography>}*/}
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                fullWidth
                margin="normal"
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
            <Box mt={2}>
                <Link href="/login" variant="body2">Already have an account? Login</Link>
                <br />
                <Link href="/" variant="body2">Back to Homepage</Link>
            </Box>
        </Box>
    );
};

export default RegisterForm;