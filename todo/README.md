`Page.tsx`

```jsx
import { Hono } from "hono";

const app = new Hono()

app.get('/', async (c) => {
  return c.html(<div>Hello World</div>)
})

export default app
```

```sh
bun run src/Page.tsx
```