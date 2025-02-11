import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { renderToReadableStream } from "react-dom/server";

const app = new Hono()

const App = () => {
    return (
    <>
    <script src="https://unpkg.com/htmx.org@2.0.4"></script>
    <script src="https://unpkg.com/htmx-ext-sse@2.2.2/sse.js"></script>
    <p>hi</p>
    <div hx-ext="sse" sse-connect="/cursors" sse-swap="message">
        loading...
    </div>
    </>
    )
}

async function render(component: any): Promise<string> {
   return await Bun.readableStreamToText(await renderToReadableStream(component))
}

app.get('/', async (c) => {
    return c.html(await render(<App />))
})

let id = 0

const Cursor = ({cursor}: {cursor: string}) => {
    return (
        <div>
            <p>{cursor}</p>
        </div>
    )
}

const Cursors = ({cursors}: {cursors: string[]}) => {
    return (
        <div>
            {cursors.map((cursor) => (
                <Cursor key={cursor} cursor={cursor} />
            ))}
        </div>
    )
}

let cursors = ['asdf', 'asdf2', 'asdf3']

app.get('/cursors', async (c) => {
    return streamSSE(c, async (stream) => {
        while (true) {
            await stream.writeSSE({
                data: await render(<Cursors cursors={cursors} />),
                id: String(id++),
            })
            await stream.sleep(1000)
        }
    })
})

export default app