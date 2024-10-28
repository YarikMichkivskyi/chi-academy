import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const CharacterDetails = ({ character }) => {
    if (!character) return <Box sx={{ width: '30%' }}>Select a character to see details.</Box>;

    return (
        <Box sx={{ width: '30%', ml: 2, textAlign: 'center' }}>
            <Avatar src={character.image} alt={character.name} sx={{ width: 120, height: 120, margin: '20px auto' }} />
            <Typography variant="h5">{character.name}</Typography>
            <Typography>Status: {character.status}</Typography>
            <Typography>Species: {character.species}</Typography>
            <Typography>Gender: {character.gender}</Typography>
            <Typography>Location: {character.location.name}</Typography>
        </Box>
    );
};

export default CharacterDetails;