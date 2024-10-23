import React, { useState, useEffect } from 'react';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';

const API_URL = 'https://rickandmortyapi.com/api/character';

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage]);

    const fetchCharacters = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?page=${page}`);
            const data = await response.json();
            setCharacters(data.results);
            setTotalPages(data.info.pages);
        } catch (error) {
            console.error('Error fetching characters:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCharacterDetails = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const data = await response.json();
            setSelectedCharacter(data);
        } catch (error) {
            console.error('Error fetching character details:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Rick & Morty Characters</h1>
            {loading && <div id="loading-message">Loading…</div>}
            <CharacterList characters={characters} onCharacterClick={fetchCharacterDetails} />
            {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
            <div className="pagination">
                <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>Page: {currentPage}</span>
                <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default App;