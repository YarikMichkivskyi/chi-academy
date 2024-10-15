const API_URL = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;
let totalPages = 1;

const characterListElement = document.getElementById('character-list');
const characterDetailsElement = document.getElementById('character-details');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const pageNumberElement = document.getElementById('page-number');
const loadingMessageElement = document.getElementById('loading-message');

async function fetchCharacters(page) {
    loadingMessageElement.innerText = 'Loading…';
    try {
        const response = await fetch(`${API_URL}?page=${page}`);
        const data = await response.json();
        totalPages = data.info.pages;
        renderCharacters(data.results);
        updatePagination(data.info);
    } catch (error) {
        console.error('Error fetching characters:', error);
        loadingMessageElement.innerText = 'Failed to load characters';
    }
}

async function fetchCharacterDetails(id) {
    loadingMessageElement.innerText = 'Loading character details…';
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const character = await response.json();
        renderCharacterDetails(character);
        loadingMessageElement.innerText = '';
    } catch (error) {
        console.error('Error fetching character details:', error);
        loadingMessageElement.innerText = 'Failed to load character details';
    }
}

function renderCharacters(characters) {
    characterListElement.innerHTML = '';
    characters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.className = 'character';
        characterElement.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>${character.species}</p>
        `;
        characterElement.addEventListener('click', () => {
            fetchCharacterDetails(character.id);
        });
        characterListElement.appendChild(characterElement);
    });
    loadingMessageElement.innerText = '';
}

function renderCharacterDetails(character) {
    characterDetailsElement.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p><strong>Status:</strong> ${character.status}</p>
        <p><strong>Species:</strong> ${character.species}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Origin:</strong> ${character.origin.name}</p>
        <p><strong>Location:</strong> ${character.location.name}</p>
    `;
}

function updatePagination(info) {
    currentPage = info.next ? info.next.split('=')[1] - 1 : totalPages;
    pageNumberElement.innerText = `Page: ${currentPage}`;
    prevButton.disabled = !info.prev;
    nextButton.disabled = !info.next;
}

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchCharacters(currentPage);
    }
});

fetchCharacters(currentPage);