import { join } from 'path'
import { PLUGINS_FOLDER } from '../config'
import { FileSystemHelper as importedFileSystemHelper } from './FileSystemHelper'
const reload: NodeRequire = require('require-reload')(require)
const { FileSystemHelper }: { FileSystemHelper: typeof importedFileSystemHelper } = reload('./FileSystemHelper')

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
        const { accessibleDirectory, name } = reload(fileSystem.resolvePath(filepath))
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
