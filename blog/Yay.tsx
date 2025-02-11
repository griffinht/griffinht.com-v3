import { Hono } from 'hono'
import { streamSSE } from 'hono/sse'

const app = new Hono()

app.get('/sse', (ctx) => {
    return streamSSE(ctx, async (stream) => {
      while (true) {
        await stream.writeSSE({
          data: <Component />,
        })
        await stream.sleep(1000)
    }
  })
})

export default app
