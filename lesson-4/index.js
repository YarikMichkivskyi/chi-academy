const API_URL = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;
let totalPages = 1;

const characterListElement = document.getElementById('character-list');
const loadingMessageElement = document.getElementById('loading-message');
const modal = document.getElementById('modal');
const characterDetails = document.getElementById('modal-character-details');
const closeBtn = document.querySelector('.close-btn');

async function fetchCharacters(page) {
    loadingMessageElement.innerText = 'Loading…';
    try {
        const response = await fetch(`${API_URL}?page=${page}`);
        const data = await response.json();
        totalPages = data.info.pages;
        renderCharacters(data.results);
    } catch (error) {
        console.error('Error fetching characters:', error);
        loadingMessageElement.innerText = 'Failed to load characters';
    } finally {
        loadingMessageElement.innerText = '';
    }
}

function renderCharacters(characters) {
    characters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.className = 'character';
        characterElement.dataset.id = character.id;
        characterElement.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>${character.species}</p>
        `;
        characterListElement.appendChild(characterElement);
    });
}

async function fetchCharacterDetails(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        showCharacterModal(data);
    } catch (error) {
        console.error('Error fetching character details:', error);
    }
}

function showCharacterModal(character) {
    characterDetails.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
    `;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

characterListElement.addEventListener('click', (event) => {
    const characterElement = event.target.closest('.character');
    if (characterElement) {
        const characterId = characterElement.dataset.id;
        fetchCharacterDetails(characterId);
        event.stopPropagation();
    }
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && currentPage < totalPages) {
        currentPage++;
        fetchCharacters(currentPage);
    }
});

fetchCharacters(currentPage);