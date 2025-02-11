import { streamSSE } from 'hono/streaming'
import { Hono } from 'hono'

const app = new Hono()

const App = () => {
  return <form hx-post="/chat" hx-swap="afterbegin" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input type="text" name="message" />
      <button type="submit">Send</button>
  </form>
}

app.post('/chat', (c) => {
  return c.html(<Message message="response" />)
})


const Message = ({ message }: { message: string }) => {
  return <input readonly type="text" value={message} />
}

app.get('/sse', (c) => {
  return streamSSE(c, async (stream) => {
    while (true) {
      await stream.writeSSE({
        data: <Message message="hi" />,
      })
      await stream.sleep(1000)
    }
  })
})



import Html from './components/Html'

app.get('/', (c) => {
  return c.html(Html(<App />, __filename))
})

import cursor from './cursor'
app.route('/cursor/', cursor)

export default app