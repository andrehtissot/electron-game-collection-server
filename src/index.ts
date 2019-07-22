import { watch } from 'fs'
import { join } from 'path'
const reload: NodeRequire = require('require-reload')(require)
let webSocketServer = reload('./webSocketServer')
let webServer = reload('./webServer')

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
    webSocketServer = reload('./webSocketServer')
    webSocketServer.open({ port: getPort() })
    webServer.close()
    webServer = reload('./webServer')
    webServer.open({ port: getPort() + 1 })
})
