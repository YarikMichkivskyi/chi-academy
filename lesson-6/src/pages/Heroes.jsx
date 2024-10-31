import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Drawer, IconButton, Backdrop } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CharacterDetails from "../components/CharacterDetails";

const API_URL = 'https://rickandmortyapi.com/api/character';

function Heroes() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(0);
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

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

    const closeDrawer = () => {
        navigate('/heroes');
    };

    return (
        <Box sx={{ height: 500, width: '100%', mt: 2, display: 'flex', position: 'relative' }}>
            <Backdrop
                open={Boolean(id)}
                sx={{ zIndex: (theme) => theme.zIndex.drawer - 1, backdropFilter: 'blur(4px)' }}
                onClick={closeDrawer}
            />
            <DataGrid
                rows={characters}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    { field: 'name', headerName: 'Name', width: 150 },
                    { field: 'status', headerName: 'Status', width: 120 },
                ]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                paginationMode="server"
                rowCount={totalCharacters}
                onPaginationModelChange={handlePaginationModelChange}
                loading={loading}
                onRowClick={handleRowClick}
                pageSizeOptions={[20]}
                sx={{ zIndex: (theme) => theme.zIndex.drawer - 2 }}
            />
            <Drawer
                anchor="right"
                open={Boolean(id)}
                onClose={closeDrawer}
                sx={{ width: 300, flexShrink: 0 }}
                variant="persistent"
            >
                <IconButton onClick={closeDrawer} sx={{ alignSelf: 'flex-end', m: 1 }}>
                    <CloseIcon />
                </IconButton>
                {id && <CharacterDetails id={id} />}
            </Drawer>
        </Box>
    );
}

export default Heroes;