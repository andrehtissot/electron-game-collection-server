import { createServer, Server } from 'http'
const reload: NodeRequire = require('require-reload')(require)

let webServer: Server | void

export const open = ({ port }: { port: number }) => {
    webServer = createServer(async (req, res) => {
        await reload('./webRoute').webRoute(req, res)
    }).listen(port)
}

export const close = () => {
    if (webServer) {
        const serverToClose = webServer
        webServer = undefined
        serverToClose.close()
    }
}
