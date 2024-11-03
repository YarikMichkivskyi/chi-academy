import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import {ThemeProvider, CssBaseline, Box} from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Heroes from './pages/Heroes';
import About from './pages/About';
import {lightTheme} from './themes/lightTheme';
import {darkTheme} from './themes/darkTheme';
import CharacterDetailsDrawer from "./components/CharacterDetailsDrawer";

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <CssBaseline/>
                <>
                    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                        <Navbar toggleTheme={toggleTheme} />
                        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '250px' }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/heroes" element={<Heroes />}>
                                    <Route path=":id" element={<CharacterDetailsDrawer />} />
                                </Route>
                                <Route path="/about" element={<About />} />
                            </Routes>
                        </Box>
                    </Box>
                </>
            </ThemeProvider>
        </>
    );
};