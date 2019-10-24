import { createServer, Server } from 'http'
import { webRoute } from './webRoute'

let webServer: Server | void

export const open = ({ port }: { port: number }) => {
    webServer = createServer(async (req, res) => {
        webRoute(req, res)
    }).listen(port)
}

export const close = () => {
    if (webServer) {
        const serverToClose = webServer
        webServer = undefined
        serverToClose.close()
    }
}
