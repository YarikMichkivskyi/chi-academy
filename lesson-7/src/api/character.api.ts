import axios from 'axios';
import { CharacterResponse, Character } from '../types/CharacterTypes';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async (page: number): Promise<CharacterResponse> => {
    const response = await axios.get<CharacterResponse>(`${API_URL}?page=${page}`);
    return response.data;
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
    const response = await axios.get<Character>(`${API_URL}/${id}`);
    return response.data;
};