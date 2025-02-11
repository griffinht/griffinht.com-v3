import { streamSSE } from 'hono/streaming'
import { Hono } from 'hono'

const app = new Hono()


const Message = ({ id, role, message }: { id: string, role: string, message: string }) => {
  return <textarea type="text" name={id + role}>{message}</textarea>
}


const Messages = ({messages, response}: { messages: { id: string, role: string, message: string }[], response: boolean}) => {
  return <form hx-ext="sse" hx-post="/chat" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {messages.map((message) => (
      <Message key={message.id} id={message.id} role={message.role} message={message.message} />
    ))}
    {response && <textarea type="text" name='9745978assistant' sse-connect="/sse?id=9745978" sse-swap="message" sse-close="close"></textarea>}
    <input type="text" name="user" />
    <button type="submit">Send</button>
  </form>
}

const App = () => {
  return <Messages messages={[]} response={false} />
}

app.post('/chat', async (c) => {
  const body = await c.req.parseBody()
  const messages = Object.entries(body)
    .map(([key, message]) => {
      const [id, role] = key.split('role')
      return { id, role, message: message as string }
    })
    .filter(m => m.message)
  
  return c.html(<Messages messages={messages} response={true} />)
})



app.get('/sse', (c) => {
  const id = c.req.query('id')
  console.log('id', id)
  return streamSSE(c, async (stream) => {
    let count = 0
    while (true) {
      if (count == 10) {
        await stream.writeSSE({
          data: '',
          event: 'close'
        })
        console.log('writing close')
        break;
      }
      await stream.writeSSE({
        data: 'a'.repeat(count + 1)
      })
      count++
      console.log('writing')
      await stream.sleep(100)
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