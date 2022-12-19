import server from './api/server'
import { config } from './config'

const port = config.server.port

server.listen(port, () => {
  console.log(`Running signature service on port ${port}`)
})
