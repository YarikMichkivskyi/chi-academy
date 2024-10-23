import React from 'react';

const CharacterDetails = ({ character }) => {
    return (
        <div className="character-details">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Origin:</strong> {character.origin.name}</p>
            <p><strong>Location:</strong> {character.location.name}</p>
        </div>
    );
};

export default CharacterDetails;