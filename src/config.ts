import { join } from 'path'
import { FileSystemHelper } from './helpers/FileSystemHelper'

let pluginsFolder: string | undefined
const fileSystem = new FileSystemHelper(__dirname)
if (fileSystem.fileExistsSync('plugins')) {
    pluginsFolder = fileSystem.resolvePath('plugins')
} else if (fileSystem.fileExistsSync(join('..', 'plugins'))) {
    pluginsFolder = fileSystem.resolvePath(join('..', 'plugins'))
} else if (fileSystem.fileExistsSync(join('..', '..', 'plugins'))) {
    pluginsFolder = fileSystem.resolvePath(join('..', '..', 'plugins'))
} else if (fileSystem.fileExistsSync(join('..', '..', '..', 'plugins'))) {
    pluginsFolder = fileSystem.resolvePath(join('..', '..', '..', 'plugins'))
}

// console.log('pluginsFolder', pluginsFolder)

// tslint:disable:export-name
export const PLUGINS_FOLDER = pluginsFolder
