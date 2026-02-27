import axios from 'axios'
import { shuffle } from './utils'

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=2137'

type PokemonApiResponse = {
    count: number
    next: string
    previous: string
    results: { name: string; url: string }[]
}

export async function fetchRandomPokemonNames(count: number) {
    try {
        const pokemons = (
            await axios.get<PokemonApiResponse>(POKEMON_API_URL)
        ).data.results.map((p) => p.name)
        shuffle(pokemons)
        return pokemons.slice(0, count)
    } catch {
        return []
    }
}
