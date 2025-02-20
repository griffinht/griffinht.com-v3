import { streamSSE } from 'hono/streaming'
import { Hono } from 'hono'
import OpenAI from 'openai'

const app = new Hono()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const Message = ({ id, role, message }: { id: string, role: string, message: string }) => {
  return <textarea type="text" name={id + role}>{message}</textarea>
}

const Messages = ({messages, id}: { messages: { id: string, role: string, message: string }[], response: boolean}) => {
  return <form hx-ext="sse" hx-post="/chat" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {messages.map((message) => (
      <Message key={message.id} id={message.id} role={message.role} message={message.message} />
    ))}
    {response && <textarea type="text" name='9745978assistant' sse-connect="/sse?id=9745978" sse-swap="message" sse-close="close" hx-swap="beforeend"></textarea>}
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
  
  data[id].messages = messages
  return c.html(<Messages messages={messages} response={true} />)
})

const data = {
  '9745978': {
    messages: [{ role: 'user', content: 'Say hello!' }]
  }
}

app.get('/sse', (c) => {
  const id = c.req.query('id')
  console.log('id', id)
  const messages = data[id].messages
  return streamSSE(c, async (stream) => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        stream: true
      })

      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || ''
        if (content) {
          await stream.writeSSE({
            data: content
          })
        }
      }
      
      await stream.writeSSE({
        data: '',
        event: 'close'
      })
    } catch (error) {
      console.error('OpenAI API error:', error)
      await stream.writeSSE({
        data: 'Error: Failed to get response',
        event: 'close'
      })
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