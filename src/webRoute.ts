import { IncomingMessage, ServerResponse } from 'http'
import { pluginsAccess } from './routes/pluginsAccess'

export const webRoute = (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url) {
        res.destroy()
        return
    }
    if (req.url.startsWith('/plugins/')) {
        pluginsAccess(req, res)
    }
}
