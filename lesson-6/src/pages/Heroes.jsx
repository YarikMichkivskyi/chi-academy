import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const API_URL = 'https://rickandmortyapi.com/api/character';

function Heroes() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(0);
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCharacters(page + 1);
    }, [page]);

    const fetchCharacters = async (currentPage) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?page=${currentPage}`);
            const data = await response.json();
            setCharacters(data.results);
            setTotalCharacters(data.info.count);
        } catch (error) {
            console.error('Error fetching characters:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (params) => {
        navigate(`/heroes/${params.row.id}`);
    };

    const handlePaginationModelChange = (newPaginationModel) => {
        setPage(newPaginationModel.page);
    };

    return (
        <Box sx={{height: 500, width: '100%', mt: 2}}>
            <DataGrid
                rows={characters}
                columns={[
                    {field: 'id', headerName: 'ID', width: 90},
                    {field: 'name', headerName: 'Name', width: 150},
                    {field: 'status', headerName: 'Status', width: 120},
                ]}
                initialState={{
                    pagination: {
                        paginationModel:{
                            pageSize:20
                        }
                    }
                }}
                paginationMode="server"
                rowCount={totalCharacters}
                onPaginationModelChange={handlePaginationModelChange}
                loading={loading}
                onRowClick={handleRowClick}
                pageSizeOptions={[20]}
                sx={{
                    '& .MuiDataGrid-row': {backgroundColor: 'lightblue'},
                    '& .MuiDataGrid-row:hover': {backgroundColor: 'lightgreen'},
                }}
            />
        </Box>
    );
}

export default Heroes;