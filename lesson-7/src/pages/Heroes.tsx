import React, { useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Box, Drawer, IconButton, Backdrop } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CharacterDetails from '../components/CharacterDetails';
import { useRequest } from 'ahooks';
import { fetchCharacters } from '../api/character.api';
import {CharacterShort, CharactersList } from '../common/types/_types';


const Heroes: React.FC = () => {
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data, loading } = useRequest<CharactersList, any>(() => fetchCharacters(page + 1), {
        refreshDeps: [page],
    });

    const handleRowClick = (params: { row: CharacterShort }) => {
        navigate(`/heroes/${params.row.id}`);
    };

    const handlePaginationModelChange = (newPaginationModel: { page: number }) => {
        setPage(newPaginationModel.page);
    };

    const closeDrawer = () => {
        navigate('/heroes');
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'status', headerName: 'Status', width: 120 },
    ];

    return (
        <Box sx={{ height: 500, width: '100%', mt: 2, display: 'flex', position: 'relative' }}>
            <Backdrop
                open={Boolean(id)}
                sx={{ zIndex: (theme) => theme.zIndex.drawer - 1, backdropFilter: 'blur(4px)' }}
                onClick={closeDrawer}
            />
            <DataGrid
                rows={data?.results || []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                paginationMode="server"
                rowCount={data?.info.count || 0}
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
};

export default Heroes;