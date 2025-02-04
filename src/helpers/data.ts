export const getPhoto = async () => (await import(`../assets/photo-${import.meta.env.VITE_REAL_DATA_ENABLED  === 'true' ? 'real' : 'example'}.jpg`)).default

export const getData = async (module: string) =>
    (await import(/* @vite-ignore */`../components/${module}/data-${import.meta.env.VITE_REAL_DATA_ENABLED === 'true' ? 'real' : 'example'}`)).default