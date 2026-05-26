import { serve } from '@hono/node-server'
import { createApp } from './app.js'
import { createDatabase } from './db.js'

const DEFAULT_PORT = 8000
const parsedPort = Number.parseInt(process.env.PORT ?? `${DEFAULT_PORT}`, 10)
const port =
  Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : DEFAULT_PORT

const { db, initializeDatabase, seedMockData } = createDatabase()

initializeDatabase()

if (process.env.NODE_ENV !== 'production') {
  seedMockData()
}

const app = createApp({ db })

serve({
  fetch: app.fetch,
  port
})

console.log(`SafeSpot backend running on http://localhost:${port}`)
