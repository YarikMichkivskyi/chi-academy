import React from 'react';
import { Box, Typography, CircularProgress, Avatar } from '@mui/material';
import { useRequest } from 'ahooks';
import { fetchCharacterById } from '../api/character.api';
import { Character } from '../common/types/_types';

interface HeroDetailProps {
    id: string;
}

const HeroDetail: React.FC<HeroDetailProps> = ({ id }) => {
    const { data: character, loading } = useRequest<Character, any>(() => fetchCharacterById(Number(id)), {
        refreshDeps: [id],
    });

    if (loading) return <CircularProgress />;
    if (!character) return <Typography variant="h6">Character not found</Typography>;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 4, width: 250 }}>
            <Avatar src={character.image} alt={character.name} sx={{ width: 150, height: 150, mb: 2 }} />
            <Typography variant="h4">{character.name}</Typography>
            <Typography variant="body1">Status: {character.status}</Typography>
            <Typography variant="body1">Species: {character.species}</Typography>
            <Typography variant="body1">Gender: {character.gender}</Typography>
            <Typography variant="body1">Origin: {character.origin.name}</Typography>
        </Box>
    );
};

export default HeroDetail;