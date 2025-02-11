import { Hono } from "hono";
import { css, Style } from 'hono/css'
import { FC } from "hono/jsx";

const app = new Hono()

const appp = new Hono()

appp.get('/hello', async (c) => {
  return c.html(<p>hi</p>)
})
app.route('/', appp)

const Code: FC<{ children: string }> = ({ children }) => {
  return (
    <code>
      <pre>{children}</pre>
    </code>
  )
}

const Content = () => {
return (
  <>
    <h2>installation</h2>
    <Code>{`<script src="https://unpkg.com/htmx.org@2.0.4"></script>`}</Code>
    <h2>HelloWorld.tsx</h2>
    <script src="https://unpkg.com/htmx.org@2.0.4"></script>
    <code>
      <pre>{`
import { Hono } from "hono";

const app = new Hono()

app.get('/', async (c) => {
  return c.html(<p>hi</p>)
})

export default app
      `}</pre>
    </code>
    <p hx-get="/hello">
      click me
    </p>
  </>
  )
}

app.get('/', async (c) => {
  const globalStyles = css`
    :-hono-global {
      body {
        font-family: system-ui, -apple-system, sans-serif;
        line-height: 1.5;
        margin: 0;
        padding: 0;
      }
    }
  `

  const containerClass = css`
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  `

  const headerClass = css`
    text-align: center;
    margin-bottom: 3rem;
    
    h1 {
      font-size: 2.5rem;
      color: #2d3748;
    }
  `

  const articleClass = css`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    h2 {
      color: #2d3748;
      margin-top: 0;
    }
    
    p {
      color: #4a5568;
    }
  `

  return c.html(
    <body class={globalStyles}>
      <Style />
      <div class={containerClass}>
        <header class={headerClass}>
          <h1>Welcoe to My Blog</h1>
        </header>
        
        <article class={articleClass}>
          <Content />
        </article>
      </div>
    </body>
  )
})

export default app