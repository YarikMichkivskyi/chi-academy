import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Avatar } from '@mui/material';

const API_URL = 'https://rickandmortyapi.com/api/character';

function HeroDetail() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const data = await response.json();
                setCharacter(data);
            } catch (error) {
                console.error('Failed to fetch character:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (!character) return <Typography variant="h6">Character not found</Typography>;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 4 }}>
            <Avatar src={character.image} alt={character.name} sx={{ width: 150, height: 150, mb: 2 }} />
            <Typography variant="h4">{character.name}</Typography>
            <Typography variant="body1">Status: {character.status}</Typography>
            <Typography variant="body1">Species: {character.species}</Typography>
            <Typography variant="body1">Gender: {character.gender}</Typography>
            <Typography variant="body1">Origin: {character.origin.name}</Typography>
        </Box>
    );
}

export default HeroDetail;