import { watch } from 'fs'
import { join } from 'path'
import * as webServer from './webServer'
import * as webSocketServer from './webSocketServer'

const getPort = () => {
    if (!process.env.SERVER_PORT) {
        return 8000
    }
    return parseInt(process.env.SERVER_PORT, 10)
}

webSocketServer.open({ port: getPort() })
webServer.open({ port: getPort() + 1 })

watch(join(__dirname), { recursive: true }, () => {
    console.info('Server reloaded!')
    webSocketServer.close()
    webSocketServer.open({ port: getPort() })
    webServer.close()
    webServer.open({ port: getPort() + 1 })
})
