/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_RANDOM_POKEMON_ADD_COUNT?: number
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
