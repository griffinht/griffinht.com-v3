import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>
        <h1>My App</h1>
        <ul>
          <li>no docker/kubernetes</li>
          <li>build apps not platforms - one repo for each app</li>
        </ul>
      </body>
    </html>
  `)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
