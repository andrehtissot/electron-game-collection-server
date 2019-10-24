import { join } from 'path'
import { PLUGINS_FOLDER } from '../config'
import { FileSystemHelper } from './FileSystemHelper'

interface IPluginDefinition {
    name: string
    key: string
    accessibleDirectory: string
}

export const getPluginsDefinitions = () => {
    if (!PLUGINS_FOLDER) {
        throw new Error('no plugins available')
    }
    const fileSystem = new FileSystemHelper(PLUGINS_FOLDER)
    const pluginFolders = fileSystem.readDirSync()
    const pluginsDefinitions: IPluginDefinition[] = []
    for (const { name: key } of pluginFolders) {
        const filepath = join(key, 'index.json')
        if (!fileSystem.fileExistsSync(filepath)) {
            continue
        }
        const { accessibleDirectory, name } = require(fileSystem.resolvePath(filepath))
        if (!name) {
            continue
        }
        pluginsDefinitions.push({
            accessibleDirectory,
            key,
            name,
        })
    }

    return pluginsDefinitions
}
