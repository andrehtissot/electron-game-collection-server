import { join } from 'path'
import { PLUGINS_FOLDER } from '../config'
import { FileSystemHelper } from '../helpers/FileSystemHelper'

export const getPlugin = async (pluginKey: unknown) => {
    if (!PLUGINS_FOLDER) {
        return ['ERROR', 'no plugins available']
    }
    if (typeof pluginKey !== 'string') {
        return ['ERROR', 'plugin key invalid']
    }
    const fileSystem = new FileSystemHelper(join(PLUGINS_FOLDER, pluginKey))
    if (!fileSystem.fileExistsSync('frontend.js')) {
        return ['ERROR', 'plugin not found']
    }
    const plugin = fileSystem.readTXTFileSync('frontend.js')
    if (!plugin) {
        return ['ERROR', 'plugin invalid']
    }

    return ['SUCCESS', plugin]
}
