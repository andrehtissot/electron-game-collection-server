import { getPluginsDefinitions } from '../helpers/getPluginsDefinitions'

export const getPluginsAvailable = () => {
    try {
        return ['SUCCESS', getPluginsDefinitions()]
    } catch (e) {
        return ['ERROR', e.message]
    }
}
