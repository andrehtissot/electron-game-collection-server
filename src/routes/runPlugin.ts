import { join } from 'path'
import { default as WebSocket } from 'ws'
import { PLUGINS_FOLDER } from '../config'
import { FileSystemHelper } from '../helpers/FileSystemHelper'

export interface IRunPluginParam {
    pluginKey?: string
    operation?: string
    params?: unknown
}

export const OPERATION_NOT_FOUND = 'operation not found'

export const runPlugin = async (data: IRunPluginParam | undefined, ws: WebSocket) => {
    if (!PLUGINS_FOLDER) {
        return ['ERROR', 'no plugins available']
    }
    if (typeof data !== 'object' || !data) {
        return ['ERROR', 'invalid params']
    }
    const { pluginKey, operation, params } = data
    if (!pluginKey) {
        return ['ERROR', 'plugin key invalid']
    }
    if (!operation) {
        return ['ERROR', 'operation param invalid']
    }
    const fileSystem = new FileSystemHelper(join(PLUGINS_FOLDER, pluginKey))
    if (!fileSystem.fileExistsSync(`${operation}.js`)) {
        return ['ERROR', OPERATION_NOT_FOUND]
    }
    const pluginOperation = require(fileSystem.resolvePath(operation)).default
    if (!pluginOperation || typeof pluginOperation !== 'function') {
        return ['ERROR', 'plugin operation invalid']
    }
    const beforeTime = Date.now()
    let pluginResult: unknown
    try {
        pluginResult = await pluginOperation(params, ws)
    } catch (e) {
        console.error(e)
        pluginResult = ['ERROR', (e as Error).message]
    }
    const afterTime = Date.now()
    const logLabel = `runPlugin: ${pluginKey}.${operation}: ${afterTime - beforeTime}ms`
    console.log(logLabel)
    return pluginResult
}
