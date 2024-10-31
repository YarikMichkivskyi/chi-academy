import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Switch } from '@mui/material';
import { Link } from 'react-router-dom';

interface NavBarProps {
    toggleTheme: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleTheme }) => (
    <Box sx={{ width: 250, backgroundColor: 'background.paper', height: '100vh' }}>
        <List>
            <ListItem>
                <ListItemText primary="Navigation" />
            </ListItem>
            <ListItemButton component={Link} to="/">
                <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={Link} to="/heroes">
                <ListItemText primary="Heroes" />
            </ListItemButton>
            <ListItemButton component={Link} to="/about">
                <ListItemText primary="About" />
            </ListItemButton>
            <ListItem>
                <Switch onChange={toggleTheme} />
                <ListItemText primary="Toggle Theme" />
            </ListItem>
        </List>
    </Box>
);

export default NavBar;