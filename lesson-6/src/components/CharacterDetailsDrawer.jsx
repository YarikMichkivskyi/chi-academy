import React from 'react';
import { Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';
import CharacterDetails from '../components/CharacterDetails';

const CharacterDetailsDrawer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const closeDrawer = () => {
        navigate('/heroes');
    };

    return (
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
    );
};

export default CharacterDetailsDrawer;