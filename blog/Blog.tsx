import { Hono } from "hono";

const app = new Hono()

app.get('/', async (c) => {
  return c.html(<div>Hello World</div>)
})

export default app