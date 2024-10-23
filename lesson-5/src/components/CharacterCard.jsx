import React from 'react';

const CharacterCard = ({ character, onClick }) => {
    return (
        <div className="character" onClick={onClick}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>{character.species}</p>
        </div>
    );
};

export default CharacterCard;