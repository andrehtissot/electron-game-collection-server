import WebSocket, { OPEN, Server } from 'ws'
const reload: NodeRequire = require('require-reload')(require)

let webSocketServer: Server | void

export const open = ({ port }: { port: number }) => {
    webSocketServer = new Server({
        perMessageDeflate: {
            clientNoContextTakeover: true, // Defaults to negotiated value.
            concurrencyLimit: 10, // Limits zlib concurrency for perf.
            serverMaxWindowBits: 10, // Defaults to negotiated value.
            serverNoContextTakeover: true, // Defaults to negotiated value.
            threshold: 1024, // Size (in bytes) below which messages
            zlibDeflateOptions: {
                // See zlib defaults.
                chunkSize: 1024,
                level: 3,
                memLevel: 7,
            },
        },
        port,
    })

    webSocketServer.on('connection', (ws: WebSocket) => {
        ws.on('message', async (message: string) => {
            const [operation, params]: [string, any] = JSON.parse(message)
            const result = await reload('./webSocketRoute').webSocketRoute(operation, params, ws)
            if (result !== undefined && ws.readyState === OPEN) {
                ws.send(JSON.stringify(result))
            }
        })
    })
}

export const close = () => {
    if (webSocketServer) {
        const wssToClose = webSocketServer
        webSocketServer = undefined
        wssToClose.close()
    }
}
