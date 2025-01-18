import { REAL_DATA_ENABLED } from '../dataFlag'

export const getPhoto = async () => (await import(`../assets/photo-${REAL_DATA_ENABLED ? 'real' : 'example'}.jpg`)).default

export const getData = async (module: string) => (await import(`../components/${module}/data-${REAL_DATA_ENABLED ? 'real' : 'example'}`)).default