import WebSocket from 'ws'
const reload: NodeRequire = require('require-reload')(require)

export const webSocketRoute = async (operation: string, params: unknown, ws: WebSocket) => {
    switch (operation) {
        case 'getPluginsAvailable':
            return reload('./routes/getPluginsAvailable').getPluginsAvailable(params)
        case 'getPlugin':
            return reload('./routes/getPlugin').getPlugin(params)
        case 'runPlugin':
            return reload('./routes/runPlugin').runPlugin(params, ws)
        default:
            console.warn(`Route accessed: "${operation}" with ${JSON.stringify(params) || ''}`)
    }
}
