import React from 'react';
import { Switch, Typography } from '@mui/material';

const ThemeSwitch = ({ toggleTheme, isDarkMode }) => (
    <div style={{ marginLeft: 'auto' }}>
        <Typography variant="body2">Night Mode</Typography>
        <Switch checked={isDarkMode} onChange={toggleTheme} />
    </div>
);

export default ThemeSwitch;