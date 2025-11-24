const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { WebSocketServer } = require('ws')
const { setConnections, setBroadcastFunction } = require('./lib/ws-manager.js')

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const port = 5000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  const wss = new WebSocketServer({ 
    server,
    path: '/ws'
  })

  const connections = new Set()
  
  // Share connections with the ws-manager
  setConnections(connections)

  const broadcastFn = (data) => {
    const message = JSON.stringify(data)
    console.log('Broadcasting to', connections.size, 'clients:', message)
    connections.forEach(client => {
      if (client.readyState === 1) {
        try {
          client.send(message)
        } catch (error) {
          console.error('Error sending to client:', error)
        }
      }
    })
  }
  
  // Share broadcast function with the ws-manager
  setBroadcastFunction(broadcastFn)

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection, total:', connections.size + 1)
    connections.add(ws)

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString())
        console.log('Received:', data)
        
        connections.forEach(client => {
          if (client.readyState === 1) {
            client.send(JSON.stringify(data))
          }
        })
      } catch (error) {
        console.error('Error processing message:', error)
      }
    })

    ws.on('close', () => {
      console.log('WebSocket connection closed, remaining:', connections.size - 1)
      connections.delete(ws)
    })

    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
      connections.delete(ws)
    })

    ws.send(JSON.stringify({ type: 'connected', message: 'WebSocket connected' }))
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log(`> WebSocket server ready on ws://${hostname}:${port}/ws`)
  })
})
