import axios from 'axios'
import { shuffle } from 'helpers/utils'

const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon?limit=2137'

type PokemonApiResponse = {
    count: number;
    next: string;
    previous: string;
    results: {name: string, url: string}[]
}

export async function fetchRandomPokemonNames(count: number) {
    try {
        const pokemons = (await axios.get<PokemonApiResponse>(POKEMON_URL)).data.results.map(p => p.name)
        shuffle(pokemons)
        return pokemons.slice(0, count)
    }
    catch {
        return []
    }
}