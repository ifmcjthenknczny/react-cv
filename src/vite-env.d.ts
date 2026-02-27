/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REAL_DATA_ENABLED: string
    readonly VITE_RANDOM_POKEMON_ADD_COUNT: number
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
