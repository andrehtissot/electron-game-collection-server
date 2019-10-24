import { default as WebSocket } from 'ws'
import { getPlugin } from './routes/getPlugin'
import { getPluginsAvailable } from './routes/getPluginsAvailable'
import { IRunPluginParam, runPlugin } from './routes/runPlugin'

export const webSocketRoute = async (operation: string, params: unknown, ws: WebSocket) => {
    switch (operation) {
        case 'getPluginsAvailable':
            return getPluginsAvailable()
        case 'getPlugin':
            return getPlugin(params)
        case 'runPlugin':
            return runPlugin(params as IRunPluginParam, ws)
        default:
            console.warn(`Route accessed: "${operation}" with ${JSON.stringify(params) || ''}`)
    }
}
