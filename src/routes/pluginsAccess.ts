import { readFile } from 'fs'
import { IncomingMessage, ServerResponse } from 'http'
import { join } from 'path'
import { PLUGINS_FOLDER } from '../config'
import { FileSystemHelper } from '../helpers/FileSystemHelper'
import { getPluginsDefinitions } from '../helpers/getPluginsDefinitions'

const fileSystem = new FileSystemHelper(PLUGINS_FOLDER)

const pluginsDefinitions = getPluginsDefinitions()

const accessibleDirectoryByPluginKey: { [key: string]: string } = {}
for (const { key } of pluginsDefinitions) {
    const filePath = join(key, 'getAccessibleDirectory.js')
    if (!fileSystem.fileExistsSync(filePath)) {
        continue
    }
    accessibleDirectoryByPluginKey[key] = require(fileSystem.resolvePath(filePath)).default()
}

export const pluginsAccess = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url || ''
    const matches = url.match(/\/plugins\/([^\/]+)\/(.+)/)
    if (!matches) {
        res.destroy()
        return
    }
    const [, key, relativeFilePath] = matches
    const fullFilePath = join(accessibleDirectoryByPluginKey[key], relativeFilePath)
    readFile(fullFilePath, (error, content) => {
        if (error) {
            res.destroy()
            return
        }
        res.write(content)
        res.end()
    })
}
