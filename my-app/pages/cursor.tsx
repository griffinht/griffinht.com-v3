import { streamSSE } from 'hono/streaming'
import { Hono } from 'hono'

const app = new Hono()

const App = () => {
  return <div hx-ext="sse" sse-connect="/sse" sse-swap="message" hx-swap="beforeend">
      Contents of this box will be updated in real time
      with every SSE message received from the chatroom.
  </div>
}


const Component = () => {
  return <div>hi</div>
}

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



import Html from './components/Html'

app.get('/', (c) => {
  return c.html(Html(<App />, __filename))
})

export default app