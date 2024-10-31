import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1D1D1D',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B0B0B0',
        },
    },
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '& .MuiDataGrid-row': {
                        backgroundColor: '#1D1D1D',
                        color: '#FFFFFF',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#333333',
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: '#333333',
                        color: '#FFFFFF',
                    },
                    '& .MuiDataGrid-cell': {
                        borderColor: '#555555',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#333333',
                        color: '#FFFFFF',
                        borderBottom: '1px solid #555555',
                    },
                },
            },
        },
    },
});